"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import json
import logging
import os

from providers import AccuWeather

import azure.functions as func

SUCCESS_CODE = '0'
weather_api = AccuWeather()


def patch_weather_url(ret):
    icon = ret[0]['WeatherIcon']
    ret[0]['_WeatherUrl'] = f'https://developer.accuweather.com/sites/default/files/{icon:02d}-s.png'


def process(req):

    req_body = req.get_json()
    logging.warn(req_body)

    api_key = req_body.get('apiKeyAccuweather')
    if not api_key:
        return {
            'returnCode': 'error.input.apikey',
            'returnMessage': 'Unauthorized. Please provide `apiKeyAccuweather` parameter.',
        }

    location_key = req_body.get('searchLocationKey')
    ret = weather_api.get_current_conditions(api_key, location_key)

    if not ret:
        return {
            'returnCode': 'accuweather.empty',
            'returnMessage': 'Pending wire up.',
        }

    # Hack....
    patch_weather_url(ret)

    return {
        'returnCode': '0',
        'weatherData': ret[0],
    }


def main(req: func.HttpRequest) -> func.HttpResponse:

    try:
        ret = process(req)
    except Exception as ex:
        logging.exception(ex)
        ret = {
            'returnCode': 'error.undefined',
            'returnMessage': f'Undefined error: {str(ex)}',
        }
    else:
        return func.HttpResponse(
            json.dumps(ret),
            mimetype='application/json',
            status_code=200
        )
