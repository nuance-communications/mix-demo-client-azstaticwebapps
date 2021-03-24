"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import json
import logging
import os

from providers import YahooFinance

import azure.functions as func

SUCCESS_CODE = '0'

stock_api = YahooFinance()


def get_asset_price(req):

    req_body = req.get_json()
    logging.warn(req_body)

    ticker = req_body.get('eAssetTicker')

    if not ticker:
        return {
            'returnCode': 'error.input.ticker',
            'returnMessage': 'No ticker to search.',
        }

    ret = stock_api.get_price_for_asset(ticker)

    if not ret:
        return {
            'returnCode': 'error.yahoofinance',
            'returnMessage': 'Unable to get price.',
        }

    return {
        'returnCode': SUCCESS_CODE,
        'assetData': ret,
    }


def main(req: func.HttpRequest) -> func.HttpResponse:

    ret = get_asset_price(req)

    return func.HttpResponse(
        json.dumps(ret),
        mimetype='application/json',
        status_code=200
    )
