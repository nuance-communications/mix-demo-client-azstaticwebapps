"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import logging
import json

import azure.functions as func

from xaas import TtsaasApi
from xaas import config


def main(req: func.HttpRequest) -> func.HttpResponse:

    token = None
    raw_payload = None

    api = TtsaasApi(config)

    try:
        req_body = req.get_json().get('data')
    except ValueError:
        return func.HttpResponse(
            json.dumps({
                "error": "Must provide `token` and `rawPayload`"
            }),
            mimetype='application/json',
            status_code=500
        )
    else:
        token = req_body.get('token')
        raw_payload = req_body.get('rawPayload', '{}')

    api._token = token  # Override

    try:
        ret = api.synthesize(raw_payload)
    except Exception as ex:
        return func.HttpResponse(
            json.dumps({
                "error": str(ex)
            }),
            mimetype='application/json',
            status_code=500
        )

    return func.HttpResponse(
        json.dumps({
            "payload": ret,
        }),
        mimetype='application/json',
        status_code=200
    )
