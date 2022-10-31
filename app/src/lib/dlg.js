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
  ExecuteResponsePayload,
  Selectable,
  DialogEvent,
  SelectableItem
} from './proto/nuance/dlg/v1/common/dlg_common_messages_pb'
import { Struct } from 'google-protobuf/google/protobuf/struct_pb'
import { 
  AudioFormat, 
  EnumUtteranceDetectionMode, 
  PCM 
} from './proto/nuance/asr/v1/recognizer_pb'
import { EnumResultType } from './proto/nuance/asr/v1/result_pb'
const grpc = require("@improbable-eng/grpc-web").grpc;

export class DlgClient extends EventEmitter {
  constructor(
    serviceUrl,
    tokenResolver
  ){
    super()
    this._serviceUrl = serviceUrl
    this._tokenResolver = tokenResolver
    this._dlgaas = null // web-gRPC
    this._dlgaas_stream = null // WebSockets
    this._call = null
    this._recoStarted = false
    this._requestBuffer = []
  }
  connect(){
    const client = this
    return new Promise((resolve, reject) => {
      if(this._dlgaas){
        resolve()
        return
      }
      client._tokenResolver().then(token => {
        client._dlgaas = new DialogServiceClient(client._serviceUrl)
        client._dlgaas_stream = new DialogServiceClient(client._serviceUrl, {
          transport: websocketTransport(undefined, undefined) // 'auth-token', token.access_token)
        })
        resolve()
      })
    })
  }

  clearBuffer(){
    this._requestBuffer.length = 0
  }

  messageHandler(msg){
    const client = this
    // console.log('ASRaaS returned a message.', msg)
    if(msg.hasAsrStatus()){
      const status = msg.getAsrStatus()
      if(status.getCode() === 100){
        console.warn('Ready to receive audio.')
        client.emit('start')
        client._recoStarted = true
      } else if(status.getCode() === 200){
        console.warn('Completed.', status.getCode())
        client.emit('finish', false)
        client.clearBuffer()
      } else if(status.getCode() === 204){
        console.warn('Completed, No result.')
        client.emit('finish', true)
        client.clearBuffer()
      } else if(status.getCode() >= 400){
        const error = new Error(`${status.getMessage()}: ${status.getDetails()}`)
        error.code = status.getCode()
        client.emit('error', error)
      } 
    } else if (msg.hasAsrStartOfSpeech()){
      console.log('Has start of speech')
      client.emit('start_of_speech', 
        msg.getAsrStartOfSpeech().getFirstAudioToStartOfSpeechMs())
    } else if (msg.hasAsrResult()) {
      client.emit('result', msg.getAsrResult().toObject())
    }
    client.emit('data', msg.toObject())
  }
  writeAudio(buffer){
    let reqChunk = new StreamInput()
    reqChunk.setAudio(new Uint8Array(buffer))
    if(this._call && this._recoStarted){
      if(this._requestBuffer.length){
        console.info("Submitting audio from queue.")
        for (const streamReq of this._requestBuffer){
          this._call.write(streamReq)
        }
        this.clearBuffer()
      }
      // console.log("Sending....", reqChunk, buffer)
      this._call.write(reqChunk)
    } else {
      console.warn("Queue audio for streaming when ASRaaS is ready.")
      this._requestBuffer.push(reqChunk)
    }
  }
  end(){
    if(this._call){
      this._call.end()
      this._call = null
    }
  }
  cancel(){
    if(this._call){
      this._call.cancel()
    }
  }
  async start(req){
    const client = this
    const token = await client._tokenResolver()
    return new Promise((resolve, reject) => {
      let metadata = new grpc.Metadata({
        'Authorization': `Bearer ${token.access_token}`,
      })
      try{
        client._call = client._dlgaas.start(req, 
          metadata, (error, response) => {
            let ret = {
              "response": null,
              "error": null
            }
            if(error){
              ret.error = error
            } else {
              ret.response = response.toObject()
            }
            console.log('2 resolving with', ret, resolve)
            resolve(ret)
          }
        )
      } catch (ex) {
        reject(ex)
      }
    })
  }
  async execute(req){
    const client = this
    const token = await client._tokenResolver()
    return new Promise((resolve, reject) => {
      let metadata = new grpc.Metadata({
        'Authorization': `Bearer ${token.access_token}`,
      })
      try{
        client._call = client._dlgaas.execute(req, 
          metadata, (error, response) => {
            let ret = {
              "response": null,
              "error": null
            }
            if(error){
              ret.error = error
            } else {
              ret.response = response.toObject()
            }
            console.log('2 resolving with', ret, resolve)
            resolve(ret)
          }
        )
      } catch (ex) {
        reject(ex)
      }
    })
  }
  async executeStream(streamInput, clientID){
    const client = this
    return new Promise((resolve, reject) => {
      client._tokenResolver().then(token => {
        let metadata = {
          'Authorization': `Bearer ${token.access_token}`,
          'x-nuance-client-id': clientID
        }
        // CONNECT
        client._call = client._dlgaas_stream.executeStream(metadata)
        client._call.on('data', client.messageHandler.bind(this))
        client._call.on('end', status => {
          console.warn('ended')
          client._recoStarted = false
          client.clearBuffer()
          client.emit('end', status)
          resolve()
        })
        client._call.on('status', status => {
          client.emit('status', status)
        })
        client._call.on('error', error => {
          console.error(error)
          client._recoStarted = false
          client.emit('error', error)
          reject()
        })
        // START STREAM
        client._call.write(streamInput)
        // send buffered audio, if applicable..
        if(client._requestBuffer.length){
          console.log("Using queue..")
          for (const audioChunkReq of client._requestBuffer){
            client._call.write(audioChunkReq)
          }
          client.clearBuffer()
        }
        resolve('Started Stream Input Request')
      })
    })
  }
  async stop(req){
    if(this._call){
      this._call.cancel() // REVISIT
      this._call = null
    }
    const client = this
    return new Promise((resolve, reject) => {
      client._tokenResolver().then(token => {
        let metadata = new grpc.Metadata({
          'Authorization': `Bearer ${token.access_token}`,
        })
        try{
          client._call = client._dlgaas.stop(req, 
            metadata, (error, response) => {
              let ret = {
                "response": null,
                "error": null
              }
              if(error){
                ret.error = error
              } else {
                ret.response = response.toObject()
              }
              resolve(ret)
            }
          )
        } catch (ex) {
          reject(ex)
        }
      })
    })
  }
}

