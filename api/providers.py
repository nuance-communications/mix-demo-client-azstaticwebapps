"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import logging

import requests

import sendgrid
from sendgrid.helpers.mail import *

# Sample Providers


class SendgridEmail:

    """
    Scenario: API with Service Credential
    """

    def __init__(self, sendgrid_api_key, send_from):
        self.sendgrid_api_key = sendgrid_api_key
        self.send_from = send_from

    def send(self, send_to, send_subject, html):
        try:
            logging.warn(f"Sending email to {send_to} from {self.send_from} with {send_subject}")
            sg = sendgrid.SendGridAPIClient(api_key=self.sendgrid_api_key)
            mail = Mail(
                from_email=Email(self.send_from),
                to_emails=To(send_to),
                subject=send_subject,
                html_content=Content("text/html", html)
            )
            response = sg.client.mail.send.post(request_body=mail.get())
        except Exception as ex:
            logging.exception(ex.__dict__)
            return 400
        return response.status_code


class YahooFinance:

    """
    Scenario: Open API
    """

    def __init__(self):
        self.get_price_url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/{}?modules=summaryDetail,assetProfile'

    def get_price_for_asset(self, ticker):
        r = requests.get(self.get_price_url.format(ticker))
        logging.warn(r)
        if r.status_code == 200:
            rj = r.json()
            # ['summaryDetail']['assetProfile']
            return rj['quoteSummary']['result'][0]
        return None


class AccuWeather:

    """
    Scenario: API Requires Api Key
    Explicitly passed through in DA Action payload
    """

    def __init__(self):
        self.accuweather_base_url = 'http://dataservice.accuweather.com'

    def get_location_from_lat_lng(self, api_key, lat, lng):
        r = requests.get(
            f'{self.accuweather_base_url}/locations/v1/cities/geoposition/search',
            params={
                'apikey': api_key,
                'q': f'{lat},{lng}',
            })
        if r.status_code == 200:
            try:
                rj = r.json()
            except Exception as ex:
                logging.exception(ex)
            else:
                return rj
        logging.warn(r.__dict__)
        return None

    def get_location_from_city(self, api_key, city):
        r = requests.get(
            f'{self.accuweather_base_url}/locations/v1/cities/search',
            params={
                'apikey': api_key,
                'q': city,
            })
        if r.status_code == 200:
            try:
                rj = r.json()
                return rj[0]
            except Exception as ex:
                logging.exception(ex)
        logging.warn(r.__dict__)
        return None

    def get_current_conditions(self, api_key, location_key):
        r = requests.get(
            f'{self.accuweather_base_url}/currentconditions/v1/{location_key}',
            params={
                'apikey': api_key,
            })
        if r.status_code == 200:
            try:
                rj = r.json()
            except Exception as ex:
                logging.exception(ex)
            else:
                return rj
        logging.warn(r.__dict__)
        return None


