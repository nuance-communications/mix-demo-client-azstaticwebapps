"""
Copyright 2021-present, Nuance, Inc.
All rights reserved.

This source code is licensed under the Apache-2.0 license found in
the LICENSE.md file in the root directory of this source tree.
"""
import os
import logging
import json
import datetime
import urllib.parse
import uuid
import re
from random import randint

import requests
from requests_oauthlib import OAuth2Session
from oauthlib.oauth2 import BackendApplicationClient

osenv = os.environ
config = {
    "oauth_server_url": osenv.get('oauth_server_url', "https://auth.crt.nuance.com/oauth2"),
    "oauth_server_token_path": osenv.get('oauth_server_token_path', "/token"),
    "oauth_server_authorize_path": osenv.get('oauth_server_authorize_path', "/auth"),

    "base_url_dlgaas": osenv.get('base_url_dlgaas', "https://dlg.api.nuance.com/dlg/v1"),
    "base_url_nluaas": osenv.get('base_url_nluaas', "https://nlu.api.nuance.com/nlu/v1"),
    "base_url_ttsaas": osenv.get('base_url_ttsaas', "https://tts.api.nuance.com/api/v1"),
    "base_url_logapi": osenv.get('base_url_logapi', "https://log.api.nuance.com"),
    "oauth_scope": osenv.get('oauth_scope', "tts nlu dlg log"),
}

CLIENT_ID_REGEX = r"appID%3A(?P<topic>[^ $^%]*)(%3Ageo%3A)*(?P<geo>[^ $^%]*)?(%3AclientName%3A)*(?P<clientName>[^ $]*)?"

logger = logging.getLogger('mixclient')
logger.setLevel(logging.DEBUG)
sh = logging.StreamHandler()
sh.setLevel(logging.DEBUG)
logger.addHandler(sh)


class OAuthApi:
    """
    The API Class is responsible for handling tokens, making requests and parsing the response.
    Configuration must include OAuth2 server information as well as Mix Runtime API Host.
    """

    def __init__(self, oauth_client_id=None, oauth_client_secret=None, oauth_scope=None):
        super()
        self._token = None
        # OAuth2
        self.oauth_client_id = oauth_client_id
        self.oauth_client_secret = oauth_client_secret
        self.oauth_scope = oauth_scope

    def init_from_config(self, config):
        self.oauth_client_id = config.get('oauth_client_id')
        self.oauth_client_secret = config.get('oauth_client_secret')
        self.oauth_scope = config.get('oauth_scope')
        self.oauth_token_url = config.get('oauth_server_url') + \
            config.get('oauth_server_token_path')
        self._token = config.get('_token', None)

    def get_token(self):
        logger.info(f'Getting token for {self.oauth_client_id}')
        client = BackendApplicationClient(client_id=self.oauth_client_id)
        oauth = OAuth2Session(client=client, scope=self.oauth_scope)
        token = oauth.fetch_token(token_url=self.oauth_token_url,
                                  client_id=self.oauth_client_id,
                                  client_secret=self.oauth_client_secret,
                                  scope=self.oauth_scope)
        return token

    @property
    def token(self):
        if self._token is None:
            self._token = self.get_token()
        return self._token['access_token']

    @property
    def base_url(self):
        pass

    def get_headers(self):
        return {
            'Accept': 'application/json; charset=utf-8',
            'Authorization': f'Bearer {self.token}',
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'nuance-mix/demo-client-az-static-webapps',
        }

    def _request(self, method, url, data=None):
        _url = f"{self.base_url}/{url}"
        req_args = {
            "url": _url,
            "headers": self.get_headers(),
        }
        if method == 'post':
            req_args['data'] = json.dumps(data)
        try:
            ret = getattr(requests, method)(**req_args)
        except Exception as ex:
            # logger.error(f"\n\n{_url} <-> Encountered an Error:\n\n {ret.headers['grpc-message']}")
            logger.exception(ex)
            if ret:
                logger.error(ret.__dict__)
                return {
                    "error": f"{ret.headers['grpc-message']}",
                }
            else:
                return {
                    "error": str(ex),
                }
        # logger.debug(req_args)
        try:
            if ret.status_code in [400, 401, 403, 404, 500]:
                if 'grpc-message' in ret.headers:
                    return {
                        "error": ret.headers['grpc-message'],
                    }
                if ret.reason:
                    return {
                        "error": ret.reason,
                    }
                return {
                    "error": ret.json(),
                }
            if ret.status_code == 204:
                return {}
            # logger.info(ret)
            return ret.json()
        except Exception as ex:
            logger.exception(ex)
            logging.warning(ret.__dict__)
            return {"error": ret}

    def _get(self, url, data=None):
        return self._request('get', url, data)

    def _post(self, url, data=None):
        return self._request('post', url, data)

    def _delete(self, url, data=None):
        return self._request('delete', url, data)