export class DlgController extends EventEmitter {

  constructor(serviceUrl, tokenResolver){
    super()
    this._audioSource = null
    this._onAudioHandler = this.onAudio.bind(this)
    this._client = new DlgClient(serviceUrl, tokenResolver)
    this.wireUpClientEvents()
  }

  connect(){
    return this._client.connect()
  }

  wireUpClientEvents(){
    const controller = this
    this._client.on('start', () => {
      controller.emit('start')
    })
    this._client.on('data', data => {
      controller.emit('data', data)
      if(data.response){
        controller.emit('result', data)
      }
    })
    this._client.on('result', data => {
      controller.emit('stream-result', data)
    })
    this._client.on('finish', () => {
      controller.emit('finish')
      controller.clearAudioHandler()
      controller.stop()
    })
    this._client.on('end', (status) => {
      // stream ended
      controller.emit('end', status)
    })
    this._client.on('status', status => {
      console.log('received status', status)
      if(status.code === 2){
        controller.clearAudioHandler()
      }
      controller.emit('status', status)
    })
    this._client.on('error', err => {
      controller.setAudioSource(null)
      controller.emit('error', err)
    })
  }

  setAudioSource(source){
    this.clearAudioHandler()
    this._audioSource = source
  }

  clearAudioHandler(){
    if(this._audioSource){
      this._audioSource.off('audio', this._onAudioHandler)
    }
  }

  onAudio(audio){
    if(this._client){
      this._client.writeAudio(audio)
    }
  }

  // API

  async start(model_urn, req){
    if(!this._client){
      return null
    }

    let model = new ResourceReference()
    model.setUri(model_urn)
    model.setType(ResourceReference.EnumResourceType.APPLICATION_MODEL)

    let selector = new Selector()
    selector.setLanguage(req.selector.language)
    selector.setChannel(req.selector.channel)
    selector.setLibrary(req.selector.library)

    let payload = new StartRequestPayload()
    payload.setModelRef(model)
    payload.setData(Struct.fromJavaScript(req.payload.data))

    let startReq = new StartRequest()
    startReq.setSelector(selector)
    startReq.setPayload(payload)
    startReq.setSessionTimeoutSec(req.session_timeout_sec)

    let ret = null
    await this._client.start(startReq).then(res => {
      ret = res
    })
    this.emit('start-session', ret) // session
    return ret
  }

