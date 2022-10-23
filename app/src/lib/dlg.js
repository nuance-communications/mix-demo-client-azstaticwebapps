/*
 * Copyright 2022-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import { EventEmitter } from 'events'
import { 
  DialogServiceClient 
} from './proto/nuance/dlg/v1/dlg_interface_pb_service'
import { 
  websocketTransport
} from './websocket-transport'
import {
  StartRequest,
  ExecuteRequest,
  StopRequest,
  StreamInput,
  AsrParamsV1,
  TtsParamsV1
} from './proto/nuance/dlg/v1/dlg_messages_pb'
import {
  StartRequestPayload,
  ResourceReference,
  Selector,
  ExecuteRequestPayload,
  UserInput,
  RequestData,
  ExecuteResponsePayload
} from './proto/nuance/dlg/v1/common/dlg_common_messages_pb'


export class DlgClient extends EventEmitter {
  constructor(
    serviceUrl,
    tokenResolver
  ){
    super()
    this._serviceUrl = serviceUrl
    this._tokenResolver = tokenResolver
    this._dlgaas = null
    this._call = null
  }
  connect(){
    const client = this
    return new Promise((resolve, reject) => {
      client._tokenResolver().then(token => {
        client._dlgaas = new DialogServiceClient(client._serviceUrl, {
          // debug: true,
          transport: websocketTransport(undefined, undefined) // 'auth-token', token.access_token)
        })
        console.warn(client._dlgaas)
        resolve(client._dlgaas)
      })
    })
  }
  start(req){
    const client = this
    return new Promise((resolve, reject) => {
      client._tokenResolver().then(token => {
        let metadata = {
          'authorization': `Bearer ${token.access_token}`,
          // 'x-nuance-client-id': 'appID:devrel-demoapp-sandbox-20220110:geo:us:clientName:democlient',
        }
        console.info('metadata', metadata)
        client._call = client._dlgaas.start(req, metadata, 
          (error, response) => {
            if(error){
              reject()
            } else {
              resolve(response)
              client.emit('start')
            }
          })
      })
    })
  }
  execute(req){
    const client = this
    return new Promise((resolve, reject) => {
      client._tokenResolver().then(token => {
        let metadata = {
          'authorization': `Bearer ${token.access_token}`
        }
        client._dlgaas.execute(req, metadata, (error, response) => {
          if(error){
            reject()
          } else {
            resolve(response)
            client.emit('finish')
          }
        })
      })
    })
  }
  executeStream(){
    const client = this
    return new Promise((resolve, reject) => {
      client._tokenResolver().then(token => {
        let metadata = {
          'Authorization': `Bearer ${token.access_token}`
        }
        client._dlgaas.executeStream(metadata, (error, response) => {
          if(error){
            // reject()
          } else {
            // resolve(response)
          }
        })
        client._dlgaas.on('data', response => {

        })
        client._dlgaas.on('status', response => {
          console.warn(response.code, response.details)
        })
        client._dlgaas.on('end', response => {
          console.warn('ended')
        })
      })
    })
  }
  stop(sessionId){
    if(this._call){
      this._call.stopSession(sessionId) // REVISIT
      this._call = null
    }
  }
}

export class DlgController extends EventEmitter {
  constructor(serviceUrl, tokenResolver){
    super()
    this._client = new DlgClient(serviceUrl, tokenResolver)
    this.wireUpClientEvents()
    this._client.connect().then(() => {
      console.warn("DLG CONNECTED")
    })
  }
  wireUpClientEvents(){
    let allData = []
    this._client.on('start', () => {
      this.emit('start')
    })
    this._client.on('data', data => {
      allData.push(data)
      this.emit('data', data)
    })
    this._client.on('result', data => {
      allData.push(data)
      this.emit('result', data)
    })
    this._client.on('finish', () => {
      this.emit('finish')
      this.stop()
    })
    this._client.on('end', () => {
      this.emit('end', allData)
      allData.length = 0
    })
    this._client.on('status', status => {
      console.log('received status', status)
      this.emit('status', status)
    })
    this._client.on('error', err => {
      this.emit('error', err)
      this.stop()
    })
  }
  // API

  async start(req, model_urn){
    if(this._client){
      let model = new ResourceReference()
      model.setUri(model_urn)
      model.setType(ResourceReference.EnumResourceType.APPLICATION_MODEL)

      let selector = new Selector()
      selector.setLanguage(req.selector.language)
      selector.setChannel(req.selector.channel)
      selector.setLibrary(req.selector.library)

      let payload = new StartRequestPayload()
      payload.setModelRef(model)
      // console.warn(req.payload.data)
      // payload.setData(req.payload.data) // REVISIT

      let startReq = new StartRequest()
      startReq.setSelector(selector)
      startReq.setPayload(payload)
      startReq.setSessionTimeoutSec(req.session_timeout_sec)
      // startReq.setUserId("user@domain.com");
      // startReq.setClientData(req.client_data)

      let res = this._client.start(startReq).then(() => {
        this.emit('start-session', res) // session
      })
      return res
    }
    return null
  }

  async streamInput(asrParams, ttsParams){
    this.emit('start-audio') // stream
  }

  async stop(){
    if(this._client){
      this._client.stop()
    }
    this.emit('stopped')
  }

  dispose(){
    this.stop()
    this.removeAllListeners()
  }
}