"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import json

import azure.functions as func

from xaas import LogApi
from xaas import config


def main(req: func.HttpRequest) -> func.HttpResponse:

    client_id = None
    token = None

    try:
        req_body = req.get_json().get('data')
    except ValueError:
        pass
    else:
        client_id = req_body.get('clientId')
        token = req_body.get('token')

    api = LogApi(config, client_id)
    api._token = token

    topic, client_name = api.parse_client_id(client_id)

    ret1 = api.create_consumer()
    ret2 = api.consumer_subscribe_to_topic(topic)

    return func.HttpResponse(
        json.dumps({
            "createPayload": ret1,
            "subscribePayload": ret2,
            "consumerName": api.consumer_name,
            "consumerGroup": api.consumer_group
        }),
        mimetype='application/json',
        status_code=200
    )
