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


def process(req):

    ret = {
        'returnCode': 'error.undefined',
        'returnMessage': 'Undefined error',
    }

    req_body = req.get_json()
    logging.warn(req_body)

    api_key = req_body.get('apiKeyAccuweather')
    if not api_key:
        return {
            'returnCode': 'error.input.apikey',
            'returnMessage': 'Unauthorized. Please provide `apiKeyAccuweather` parameter.',
        }

    lat_lng = req_body.get('searchLatLng', {})
    city = req_body.get('eCity')
    # Search CITY over LAT LNG
    if city:
        ret = weather_api.get_location_from_city(api_key, city)
    elif lat_lng != {}:
        lat, lng = lat_lng.get('latitude'), lat_lng.get('longitude')
        ret = weather_api.get_location_from_lat_lng(api_key, lat, lng)

    if ret is None:
        return {
            'returnCode': 'accuweather.error.city',
            'returnMessage': 'Failed to resolve city.',
        }
    return {
        'returnCode': '0',
        'searchLocationKey': ret['Key'],
        'searchLocationData': ret,
    }


def main(req: func.HttpRequest) -> func.HttpResponse:

    ret = process(req)

    return func.HttpResponse(
        json.dumps(ret),
        mimetype='application/json',
        status_code=200
    )
