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
    quantity = req_body.get('eQuantity')
    eAmount = req_body.get('eAmount')

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

    num_shares = 0.0
    total = 0
    purchased = False

    if quantity is not None:
        num_shares = float(quantity)
        total = ret['summaryDetail']['open']['raw'] * int(quantity)
        purchased = True # mock

    elif eAmount is not None:
        num_shares = eAmount['number'] / ret['summaryDetail']['open']['raw'] # assume USD unit
        total = eAmount['number']
        purchased = True # mock

    return {
        'returnCode': SUCCESS_CODE,
        'assetPurchaseData': {
            'totalAmount': total,
            'numShares': num_shares,
            'purchased': purchased,
            'transactionId': '10104-2491-4191-29141',
        },
    }


def main(req: func.HttpRequest) -> func.HttpResponse:

    ret = get_asset_price(req)

    return func.HttpResponse(
        json.dumps(ret),
        mimetype='application/json',
        status_code=200
    )
