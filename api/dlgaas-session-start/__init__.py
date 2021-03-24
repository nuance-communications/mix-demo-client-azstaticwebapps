"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import logging
import json

import azure.functions as func

from xaas import DlgaasApi
from xaas import config


def main(req: func.HttpRequest) -> func.HttpResponse:

    urn = None
    token = None
    raw_payload = None

    api = DlgaasApi(config)

    try:
        req_body = req.get_json().get('data')
    except ValueError:
        return func.HttpResponse(
            json.dumps({
                "error": "Must provide `modelUrn`, `token` and `rawPayload`"
            }),
            status_code=500
        )
    else:
        urn = req_body.get('modelUrn')
        token = req_body.get('token')
        raw_payload = req_body.get('rawPayload', '{}')

    api._token = token

    try:
        ret = api.start(urn, raw_payload)
    except Exception as ex:
        return func.HttpResponse(
            json.dumps({
                "error": str(ex)
            }),
            mimetype='application/json',
            status_code=500
        )

    if ret.get('error'):
        return func.HttpResponse(
            json.dumps({
                "error": ret['error']
            }),
            mimetype='application/json',
            status_code=400
        )

    logging.warning(ret)

    return func.HttpResponse(
        json.dumps({
            "payload": ret['payload'],
        }),
        mimetype='application/json',
        status_code=200
    )