  async execute(session_id, req){
    if(!this._client){
      return null
    }

    // SETUP
    let execPayload = new ExecuteRequestPayload()

    // Use case 1: INPUT
    // 1a: Selectable
    // 1b: DTMF simulation
    // 1c: Text
    if(req.user_input){
      let input = new UserInput()
      if(req.user_input.interpretation){
        let interpretation = new UserInput.Interpretation()
        interpretation.setConfidence(req.user_input.interpretation.confidence)
        if(req.user_input.interpretation.input_mode){
          interpretation.setInputMode(req.user_input.interpretation.input_mode)
        }
        let data = interpretation.getDataMap()
        Object.entries(req.user_input.interpretation.data).map(([k,v]) => {
          data.set(k, v)
        })
        let confidences = interpretation.getSlotConfidencesMap().getEntryList()
        Object.entries(req.user_input.interpretation.slot_confidences).map(([k,v]) => {
          confidences.push([k,v])
        })
        let literals = interpretation.getSlotLiteralsMap().getEntryList()
        Object.entries(req.user_input.interpretation.slot_literals).map(([k,v]) => {
          literals.push([k,v])
        })
        input.setInterpretation(interpretation)
      }
      if(req.user_input.selected_item){
        let selection = new Selectable.SelectableItem.SelectedValue()
        selection.setId(req.user_input.selected_item.id)
        selection.setValue(req.user_input.selected_item.value)
        input.setSelectedItem(selection)
      }
      if(req.user_input.user_text) {
        input.setUserText(req.user_input.user_text)
        switch(req.user_input.input_mode){
          case 'dtmf':
            input.setInputMode('dtmf')
            break
          default:
            break
        }
      }
      execPayload.setUserInput(input)
    }

    // Use case 2: EVENT
    if(req.dialog_event){
      let dialogEvt = new DialogEvent()
      switch(req.dialog_event.type){
        case 'NO_INPUT':
          dialogEvt.setType(DialogEvent.EventType.NO_INPUT)
          break
        case 'NO_MATCH':
          dialogEvt.setType(DialogEvent.EventType.NO_MATCH)
          break
        case 'HANGUP':
          dialogEvt.setType(DialogEvent.EventType.HANGUP)
          break
        case 'CUSTOM':
          // TODO: improve
          dialogEvt.setType(DialogEvent.EventType.CUSTOM)
          break
      }
      dialogEvt.setMessage(req.dialog_event.message)
      execPayload.setDialogEvent(dialogEvt)
    }

    // Use case 3: DATA
    if(req.requested_data){
      let data = new RequestData()
      data.setId(req.requested_data.id)
      data.setData(Struct.fromJavaScript(req.requested_data.data))
      execPayload.setRequestedData(data)
    }

    let executeReq = new ExecuteRequest()
    executeReq.setSessionId(session_id)
    executeReq.setPayload(execPayload)

    // REQUEST
    let ret = null
    await this._client.execute(executeReq).then(res => {
      ret = res
    })
    return ret
  }

  async executeStream({sessionId, asrSettings, clientID}){
    if(!this._client){
      return null
    }

    // Request Payload
    let execPayload = new ExecuteRequestPayload()
    let executeReq = new ExecuteRequest()
    executeReq.setSessionId(sessionId)
    executeReq.setPayload(execPayload)
  
    // Speech Input - assumes PCM
    let asrParams = new AsrParamsV1()
    let pcm = new PCM()
    if(asrSettings.sampleRateHz){
      pcm.setSampleRateHz(asrSettings.sampleRateHz)
    }
    let pcmFormat = new AudioFormat()
    pcmFormat.setPcm(pcm)
    asrParams.setAudioFormat(pcmFormat)
    switch(asrSettings.utteranceDetection){
      case 'single':
        asrParams.setUtteranceDetectionMode(EnumUtteranceDetectionMode.SINGLE)
        break
      case 'multiple':
        asrParams.setUtteranceDetectionMode(EnumUtteranceDetectionMode.MULTIPLE)
        break
    }
    switch(asrSettings.resultType){
      case 'partial':
        asrParams.setResultType(EnumResultType.PARTIAL)
        break
      case 'final':
        asrParams.setResultType(EnumResultType.FINAL)
        break
    }
    if(asrSettings.noInputTimeout){
      asrParams.setNoInputTimeoutMs(asrSettings.noInputTimeout)
    }
    if(asrSettings.speechDetectionSensitivity){
      asrParams.setSpeechDetectionSensitivity(asrSettings.speechDetectionSensitivity)
    }

    const streamInput = new StreamInput()
    streamInput.setRequest(executeReq)
    streamInput.setAsrControlV1(asrParams)
    streamInput.setTtsControlV1(null)

    this.emit('start-audio')

    if(this._audioSource){
      this._audioSource.on('audio', this._onAudioHandler)
    }
    await this._client.executeStream(streamInput, clientID)

    return streamInput
  
  }

  async stopExecuteStream(){
    if(this._audioSource){
      this._audioSource.off('audio', this._onAudioHandler)
    }
    if(this._client){
      this._client.end()
    }
    this.emit('stream-stopped', {})
  }

  async stop(req){
    if(!this._client){
      return null
    }
    if(!req){
      return null
    }
    if(!req.sessionId){
      return null
    }
    let stopReq = new StopRequest()
    stopReq.setSessionId(req.sessionId)
    let ret = null
    await this._client.stop(stopReq).then(res => {
      ret = res
    })
    this.emit('stopped')
    return ret
  }

  dispose(){
    this.stop()
    this.removeAllListeners()
  }
}