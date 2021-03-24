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

Wordset_Template = {
    "literal": "",
    "canonical": "",
    "spoken": [],
    "label": "",
    "image_url": "",
    "description": "",
}


def get_wordsets(phone_models):
    phone_model_wordset = []
    phone_manufacturer_wordset = []
    phone_color_wordset = []
    phone_capacity_wordset = []

    for model in phone_models:
        # phones
        w = Wordset_Template.copy()
        w['literal'] = w['label'] = model.get('display')
        w['canonical'] = model.get('id')
        w['image_url'] = model.get('imageUrl')
        w['description'] = model.get('description')
        w['spoken'] = model.get('spoken_forms')
        phone_model_wordset.append(w)
        # colors
        for color in model.get('colors'):
            cw = Wordset_Template.copy()
            cw['literal'] = cw['label'] = color.get('display')
            cw['canonical'] = color.get('id')
            cw['description'] = color.get('description')
            cw['spoken_forms'] = color.get('spoken_forms')
            if cw not in phone_color_wordset:
                phone_color_wordset.append(cw)
        # capacities
        for capacity in model.get('capacities'):
            cw = Wordset_Template.copy()
            cw['literal'] = cw['label'] = capacity.get('display')
            cw['canonical'] = capacity.get('id')
            cw['description'] = capacity.get('description')
            cw['spoken_forms'] = capacity.get('spoken_forms')
            if cw not in phone_capacity_wordset:
                phone_capacity_wordset.append(cw)
        # manufacturer
        mw = Wordset_Template.copy()
        mw['literal'] = w['label'] = mw['canonical'] = model.get(
            'manufacturer')
        if mw not in phone_manufacturer_wordset:
            phone_manufacturer_wordset.append(mw)

    return {
        "model": phone_model_wordset,
        "manufacturer": phone_manufacturer_wordset,
        "color": phone_color_wordset,
        "capacity": phone_capacity_wordset
    }


def main(req: func.HttpRequest) -> func.HttpResponse:

    try:
        req_body = req.get_json()
        logging.warn(req_body)
    except ValueError:
        # empty body
        req_body = {}

    try:
        model = req_body.get('ePhoneModel')
        manufacturer = req_body.get('ePhoneManufacturer')
        color = req_body.get('ePhoneColor')
        capacity = req_body.get('ePhoneCapacity')

        phone_models = PhoneStore.get_phones(
            model, manufacturer, color, capacity)

        wordsets = get_wordsets(phone_models)

        ret = {
            'returnCode': SUCCESS_CODE,
            'returnMessage': 'Filtered results.',
            'PhoneWordset': {
                'ePhoneModel': wordsets['model'],
                'ePhoneManufacturer': wordsets['manufacturer'],
                'ePhoneColor': wordsets['color'],
                'ePhoneCapacity': wordsets['capacity'],
            }
        }
    except Exception as ex:
        logging.exception(ex)
        ret = {
            'returnCode': 'error.undefined',
            'returnMessage': f'Undefined error: {str(ex)}',
        }

    return func.HttpResponse(
        json.dumps(ret),
        mimetype='application/json',
        status_code=200
    )
