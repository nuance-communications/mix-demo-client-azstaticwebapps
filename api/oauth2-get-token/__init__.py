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

from xaas import OAuthApi
from xaas import config


def main(req: func.HttpRequest) -> func.HttpResponse:

    client_id = None
    client_secret = None
    scope = None

    try:
        req_body = req.get_json().get('data')
    except ValueError:
        pass
    else:
        client_id = req_body.get('clientId', config.get('oauth_client_id'))
        client_secret = req_body.get('clientSecret', config.get('oauth_client_secret'))
        scope = req_body.get('scope', 'nlu dlg log')

    if not client_id or not client_secret:
        return func.HttpResponse(
            json.dumps({
                "error": "Must use POST with `clientId` and `clientSecret`",
            }),
            mimetype='application/json',
            status_code=400
        )

    user_config = config.copy()
    user_config['oauth_client_id'] = client_id
    user_config['oauth_client_secret'] = client_secret
    user_config['oauth_scope'] = scope

    api = OAuthApi()
    api.init_from_config(user_config)

    try:
        access_token = api.token  # Init token
    except Exception as ex:
        return func.HttpResponse(
            json.dumps({
                "error": str(ex),
            }),
            status_code=500,
            mimetype='application/json'
        )

    return func.HttpResponse(
        json.dumps({
            "token": api._token,  # Raw token directly from OAuth server
        }),
        mimetype='application/json',
        status_code=200
    )
