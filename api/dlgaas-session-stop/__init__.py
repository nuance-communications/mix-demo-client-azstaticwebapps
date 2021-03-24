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

    session_id = None
    token = None

    api = DlgaasApi(config)

    try:
        req_body = req.get_json().get('data')
    except ValueError:
        pass
    else:
        session_id = req_body.get('sessionId')
        token = req_body.get('token')

    api._token = token

    try:
        ret = api.stop(session_id)
    except Exception as ex:
        logging.exception(ex)
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

    return func.HttpResponse(status_code=204)
