"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import json
import logging
import os

from providers import PhoneStore

import azure.functions as func

SUCCESS_CODE = '0'


def main(req: func.HttpRequest) -> func.HttpResponse:

    req_body = req.get_json()
    logging.warn(req_body)

    try:
        model = req_body.get('ePhoneModel')
        manufacturer = req_body.get('ePhoneManufacturer')
        color = req_body.get('ePhoneColor')
        capacity = req_body.get('ePhoneCapacity')

        phone_models = PhoneStore.get_phones(
            model, manufacturer, color, capacity)

        if len(phone_models) > 1:
            ret = {
                'returnCode': 'error.more_than_one_phone',
                'returnMessage': f'Found {len(phone_models)} phones',
            }

        elif len(phone_models) == 1:
            apply_discount = False
            discount_applied = False
            phone = phone_models[0]
            phone_price = 0.0
            phone_capacity = None
            phone_color = None
            for cap in phone.get('capacities'):
                if cap.get('id') == capacity:
                    phone_price = cap.get('price')
                    phone_capacity = cap.get('display')
                    break
            for c in phone.get('colors'):
                if c.get('id') == color:
                    phone_color = c.get('display')
                    break
            if apply_discount:
                discount_applied = True
                phone_price -= 100
            ret = {
                'returnCode': SUCCESS_CODE,
                'phonePurchaseData': {
                    'phone': phone.get('display'),
                    'manufacturer': phone.get('manufacturer'),
                    'imageUrl': phone.get('imageUrl'),
                    'color': phone_color,
                    'capacity': phone_capacity,
                    'discounted': discount_applied,
                    'price': f'${phone_price:,}',  # formatting server side
                }
            }

        else:
            ret = {
                'returnCode': 'error.no_phones_found',
                'returnMessage': 'Unable to filter phones successfully.',
            }

    except Exception as ex:
        ret = {
            'returnCode': 'error.undefined',
            'returnMessage': f'Undefined error: {str(ex)}',
        }

    return func.HttpResponse(
        json.dumps(ret),
        mimetype='application/json',
        status_code=200
    )
