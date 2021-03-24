"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import json
import logging
import os

import azure.functions as func

SUCCESS_CODE = '0'


def main(req: func.HttpRequest) -> func.HttpResponse:

    ret = {
        'returnCode': 'error.undefined',
        'returnMessage': 'Undefined error',
    }
    unauthorized = None  # Example

    req_body = req.get_json()
    logging.warn(req_body)

    if unauthorized:
        ret = {
            'returnCode': 'error.unauthorized',
            'returnMessage': 'Unauthorized Request'
        }
    else:
        ret = {
            'returnCode': SUCCESS_CODE,
            'returnMessage': 'Hello world.'
        }

    return func.HttpResponse(
        json.dumps(ret),
        mimetype='application/json',
        status_code=200
    )