class LogApi(OAuthApi):
    """
    The API Class is responsible for making requests to the Log API.
    """

    def __init__(self, config, client_id=None):
        super()
        self.init_from_config(config)
        self.base_url_logapi = config.get("base_url_logapi")
        self.consumer_group = None
        self.consumer_name = None
        if client_id:
            app_id, client_name = self.parse_client_id(client_id)
            self.consumer_group = self.init_consumer_group(app_id, client_name)
            self.consumer_name = self.init_consumer_name()
            logger.info(f'{self.consumer_group} <-> {self.consumer_name}')

    @property
    def base_url(self):
        return self.base_url_logapi

    def get_headers(self):
        ret = super().get_headers()
        ret.update({
            "Accept": "application/json",
            "consumer-name": self.consumer_name,
            "consumer-group": self.consumer_group,
            "User-Agent": "nuance-mix/dev-client-az-static-webapps",
        })
        return ret

    def parse_client_id(self, client_id):
        expr = re.compile(CLIENT_ID_REGEX)
        match = expr.search(client_id)
        try:
            md = match.groupdict()
            topic = md.get('topic')
            client_name = md.get('clientName')
            if client_name is None or client_name == '':
                client_name = 'neap'  # legacy clients
        except:
            return None, None
        else:
            return topic, client_name

    def init_consumer_group(self, app_id, client_name='default'):
        cg = randint(0, 4)  # Limited to 4 consumer groups by default.
        return f"appID-{app_id}-clientName-{client_name}-{cg:02}"

    def init_consumer_name(self):
        guid = uuid.uuid4()
        return f"consumer-{guid}"

    def override_consumer(self, consumer_group, consumer_name):
        self.consumer_group = consumer_group
        self.consumer_name = consumer_name
        return True

    """
    Interface
    """

    def create_consumer(self):
        return self._post(f'consumers', {
            "auto.offset.reset": "latest",
            "auto.commit.enable": "true",
            "fetch.min.bytes": "-1",
            "consumer.request.timeout.ms": "0",
        })

    def consumer_subscribe_to_topic(self, topic):
        """
        Automatic Subscription
        """
        return self._post(f'consumers/subscription', {
            "topics": [topic],
        })

    def consumer_unsubscribe(self):
        return self._delete(f'consumers/subscription')

    def get_records(self):
        return self._get(f'consumers/records')

    def destroy_consumer(self):
        return self._delete(f'consumers')


class NluaasApi(OAuthApi):

    def __init__(self, config):
        super()
        self.init_from_config(config)
        self.base_url_nluaas = config.get("base_url_nluaas")

    @property
    def base_url(self):
        return self.base_url_nluaas

    """
    Interface
    """

    def interpret(self, raw_payload):
        return self._post(f'runtime/interpret', raw_payload)


class TtsaasApi(OAuthApi):

    def __init__(self, config):
        super()
        self.init_from_config(config)
        self.base_url_ttsaas = config.get("base_url_ttsaas")

    @property
    def base_url(self):
        return self.base_url_ttsaas

    """
    Interface
    """

    def get_voices(self):
        return self._get(f'voices')

    def synthesize(self, raw_payload):
        return self._post(f'synthesize', raw_payload)


class DlgaasApi(OAuthApi):
    """
    The API Class is responsible for making requests to the DLGaaS HTTP/1.1 API
    """

    def __init__(self, config):
        super()
        self.init_from_config(config)
        self.base_url_dlgaas = config.get("base_url_dlgaas")

    @property
    def base_url(self):
        return self.base_url_dlgaas

    """
    Interface
    """

    def start(self, model_ref_urn, raw_payload):
        urn = urllib.parse.quote(model_ref_urn, safe='')
        return self._post(f'start/{urn}', raw_payload)

    def execute(self, session_id, payload):
        sid = urllib.parse.quote(session_id, safe='')
        return self._post(f'execute/{session_id}', {"payload": payload})

    def stop(self, session_id):
        sid = urllib.parse.quote(session_id, safe='')
        return self._post(f'stop/{session_id}', {})