class PhoneStore:

    """
    Scenario: Complete Mock API
    Credit: AT&T store for inspiration.
    """

    Phones = [
        {
            "id": "IPHONE12PROMAX",
            "display": "iPhone 12 Pro Max",
            "description": "",
            "manufacturer": "Apple",
            "price": 1099.99,
            "colors": [
                {
                    "id": "pacificblue",
                    "display": "Pacific Blue",
                    "description": "#2D4E5C",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "graphite",
                    "display": "Graphite",
                    "description": "#52514D",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "gold",
                    "display": "Gold",
                    "description": "#FCEBD3",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "silver",
                    "display": "Silver",
                    "description": "#E3E4DF",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
            ],
            "capacities": [
                {
                    "id": "128GB",
                    "display": "128GB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 1099.99,
                },
                {
                    "id": "256GB",
                    "display": "256GB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 1199.99,
                },
                {
                    "id": "512GB",
                    "display": "512GB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 1299.99,
                },
            ],
            "imageUrl": "https://www.att.com/shopcms/media/att/catalog/devices/apple-iphone%2012%20pro%20max-pacific%20blue-240x320.png",
            "spoken_forms": ["iPhone 12 Pro Max", "Pro Max"],
        },
        {
            "id": "IPHONE12",
            "display": "iPhone 12",
            "description": "",
            "manufacturer": "Apple",
            "price": 999.99,
            "colors": [
                {
                    "id": "pacificblue",
                    "display": "Pacific Blue",
                    "description": "#2D4E5C",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "graphite",
                    "display": "Graphite",
                    "description": "#52514D",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "gold",
                    "display": "Gold",
                    "description": "#FCEBD3",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "silver",
                    "display": "Silver",
                    "description": "#E3E4DF",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
            ],
            "capacities": [
                {
                    "id": "128GB",
                    "display": "128GB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 999.99,
                },
                {
                    "id": "256GB",
                    "display": "256GB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 1099.99,
                },
                {
                    "id": "512GB",
                    "display": "512GB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 1199.99,
                },
            ],
            "imageUrl": "https://www.att.com/shopcms/media/att/catalog/devices/apple-iphone%2012%20pro-graphite-240x320.png",
            "spoken_forms": ["iPhone 12"],
        },
        {
            "id": "PIXEL5",
            "display": "Pixel 5",
            "description": "",
            "manufacturer": "Google",
            "price": 724.99,
            "colors": [
                {
                    "id": "justblack",
                    "display": "Just Black",
                    "description": "#000000",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "sortasage",
                    "display": "Sorta Sage",
                    "description": "#9CADA5",
                    "imageUrl": "",
                    "spoken_forms": [],
                }
            ],
            "capacities": [
                {
                    "id": "128GB",
                    "display": "128GB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 724.99,
                },
            ],
            "imageUrl": "https://www.att.com/shopcms/media/att/catalog/devices/google-pixel%205-just%20black-240x320.png",
            "spoken_forms": ["Pixel 5", "Pixel Five"],
        },
        {
            "id": "S21",
            "display": "Galaxy S21",
            "description": "",
            "manufacturer": "Samsung",
            "colors": [
                {
                    "id": "PHANTOMWHITE",
                    "display": "Phantom White",
                    "description": "#E9E9E7",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "PHANTOMPINK",
                    "display": "Phantom Pink",
                    "description": "#EFC5BE",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "PHANTOMVIOLET",
                    "display": "Phantom Violet",
                    "description": "#A5A8C4",
                    "imageUrl": "",
                    "spoken_forms": [],
                },
                {
                    "id": "PHANTOMGRAY",
                    "display": "Phantom Gray",
                    "description": "#6E7074",
                    "imageUrl": "",
                    "spoken_forms": [],
                }
            ],
            "capacities": [
                {
                    "id": "512GB",
                    "display": "512GB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 799.99,
                },
                {
                    "id": "1024GB",
                    "display": "1TB",
                    "description": "",
                    "imageUrl": "",
                    "spoken_forms": [],
                    "price": 899.99,
                },
            ],
            "imageUrl": "https://www.att.com/shopcms/media/att/catalog/devices/samsung-galaxy%20s21%205g-phantom%20gray-240x320.png",
            "spoken_forms": ["S21", "S 21", "Galaxy S twenty one"],
        },
    ]

    def __init__(self):
        pass

    @staticmethod
    def check_exists(phone, prop, value):
        for item in phone.get(prop):
            if item.get('id') == value:
                return True
        return False

    @staticmethod
    def get_phones(model, manufacturer, color, capacity):
        ret = []
        for phone in PhoneStore.Phones:
            if model and not (phone.get('id') == model or phone.get('display') == model):
                logging.warn(f'skipping model: {model}')
                continue
            if manufacturer and not phone.get('manufacturer') == manufacturer:
                logging.warn(f'skipping manufacturer: {manufacturer}')
                continue
            if color and not PhoneStore.check_exists(phone, 'colors', color):
                logging.warn(f'skipping color: {color}')
                continue
            if capacity and not PhoneStore.check_exists(phone, 'capacities', capacity):
                logging.warn(f'skipping capacity: {capacity}')
                continue
            ret.append(phone)
        return ret
