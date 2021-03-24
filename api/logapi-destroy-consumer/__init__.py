"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import sys
import logging
import json
import datetime
import urllib.parse

import azure.functions as func

from xaas import LogApi
from xaas import config


def main(req: func.HttpRequest) -> func.HttpResponse:

    urn = None
    token = None
    consumer_name = None
    consumer_group = None

    try:
        req_body = req.get_json().get('data')
    except ValueError:
        pass
    else:
        client_id = req_body.get('clientId')
        token = req_body.get('token')
        consumer_name = req_body.get('consumerName')
        consumer_group = req_body.get('consumerGroup')

    if not consumer_name or not consumer_group:
        return func.HttpResponse(
            json.dumps({
                "error": "No consumer_name or consumer_group provided",
            }),
            mimetype='application/json',
            status_code=400
        )

    api = LogApi(config, client_id)
    api._token = token
    api.override_consumer(consumer_group, consumer_name)

    ret1 = api.consumer_unsubscribe()
    ret2 = api.destroy_consumer()

    if ret1.get('error_code'):
        return func.HttpResponse(
            json.dumps(ret1),
            mimetype='application/json',
            status_code=500
        )

    logging.warn(f'Destroyed consumer {ret2}')

    return func.HttpResponse(
        json.dumps({
            "unsubPayload": ret1,
            "destroyPayload": ret2
        }),
        mimetype='application/json',
    )
