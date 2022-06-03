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
  AudioFormat, PCM, RecognitionFlags, RecognitionInitMessage,
  RecognitionParameters
} from './proto/nuance/asr/v1/recognizer_pb'
import { RecognitionResource, ResourceReference } from './proto/nuance/asr/v1/resource_pb'
import { 
  RecognitionRequest
} from './proto/nuance/asr/v1/recognizer_pb'
import { RecognizerClient } from './proto/nuance/asr/v1/recognizer_pb_service'
import { websocketTransport } from './websocket-transport'

import { CLIENT_DATA } from "../components/shared"

export const AsrResponseType = {
  CONTINUE: "continue",
  STATUS: 'status',
  PARTIAL: 'partial',
  FINAL: 'final',
  UNHANDLED: 'unhandled'
}

export class AsrClient extends EventEmitter {
  constructor(
    serviceUrl,
    tokenResolver,
    authQueryParam='auth-token'
  ){
    super()
    this._serviceUrl = serviceUrl
    this._tokenResolver = tokenResolver
    this._authQueryParam = authQueryParam
    this._call = null
    this._requestQueue = []
    this._recoStarted = false
  }
  start(req, callbackFn){
    const client = this
    return new Promise((resolve, reject) => {
      client._tokenResolver().then((token) => {
        let recoClient = new RecognizerClient(client._serviceUrl, {
          transport: websocketTransport(client._authQueryParam, token.access_token)
        })
        client._call = recoClient.recognize()
        client._call.on('data', client.messageHandler.bind(this))
        client._call.on('end', status => {
          console.log(status)
          client._recoStarted = false
          client.clearQueue()
          client.emit('end', status)
        })
        client._call.on('status', status => {
          client.emit('status', status)
        })
        client._call.on('error', error => {
          console.error(error)
          client.emit('error', error)
        })
        let recoRequest = new RecognitionRequest()
        recoRequest.setRecognitionInitMessage(req.getInitMessage())
        client._call.write(recoRequest)
        if(client._requestQueue.length){
          console.log("Using queue..")
          for (const recoRequest of client._requestQueue){
            client._call.write(recoRequest)
          }
          client.clearQueue()
        }
        resolve('Started ASR Recognition Request')
      })
    })
  }
  clearQueue(){
    this._requestQueue.length = 0
  }
  messageHandler(msg){
    const client = this
    console.log('ASRaaS returned a message.', msg)
    if(msg.hasStatus()){
      const status = msg.getStatus()
      if(status.getCode() === 100){
        // console.warn('Ready to receive audio.')
        client.emit('start')
        client._recoStarted = true
      } else if(status.getCode() === 200){
        console.warn('Completed.', status.getCode())
        client.emit('finish', false)
        client.clearQueue()
      } else if(status.getCode() === 204){
        console.warn('Completed, No result.')
        client.emit('finish', true)
        client.clearQueue()
      } else if(status.getCode() >= 400){
        const error = new Error(`${status.getMessage()}: ${status.getDetails()}`)
        error.code = status.getCode()
        client.emit('error', error)
      } 
    } else if (msg.hasStartOfSpeech()){
      console.log('Has start of speech')
      client.emit('start_of_speech', 
        msg.getStartOfSpeech().getFirstAudioToStartOfSpeechMs())
    } else if (msg.hasResult()) {
      client.emit('result', msg.getResult().toObject())
    }
    client.emit('data', msg)
  }
  writeAudio(buffer){
    const reqChunk = new RecognitionRequest()
    reqChunk.setAudio(new Uint8Array(buffer))
    if(this._call && this._recoStarted){
      if(this._requestQueue.length){
        console.warn("Submitting audio from queue.")
        for (const recoRequest of this._requestQueue){
          this._call.write(recoRequest)
        }
        this.clearQueue()
      }
      // console.log("Sending....", reqChunk, buffer)
      this._call.write(reqChunk)
    } else {
      console.warn("Queue audio for streaming when ASRaaS ready.")
      this._requestQueue.push(reqChunk)
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
}

export class AsrController extends EventEmitter {
  constructor(serviceUrl, tokenResolver) {
    super()
    this._audioSource = null
    this._onAudioHandler = this.onAudio.bind(this)
    this._client = new AsrClient(serviceUrl, tokenResolver)
    this.wireUpClientEvents()
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
  async startRecognizing(asrRequest){
    await this._client.start(asrRequest, (error, stats) => {
      this.emit('done', { error, stats })
    })
    if(this._audioSource){
      this._audioSource.on('audio', this._onAudioHandler)
    }
    this.emit('started')
  }
  async stop(){
    if(this._audioSource){
      this._audioSource.off('audio', this._onAudioHandler)
    }
    if(this._client){
      this._client.end()
    }
    this.emit('stopped')
  }
  setAudioSource(source){
    this._audioSource = source
  }
  onAudio(audio){
    if(this._client){
      this._client.writeAudio(audio)
    }
  }
  dispose(){
    this.stop()
    this.removeAllListeners()
  }
}

export class AsrRequest {
  constructor({
    id, 
    language, 
    topic,
    utteranceDetectionMode, 
    resultType, 
    autoPunctuate = false,
    maskLoadFailures = false,
    filterProfanity = false,
    filterWakeupWord = false,
    includeTokenization = false,
    suppressCallRecording = false,
    suppressInitialCapitalization = false,
    maxHypotheses = 0,
    noInputTimeoutMs = 0,
    recognitionTimeoutMs = 0,
    speechDetectionSensitivity,
    utteranceEndSilenceMs = 0,
    userId = null,
    inlineWordset={},
    dlmUrn = null
  }){
    this.id = id
    this.language = language
    this.topic = topic
    this.utteranceDetectionMode = utteranceDetectionMode
    this.resultType = resultType
    this.autoPunctuate = autoPunctuate
    this.maskLoadFailures = maskLoadFailures
    this.filterProfanity = filterProfanity
    this.filterWakeupWord = filterWakeupWord
    this.includeTokenization = includeTokenization
    this.suppressCallRecording = suppressCallRecording
    this.suppressInitialCapitalization = suppressInitialCapitalization
    this.maxHypotheses = maxHypotheses
    this.noInputTimeoutMs = noInputTimeoutMs
    this.recognitionTimeoutMs = recognitionTimeoutMs
    this.speechDetectionSensitivity = speechDetectionSensitivity
    this.utteranceEndSilenceMs = utteranceEndSilenceMs
    this.userId = userId

    this.inlineWordset = inlineWordset
    this.dlmUri = dlmUrn
    this.sampleRate = 16000
    
    this.res = null

    this.partialResults = []
    this.finalResult = null
    this.error = null
    this.raw_audio = null
  }
  setError(err){
    this.error = err
  }
  getError(){
    return this.error
  }
  setFinalResult(result){
    this.finalResult = result
  }
  getFinalResult(){
    return this.finalResult
  }
  addPartialResult(res){
    this.partialResults.unshift(res)
  }
  getPartialResults(){
    return this.partialResults
  }
  getId(){
    return this.id
  }
  wasSuccess(){
    return !this.error
  }
  getTransactionResponse(){
    let t = this.finalResult
    if(!t){
      if(this.partialResults.length){
        t = this.partialResults[0]
      } else {
        t = '...'
      }
    }
    return t
  }
  getTranscriptionHyp(){
    let t = this.getTransactionResponse()
    return t && t.hypothesesList ? t.hypothesesList[0] : {}
  }
  getPotentialTranscriptions() {
    let t = this.getTransactionResponse();
    return t && t.hypothesesList ? t.hypothesesList : []
  }
  getTranscriptionText(){
    return this.getTranscriptionHyp().formattedText
  }
  getTranscriptionMffText(){
    return this.getTranscriptionHyp().minimallyFormattedText
  }
  getTranscriptionScore(){
    let ret = this.getTranscriptionHyp().confidence
    if(ret){
      ret = ret.toFixed(3)
    }
    return ret
  }
  getUttInfo(){
  	let t = this.getTransactionResponse()
  	return t && t.utteranceInfo ? t.utteranceInfo : {}
  }
  getDatapack(){
  	let t = this.getTransactionResponse()
  	return t && t.dataPack ? t.dataPack : {}
  }
  getDuration(){
    let t = this.getTransactionResponse()
    return t && t.utteranceInfo ? t.utteranceInfo.durationMs : []
  }
  setAudio(audio){
    this.raw_audio = audio
  }
  getAudio(){
    return this.raw_audio
  }
  getInitMessage(){
    // NEEDS IMPROVEMENTS
    const recoParams = new RecognitionParameters()
    recoParams.setLanguage(this.language)
    recoParams.setTopic(this.topic)
    recoParams.setMaxHypotheses(this.maxHypotheses)
    recoParams.setNoInputTimeoutMs(this.noInputTimeoutMs)
    recoParams.setRecognitionTimeoutMs(this.recognitionTimeoutMs)
    if(this.speechDetectionSensitivity >= 0){
      recoParams.setSpeechDetectionSensitivity(this.speechDetectionSensitivity)
    }

    recoParams.setResultType(this.resultType)
    recoParams.setUtteranceDetectionMode(this.utteranceDetectionMode)
    recoParams.setUtteranceEndSilenceMs(this.utteranceEndSilenceMs)
    if(this.speechDomain){
      recoParams.setSpeechDomain(this.speechDomain)
    }

    const audioFormat = new AudioFormat()
    const pcm = new PCM()
    if (this.sampleRate) {
      pcm.setSampleRateHz(this.sampleRate)
    }
    audioFormat.setPcm(pcm)

    const recoFlags = new RecognitionFlags()
    recoFlags.setAutoPunctuate(this.autoPunctuate)
    recoFlags.setFilterProfanity(this.filterProfanity)
    recoFlags.setFilterWakeupWord(this.filterWakeupWord)
    recoFlags.setMaskLoadFailures(this.maskLoadFailures)
    recoFlags.setIncludeTokenization(this.includeTokenization)
    recoFlags.setSuppressCallRecording(this.suppressCallRecording)
    recoFlags.setSuppressInitialCapitalization(this.suppressInitialCapitalization)

    recoParams.setRecognitionFlags(recoFlags)
    recoParams.setAudioFormat(audioFormat)

    const initMsg = new RecognitionInitMessage({'clientDataMap':{
      'RequestID': this.id,
    }})
    initMsg.setParameters(recoParams)

    const resources = []

    // INLINE WORDSET
    if(this.inlineWordset && !{}===this.inlineWordset){
      const recoResourceIW = new RecognitionResource()
      recoResourceIW.setInlineWordset(this.inlineWordset)
      resources.push(recoResourceIW)
    }

    // DLM
    if(this.dlmUri){
      const recoResourceDLM = new RecognitionResource()
      const resourceReference = new ResourceReference()
      resourceReference.setType(3) // DLM
      resourceReference.setUri(this.dlmUri)
      resourceReference.setMaskLoadFailures(true)
      recoResourceDLM.setExternalReference(resourceReference)
      recoResourceDLM.setWeightValue(0.7)
      resources.push(recoResourceDLM)
    }

    if(resources.length){
      initMsg.setResourcesList(resources)
    }

    initMsg.setUserId(this.userId)
    Object.keys(CLIENT_DATA).forEach(key => {
      initMsg.getClientDataMap().set(key, CLIENT_DATA[key])
    })

    console.warn("RecoInitRequest...", initMsg.toObject())
    return initMsg
  }
}

export class AsrResponse {
  constructor(raw){
    this.raw = raw
  }
  getType(){
    if(this.raw.status){
      return AsrResponseType.STATUS
    }
    let result = this.raw
    if (result) {
      switch(result.resultType){
        case 1:
          return AsrResponseType.PARTIAL
        case 0:
          return AsrResponseType.FINAL
      }
    }
    return AsrResponseType.UNHANDLED
  }
}
