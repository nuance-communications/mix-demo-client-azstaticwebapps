/*
 * Copyright 2022-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
const WebSocket = require('isomorphic-ws');

const WebsocketSignal = {
  FINISH_SEND: 1
};

const finishSendFrame = new Uint8Array([1]);

function debug(...args) {
  if (console.debug) {
    console.debug.apply(null, args);
  } else {
    console.log.apply(null, args);
  }
}

const isAllowedControlChars = (char) => char === 0x9 || char === 0xa || char === 0xd;

function isValidHeaderAscii(val) {
  return isAllowedControlChars(val) || (val >= 0x20 && val <= 0x7e);
}

function encodeASCII(input) {
  const encoded = new Uint8Array(input.length);
  for (let i = 0; i !== input.length; ++i) {
    const charCode = input.charCodeAt(i);
    if (!isValidHeaderAscii(charCode)) {
      throw new Error('Metadata contains invalid ASCII');
    }
    encoded[i] = charCode;
  }
  return encoded;
}

/**
 * @function WebsocketTransport
 * @param queryParamKey string
 * @param queryParamValue string
 * @returns grpc.TransportFactory
 */
export function websocketTransport(queryParamKey, queryParamValue) {
  return (onError, opts) => {
    return websocketRequest(onError, opts, queryParamKey, queryParamValue);
  };
}

/**
 * @function websocketRequest
 * @param options grpc.TransportOptions
 * @param queryParamKey string
 * @param queryParamValue string
 * @returns grpc.Transport
 */
function websocketRequest(onError, options, queryParamKey, queryParamValue) {
  options.debug && debug('websocketRequest', options);

  if (queryParamKey && queryParamValue) {
    const url = new URL(options.url);
    url.searchParams.append(queryParamKey, queryParamValue);
    options.url = url.href;
  }
  let webSocketAddress = constructWebSocketAddress(options.url);

  const sendQueue = [];
  let ws;

  function sendToWebsocket(toSend) {
    if (toSend === WebsocketSignal.FINISH_SEND) {
      ws.send(finishSendFrame);
    } else {
      const byteArray = toSend;
      const c = new Int8Array(byteArray.byteLength + 1);
      c.set(new Uint8Array([0]));

      c.set(byteArray, 1);

      ws.send(c);
    }
  }

  return {
    sendMessage: (msgBytes) => {
      if (!ws || ws.readyState === ws.CONNECTING) {
        sendQueue.push(msgBytes);
      } else {
        sendToWebsocket(msgBytes);
      }
    },
    finishSend: () => {
      if (!ws || ws.readyState === ws.CONNECTING) {
        sendQueue.push(WebsocketSignal.FINISH_SEND);
      } else {
        sendToWebsocket(WebsocketSignal.FINISH_SEND);
      }
    },
    start: (metadata) => {
      ws = new WebSocket(webSocketAddress, ['grpc-websockets']);
      ws.binaryType = 'arraybuffer';
      ws.onopen = function () {
        options.debug && debug('websocketRequest.onopen');
        ws.send(headersToBytes(metadata));

        // send any messages that were passed to sendMessage before the connection was ready
        sendQueue.forEach(toSend => {
          sendToWebsocket(toSend);
        });
      };

      ws.onclose = function (closeEvent) {
        options.debug && debug('websocketRequest.onclose', closeEvent);
        options.onEnd();
      };

      ws.onerror = function (error) {
        onError.forEach(handler => {
          handler(error.error);
        });
        options.debug && debug('websocketRequest.onerror', error);
      };

      ws.onmessage = function (e) {
        options.onChunk(new Uint8Array(e.data));
      };

    },
    cancel: () => {
      options.debug && debug('websocket.abort');
      ws.close();
    }
  };
}

function constructWebSocketAddress(url) {
  if (url.substr(0, 8) === 'https://') {
    return `wss://${url.substr(8)}`;
  } else if (url.substr(0, 7) === 'http://') {
    return `ws://${url.substr(7)}`;
  }
  throw new Error('Websocket transport constructed with non-https:// or http:// host.');
}

function headersToBytes(headers) {
  let asString = '';
  headers.forEach((key, values) => {
    asString += `${key}: ${values.join(', ')}\r\n`;
  });
  return encodeASCII(asString);
}
