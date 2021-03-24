"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import json
import logging
import os

import azure.functions as func

from providers import SendgridEmail

SUCCESS_CODE = '0'
EMAIL_CUSTOM_TOKEN = os.environ.get('sendgrid_custom_token', 'm1x!5B4D455')

email_api = SendgridEmail(
    os.environ.get('sendgrid_api_key'),
    os.environ.get('sendgrid_from_email'))


def process(data):
    token = data.get('SENDGRID_TOKEN')
    if not token:
        return {
            'returnCode': 'error.service.token.missing',
            'returnMessage': 'No `SENDGRID_TOKEN` present.',
        }
    if token != EMAIL_CUSTOM_TOKEN:
        return {
            'returnCode': 'error.service.token.invalid',
            'returnMessage': 'Unauthorized. Denied Access.',
        }
    email = data.get('eEmail')
    if not email:
        return {
            'returnCode': 'error.input.email',
            'returnMessage': 'No eEmail present.',
        }

    sanitized = data
    del sanitized['SENDGRID_TOKEN']

    html = f"""
    <div>
        <h2>Mix.demo session info</h2>
        <p>The following contains information that was captured during your recent interaction</p>
        <pre>{json.dumps(sanitized, indent=2)}</pre>
    </div>
    """
    try:
        ret = email_api.send(email,
                             'Mix Demo Client Triggered Email', html)
    except Exception as ex:
        return {
            'returnCode': 'error.sendgrid.send',
            'returnMessage': str(ex),
        }
    return {
        'returnCode': SUCCESS_CODE,
        'returnMessage': f'Email provider status code was {ret}',
    }


def main(req: func.HttpRequest) -> func.HttpResponse:

    req_body = req.get_json()
    logging.warn('email request incoming')

    ret = process(req_body)

    return func.HttpResponse(
        json.dumps(ret),
        mimetype='application/json',
        status_code=200
    )
