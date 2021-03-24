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


def prune_records(records, service='DLGaaS', for_session_id=None):
    """
    Prunes records based on service type, and possibly by session for DLG.
    """
    if not records or len(records) == 0:
        return records
    ret = []
    logging.debug(records)
    logging.warn(f"Got {len(records)} records.")
    for record in records:
        k = record['key']
        if k['service'] != service:
            continue
        if service == 'DLGaaS':
            v = record['value']
            d = v['data']
            if d.get('sessionid') and d.get('sessionid') == for_session_id:
                ret.append(record)
        else:
            ret.append(record)
    logging.warn(f"Returning with {len(ret)} records.")
    return ret


def main(req: func.HttpRequest) -> func.HttpResponse:

    consumer_name = None
    consumer_group = None
    token = None
    session_id = None
    service = None

    try:
        req_body = req.get_json().get('data')
    except ValueError:
        return func.HttpResponse(
            json.dumps({
                "error": """Must provide `consumerName`, `consumerGroup`, `token` and `sessionId`"""
            }),
            mimetype='application/json',
            status_code=500
        )
    else:
        consumer_name = req_body.get('consumerName')
        consumer_group = req_body.get('consumerGroup')
        token = req_body.get('token')
        service = req_body.get('service', 'DLGaaS')
        session_id = req_body.get('sessionId')

    api = LogApi(config)
    api._token = token
    api.override_consumer(consumer_group, consumer_name)

    logging.debug(f"Getting info for {consumer_group}")
    r = api.get_records()
    if isinstance(r, dict) and (r.get('error_code') or r.get('error')):
        logging.error(f"consumer_group: {consumer_group} res: {r}")
        return func.HttpResponse(
            json.dumps({
                "error": r,
            }),
            mimetype='application/json',
            status_code=500
        )

    ret = prune_records(r, service, session_id)
    return func.HttpResponse(
        json.dumps({
            "payload": ret,
        }),
        mimetype='application/json',
        status_code=200
    )
