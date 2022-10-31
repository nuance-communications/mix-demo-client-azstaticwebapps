/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React, { useState } from "react"

import moment from 'moment'
import loadable from '@loadable/component'

import { BaseClass, AuthForm } from "./shared"
import { CLIENT_DATA, ROOT_URL, SIMULATED_EXPERIENCES, DLG_SERVICE_URL } from "./shared"
import { LogEventsTable, LogEventsViz } from "./log"
import ChatPanel from "./chat"
import TTSaaS from "../components/ttsaas"
import Form from 'react-bootstrap/Form'
import { ProcessingState } from "./asraas"

import { 
  DlgController, 
} from "../lib/dlg"
import { MicrophoneAudioSource } from "../lib/audio"
import { AsrResponse, AsrResponseType } from "../lib/asr"

const ReactJson = loadable(() => import('react-json-view'))
const Button = loadable(() => import('react-bootstrap/Button'))
const Tabs = loadable(() => import('react-bootstrap/Tabs'))
const Tab = loadable(() => import('react-bootstrap/Tab'))
const TabContent = loadable(() => import('react-bootstrap/TabContent'))


const ACTION_TYPES = [ 
  'qaAction',
  'daAction',
  'continueAction',
  // 'escalationAction',
  // 'endAction'
]

// Data Handlers

const USER_1 = {
  'id': '0000',
  'firstName': 'Nancy',
  'lastName': 'Taylor',
  'email': 'nancy.taylor@contoso.com',
  'phoneNumber': '781-565-5000',
  'accessLevels': [
    'make-payment'
  ],
  'homeCity': 'New York',
  'favoriteAssets': [
    'AMD',
    'NVDA',
    'AAPL',
    'NFLX',
    'COIN'
  ]
}

const USER_2 = {
  'id': '2021',
  'firstName': 'Matthew',
  'lastName': 'Johnson',
  'email': 'matthew.johnson@contoso.com',
  'phoneNumber': '781-565-5000',
  'accessLevels': [
    'make-payment'
  ],
  'homeCity': 'Seattle',
  'favoriteAssets': [
    'NUAN',
    'MSFT',
    'DIS',
    'TSLA',
    'SQ'
  ]
}

class ExternalFetchHandlers {

  // iGetWeather
  Server_WeatherAPI_CitySearch = () => {
    return 'api/weather-api-city-search'
  }
  Server_WeatherAPI_CurrentConditions = () => {
    return 'api/weather-api-city-conditions'
  }

  // iAssetPrice
  Server_Asset_Price = () => {
    return 'api/finance-api-asset-price'
  }
  Server_Asset_Purchase = () => {
    return 'api/finance-api-asset-purchase'
  }

  // iSendEmail
  Server_Send_Email = () => {
    return 'api/email-api-send'
  }

  // iBookFlight
  Server_Trip_ListOptions = () => {
    return 'api/travel-api-list-options'
  }

  // iBuyPhone
  Server_PhoneWordset_Filter = () => {
    return 'api/store-api-filter-phone-wordset'
  }
  Server_RequestPurchase = () => {
    return 'api/store-api-request-purchase'
  }
  Server_Purchase = () => {
    return 'api/store-api-purchase'
  }

  Channel_Transfer_SMS = () => {
    return 'api/channel-transfer'
  }

}

class ClientFetchHandlers {

  UserAuth = () => {
    return new Promise(resolve => {
      let u = Math.random()*3 > 1 ? USER_1 : USER_2
      resolve({
        'response': {
          'returnCode': '0',
          'returnMessage': 'Authenticated user',
          'USER': u
        }
      })
    })
  }

  Location = () => {
    // Get location from browser
    return new Promise(resolve => {
      if(!navigator.geolocation){
        resolve({
          'response': {
            'returnCode': 'error.browser.unable',
            'returnMessage': 'Unable to retrieve location from client; no access.'
          }
        })
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          resolve({
            'response': {
              'returnCode': '0',
              'returnMessage': 'Returning coordinates from browser',
              'searchLatLng': {
                'latitude': pos.coords.latitude,
                'longitude': pos.coords.longitude
              }
            }
          })
        }, (error) => {
          console.error(error)
          resolve({
            'response': {
              'returnCode': 'error.browser.fail',
              'returnMessage': 'Unable to retrieve location; error.'
            }
          })
        })
      }
    })
  }

}

//
// DLGaaS
//

function DlgTabs({simulateExperience, logEvents, apiEvents, rawResponses, className}){
  const [key, setKey] = useState('raw_payloads')
  return (
    <Tabs fill onSelect={(k) => setKey(k)}
      activeKey={key}
      transition={false}
      id="noanim-tab-example">
      <Tab eventKey="raw_payloads" title={(<div>Client Payloads <small className="badge bg-light text-secondary">{rawResponses.length}</small></div>)}>
        <TabContent className={'bg-light px-2 py-2 overflow-auto h-75 ' + className}>
          { key === 'raw_payloads' ? (
            <ReactJson
              className="mb-2"
              key={'json-' + rawResponses.length}
              src={{
                'latest': {
                  1: rawResponses[0], 
                  2: rawResponses.length > 1 ? rawResponses[1] : null,
                  3: rawResponses.length > 2 ? rawResponses[2] : null
                }, 
                'all': rawResponses
              }}
              displayDataTypes={false}
              iconStyle={'circle'}
              indentWidth={2}
              name={false}
              quotesOnKeys={false}
              groupArraysAfterLength={5}
              collapseStringsAfterLength={50}
              displayObjectSize={true}
              collapsed={9}
              displayArrayKey={false}
              // theme={'grayscale'}
            />
          ) : ('')}
        </TabContent>
      </Tab>
      <Tab className="h-100" eventKey="table_log_events" title={(<div>Log Events Table</div>)} disabled={logEvents.length === 0}>
        <TabContent className={"bg-light px-2 py-2 h-100 " + className}>
          { logEvents.length && key === 'table_log_events' ? (<LogEventsTable events={logEvents} simulateExperience={simulateExperience}/>) : ''}
        </TabContent>
      </Tab>
      <Tab eventKey="viz_log_events" title={(<div>Log Events Viz</div>)} disabled={logEvents.length === 0}>
        <TabContent className={"bg-light px-2 py-2 overflow-auto h-100 " + className}>
          {logEvents.length && key === 'viz_log_events' ? (<LogEventsViz events={logEvents}/>) : ''}
        </TabContent>
      </Tab>
      <Tab eventKey="raw_log_events" title={(<div>Log Events JSON <small className="badge bg-light text-secondary">{logEvents.length}</small></div>)} disabled={logEvents.length === 0}>
        <TabContent className={"bg-light px-2 py-2 overflow-auto h-75 " + className}>
          { key === 'raw_log_events' ? (
            <ReactJson
              className="mb-2"
              key={'nii-json-' + logEvents.length}
              src={logEvents}
              displayDataTypes={false}
              iconStyle={'circle'}
              indentWidth={2}
              name={false}
              quotesOnKeys={false}
              groupArraysAfterLength={5}
              collapseStringsAfterLength={50}
              displayObjectSize={true}
              collapsed={5}
              displayArrayKey={false}
            />
          ) : ('')}
        </TabContent>
      </Tab>
      <Tab eventKey="raw_api_events" title={(<div>API Events JSON <small className="badge bg-light text-secondary">{apiEvents.length}</small></div>)} className="bg-light" disabled={apiEvents.length === 0}>
        <TabContent className={"bg-light px-2 py-2 overflow-auto h-75 " + className}>
          { key === 'raw_api_events' ? (
            <ReactJson
              className="mb-2"
              key={'event-json-' + apiEvents.length}
              src={apiEvents}
              displayDataTypes={false}
              iconStyle={'circle'}
              indentWidth={2}
              name={false}
              quotesOnKeys={false}
              groupArraysAfterLength={5}
              collapseStringsAfterLength={50}
              displayObjectSize={true}
              collapsed={5}
              displayArrayKey={false}
            />
          ) : ('')}
        </TabContent>
      </Tab>
    </Tabs>
  )
}

// Client

export default class DLGaaS extends BaseClass {

  constructor(){
    super()
    this.state = {
      brand: null,
      chatPanelHidden: false,
      error: null,
      clientId: '',
      clientSecret: '',
      modelUrn: 'urn:nuance-mix:tag:model/REPLACE_ME/mix.dialog',
      accessToken: null,
      sessionId: '',
      channel: 'default',
      language: 'en-US',
      sessionTimeout: 900,
      simulateExperience: 'audioAndTextInTextOut',
      ttsVoice: {name: 'Evan', model: 'enhanced'},
      ttsVoices: [],
      rawResponses: [],
      rawEvents: [],
      autoScrollChatPanel: true,
      startData: {
        userData: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          userGlobalID: null,
          userChannelID: null,
          userAuxiliaryID: null,
          systemID: null,
          location: null
        }
      },
      clientData: CLIENT_DATA,
      tokenError: '',
      isSessionActive: false,
      logConsumerGroup: null,
      logConsumerName: null,
      fetchRecordsTimeout: -1,
      fetchingLocation: false,
      recognitionSettings: null,
      processingState: ProcessingState.DISCONNECTED,
      microphone: null,
      asrUtteranceDetection: 'single',
      asrResultType: 'partial',
      asrSampleRateHz: 16000,
      asrNoInputTimeout: 3000,
      asrSpeechDetectionSensitivity: 0.5
    }
    this.logTimer = -1
    this.recoTimeout = -1
    this.onChangeTextInput = this.onChangeTextInput.bind(this)
    this.onChangeSelectInput = this.onChangeSelectInput.bind(this)
    this.clientHandlers = new ClientFetchHandlers()
    this.externalHandlers = new ExternalFetchHandlers()

    this.ttsClz = null
    this._dlgController = null
    
    this._micAudioSource = null

  }

  isStandalone(){
    return false
  }

  includeBrandTheme(brand){
    brand = brand || 'default'
    console.log("Loading brand: ", brand)
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = `/brands/${brand}/styles.css`
    document.head.appendChild(link);
  }

  componentDidMount(){
    const params = this.initStateFromQueryParams([
      'clientId',
      'clientSecret',
      'modelUrn',
      'channel',
      'language',
      'sessionTimeout',
      'simulateExperience',
      'ttsVoice',
      'sessionId',
      'brand'
    ])
    if(Object.keys(params).length){
      this.setState(params)
    }
    window.addEventListener('beforeunload', this.onUnmount, false)
    const viewController = this
    this.initDlgGrpcWeb()
    this.includeBrandTheme(params.brand)
    this.initStartData(() => {
      if(viewController.isStandalone()){
        viewController.initToken()
          .then(() => {
            return viewController._dlgController
              .connect().then(() => {
                console.info("DLG Client Ready.")
                viewController.start()
              })
          })
      }
    })
  }

  initStartData(after){
    const startDataLocalStorage = window.localStorage.getItem('startData')
    const clientDataLocalStorage = window.localStorage.getItem('clientData')
    try{
      let newData = {}

      if(startDataLocalStorage){
        newData.startData = JSON.parse(startDataLocalStorage)
      }
      if(clientDataLocalStorage){
        newData.clientData = JSON.parse(clientDataLocalStorage)
      }
      if(newData.startData || newData.clientData){
        this.setState(newData, after)
      }
  } catch (ex) {
      console.error(ex)
    }
  }

  onUnmount = (e) => {
    try{
      if(this.state.logConsumerName){
        this.destroyConsumer()
      }
      this.stopCapturingLogs()
      if(this._micAudioSource){
        this.stopAudioInput()
      }
      if(this.ttsClz){
        this.ttsClz.onUnmount()
      }
      this.eraseAuthTokenCookie()
      if(this._dlgController){
        this._dlgController.dispose()
      }
    } catch(ex) {
      console.warn(ex)
    }
    return null
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnmount.bind(this), false)
    this.onUnmount()
  }

  async onTokenAcquired(token) {
    // noop
    this.warmupExperienceSimulation()
    this.setAuthTokenCookie(token)
    if(this.isStandalone()){
      return await this.go()
    }
  }

  isGrpcWeb(){
    return true
  }

  isVoiceInputExperience(){
    return SIMULATED_EXPERIENCES(this.state.simulateExperience).voiceInput
  }

  isOrchestratedInteraction(){
    return SIMULATED_EXPERIENCES(this.state.simulateExperience).isOutputVoice
  }

  isVoiceOutputExperience(){
    return SIMULATED_EXPERIENCES(this.state.simulateExperience).playTTS 
  }

  warmupExperienceSimulation(){
    if(this.isVoiceOutputExperience()){
      this.initTts()
    }
    if(this.state.accessToken){
      this._dlgController.connect()
    }
  }

  initTts(){
    if(this.ttsClz){
      console.log("TTS already initialized.")
      return
    }
    this.ttsClz = new TTSaaS(this)
    this.ttsClz.componentDidMount()
    this.ttsClz.state.ssmlInput = true
    this.ttsClz.playQueue = []
    this.ttsClz.state.accessToken = this.state.accessToken
    this.ttsClz.getVoices().then(res => {
      this.setState({
        ttsVoices: res.response.payload.voices
      })
    })
  }

  initAudioInput(){
    if(this._micAudioSource){
      return this._micAudioSource
    }
    this._micAudioSource = new MicrophoneAudioSource({
      targetSampleRate: 16000,
      monitorAudio: false,
      captureAudio: true
    })
    this._micAudioSource.on('microphone:connected', () => {
      this.setState({
        microphone: this._micAudioSource
      })
    })
    return this._micAudioSource
  }

  stopAudioInput(){
    if(this._micAudioSource){
      this._micAudioSource.dispose()
      this._micAudioSource = undefined
    }
    this.setState({
      microphone: null
    })
  }

  storePartialResult(res){
    if(this.state.rawResponses.length < 1){
      return
    }
    let lastResponse = this.state.rawResponses[0]
    if(lastResponse.asr){
      lastResponse.asr = res.raw
    } else {
      this.state.rawResponses.unshift({
        asr: res.raw
      })
    }
  }

  storeFinalResult(res){
    if(this.state.rawResponses.length > 1){
      this.state.rawResponses[0].asr = res.raw
    }
  }

  initMic(){
    if(this._micAudioSource){
      return
    }
    let viewController = this
    return viewController.initAudioInput()
      .init()
      .then(() => {
        // start mic & feed controller
        viewController._dlgController.setAudioSource(viewController._micAudioSource)
        viewController.setState({
          processingState: ProcessingState.IDLE
        })
      })
  }

  initDlgGrpcWeb(){
    if(this._dlgController){
      console.log("DLG Controller already initialized")
      return
    }
    const viewController = this
    this._dlgController = new DlgController(DLG_SERVICE_URL, async function (){
      await viewController.ensureTokenNotExpired()
      return viewController.state.accessToken
    })
    this._dlgController.on('start-session', () => {
      console.log('start-session')
    })
    this._dlgController.on('start-audio', () => {
      console.log('start-audio')
      viewController.setState({
        processingState: ProcessingState.IN_FLIGHT
      })
    })
    this._dlgController.on('result', (data, err) => {
      console.log('result', data)
      viewController.state.rawResponses.unshift(data)
      viewController.setState({
        rawResponses: viewController.state.rawResponses,
      }, () => {
        viewController.parseResponse(data)
      })
    })
    this._dlgController.on('stream-result', (data, err) => {
      // TODO: only handling TEXT at this time - not AUDIO
      console.log('stream-result', data)
      let updateState = false
      let res = new AsrResponse(data)
      switch(res.getType()){
        case AsrResponseType.PARTIAL:
          updateState = true
          viewController.storePartialResult(res)
          break
        case AsrResponseType.FINAL:
          updateState = true
          viewController.storeFinalResult(res)
          viewController._dlgController.stopExecuteStream()
          break
        default:
          break
      }
      if(updateState){
        viewController.setState({
          rawResponses: viewController.state.rawResponses
        })
      }
    })
    this._dlgController.on('finish', (res) => {
      console.log('finish', res)
      viewController.setState({
        processingState: ProcessingState.IDLE
      })
    })
    this._dlgController.on('end', (status) => {
      console.log('end', status)
      viewController.setState({
        processingState: ProcessingState.IDLE
      })
      // if(SIMULATED_EXPERIENCES(viewController.state.simulateExperience).autoListen){
      //   viewController.ttsClz.whenAudioEnds(() => {
      //     viewController.sessionExecuteStream()
      //   })
      // }
    })
    this._dlgController.on('stream-stopped', () => {
      console.log('stream-stopped')
      viewController.setState({
        processingState: ProcessingState.AWAITING_FINAL
      })
    })
    this._dlgController.on('stream-done', (res) => {
      console.log('stream-done', res)
    })
    this._dlgController.on('error', (err) => {
      console.error('DLG Stream error.', err)
      viewController.setState({
        error: err.message,
        processingState: ProcessingState.IDLE
      })
    })
    console.log("DLG initialized.")
    return this._dlgController
  }

  setAuthTokenCookie(token){
    if(!token){
      return
    }
    let expiration = new Date()
    let FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000
    expiration.setTime(expiration.getTime() + FIFTEEN_MINUTES_IN_MS)
    let cookieVal = `auth-token=${token.access_token}; ` + 
                    `expires=${expiration.toUTCString()}; ` +
                    `domain=.nuance.com; ` + 
                    `path=/`
    document.cookie = cookieVal
  }

  eraseAuthTokenCookie(){
    document.cookie = `auth-token=; domain=.nuance.com; Path=/; Max-Age=-99999999;`;
  }

  // DLGaaS API

  async sessionStart(fullPayload) {
    // Second, the Session is Started
    if(this.isGrpcWeb() || this.isVoiceInputExperience()){
      // web-gRPC
      this.setAuthTokenCookie(this.state.accessToken)
      return await this._dlgController.start(
        this.state.modelUrn,
        fullPayload
      )
    } else {
      // Proxy
      await this.ensureTokenNotExpired()
      return await this.request(`${ROOT_URL}/api/dlgaas-session-start`, {
        token: this.state.accessToken,
        modelUrn: this.state.modelUrn,
        rawPayload: fullPayload
      })
    }
  }

  async sessionExecute(payload) {
    // Third, transactions are Executed within the Session
    if(this.isGrpcWeb() || this.isVoiceInputExperience()){
      this.setAuthTokenCookie(this.state.accessToken)
      return await this._dlgController.execute(
        this.state.sessionId,
        payload
      )
    } else {
      await this.ensureTokenNotExpired()
      return await this.request(`${ROOT_URL}/api/dlgaas-session-execute`, {
        token: this.state.accessToken,
        sessionId: this.state.sessionId,
        rawPayload: payload
      })
    }
  }

  async sessionExecuteStream(payload) {
    // Leverage a stream, instead. requires web-gRPC
    if(this.isGrpcWeb()){
      this.setAuthTokenCookie(this.state.accessToken)
      return await this._dlgController.executeStream({
        sessionId: this.state.sessionId,
        asrSettings: {
          utteranceDetection: this.state.asrUtteranceDetection,
          resultType: this.state.asrResultType,
          sampleRateHz: this.state.asrSampleRateHz,
          noInputTimeout: this.state.asrNoInputTimeout,
          speechDetectionSensitivity: this.state.asrSpeechDetectionSensitivity
        },
        clientID: this.state.clientId,
        rawPayload: payload
      })
    }
  }

  async sessionStop() {
    // Lastly, the Session is Stopped
    if(this.isGrpcWeb() || this.isVoiceInputExperience()){
      return await this._dlgController.stop({
        sessionId: this.state.sessionId
      })
    } else {
      await this.ensureTokenNotExpired()
      return await this.request(`${ROOT_URL}/api/dlgaas-session-stop`, {
        token: this.state.accessToken,
        sessionId: this.state.sessionId
      })
    }
  }

  // Data Abstraction

  async clientFetchDaAction(daAction){
    //
    //  1. Client  -> local client handling
    const daId = daAction.id
    let localFunctionStub = this.clientHandlers[daId]
    if(localFunctionStub){
      console.log('Calling CLIENT FUNCTION', daAction, localFunctionStub())
      return localFunctionStub(daAction)
    }
    // Special
    if(daId === 'Client_Location_LatLng'){
      return await this.clientHandlers.Location(daAction)
    }
    //
    //  2. Server  -> local client to function, intended: webhook and DataHost usage
    let externalFunctionStub = this.externalHandlers[daId]
    if(externalFunctionStub){
      console.log('Calling SERVER FUNCTION', daAction, externalFunctionStub())
      return await this.request(
        `${ROOT_URL}/${externalFunctionStub()}`,
        daAction.data,
        true
      )
    }
    return {
      'returnCode': 'error.unhandled', 
      'returnMessage': 'Ensure handlers in dlgaas.js `clientFetchDaAction` resolve.'
    }
  }

  // App

  async start() {
    if(this.state.sessionId && this.state.sessionId.length > 0){
      this.setState({
        isSessionActive: true,
        error: false,
        autoScrollChatPanel: true
      })
    } else {
      // Starts a session
      let fullPayload = {
        selector: {
          language: this.state.language,
          channel: this.state.channel,
          library: 'default',
        },
        payload: {
          data: this.state.startData
        },
        session_timeout_sec: this.state.sessionTimeout,
        client_data: this.state.clientData,
      }
      if(this.state.sessionId){
        fullPayload.session_id = this.state.sessionId
      }
      let res = await this.sessionStart(fullPayload)
                          .catch((err) => {
                            alert(err)
                            console.error(err)
                          })
      // Error
      if(res.error){
        console.warn(res)
        this.setState({
          sessionId: null,
          isSessionActive: false,
          logConsumerName: null,
          error: res.error.response ? res.error.response.data.error : res.error.message
        })
        return false
      }
      // start session timeout
      this.setState({
        sessionId: res.response.payload.sessionId,
        isSessionActive: true,
        error: false,
        autoScrollChatPanel: true
      }, this.execute.bind(this)) // kick things off
    }
    if(!this.isStandalone()){
      // Attach a Log Consumer
      await this.startCapturingLogs()
    }
    return true
  }

  async execute(input, dataAction, dialogEvent, isDTMF) {
    // Executes within a session
    // 5 use cases:
      // 1) user input (text),
      // 2) user input (selectable)
      // 3) data interactions
      // 4) events
      // 5) interpretation (external) - ie DTMF
    let payload = {
      client_data: CLIENT_DATA
    }
    let consideredInput = false
    if(typeof(input) === 'string'){
      if(dataAction){
        payload = {
          requested_data: {
            id: input,
            data: dataAction
          }
        }
      } else {
        payload = {
          user_input: {
            user_text: input
          }
        }
        if(isDTMF){
          payload.user_input.input_mode = 'dtmf'
        }
        consideredInput = true
      }
    } else if(typeof(input) === 'object'){
      if(dialogEvent){
        payload = {
          dialog_event: dialogEvent
        }
      } else if (!isDTMF) {
        payload = {
          user_input: {
            selected_item: input
          }
        }
        consideredInput = true
      } else {
        let iKeys = Object.keys(input)
        let confidences = {}
        let literals = {}
        iKeys.forEach(key => {
          confidences[key] = "1.0"
          literals[key] = input[key]
        })
        payload = {
          user_input: {
            interpretation: {
              confidence: "1.0",
              data: input,
              slot_literals: literals,
              slot_confidences: confidences,
              input_mode: 'dtmf'
            },
          }
        }
        consideredInput = true
      }
    }
    let rawResponses = this.state.rawResponses || []
    rawResponses.unshift({
      request: payload,
    })
    this.setState({
      rawResponses: rawResponses
    })
    if(this.ttsClz){ // TODO: re-evaluate
      this.ttsClz.resetAudio()
    }
    if(consideredInput && this.recoTimeout !== -1){
      clearTimeout(this.recoTimeout)
    }
    let r = await this.sessionExecute(payload)
    rawResponses.unshift(r)
    this.setState({
      rawResponses: rawResponses,
    })
    if(!r.error){
      this.parseResponse(r)
      // Fetch records
      this.doFetchRecords(2000)
    } else {
      console.warn(r.error)
    }
    return false
  }

  async processDataAction(daAction){
    let res = await this.clientFetchDaAction(daAction)
    console.log('client fetch resulted in', res)
    return await this.execute(daAction.id, 
      res.response || {
        'returnCode': 'error.noresponse',
        'returnMessage': JSON.stringify(res.error ? res.error.message : res)
      }
    )
  }

  async processContinueAction(continueAction, latencySettings){
    console.log("TODO: Use `latencySettings`", latencySettings)
    return await this.execute()
  }

  collectNlgMessages(res){
    let msgs = []
    res.messagesList.forEach(msgSegments => {
      msgSegments.nlgList.forEach(msgSeg => {
        msgs.push({
          seg: msgSeg, 
          ttsParams: msgSegments.ttsParameters
        })
      })
    })
    ACTION_TYPES.forEach(action => {
      if(res[action] && res[action].message){
        res[action].message.nlgList.forEach(msgSeg => {
          msgs.push({
            seg: msgSeg, 
            ttsParams: res[action].message.ttsParameters
          })
        })
      }
    })
    return msgs
  }

  async playTtsMessage(playStr, playSettings){
    this.ttsClz.state.accessToken = this.state.accessToken
    this.ttsClz.state.voice = playSettings ? {
      name: playSettings.voice.name || this.state.ttsVoice.name, 
      model: playSettings.voice.model || this.state.ttsVoice.model
    } : this.state.ttsVoice
    this.ttsClz.state.textInput = playStr
    let req = await this.ttsClz.executeTextInput({
      'x-nuance-dialog-session-id': this.state.sessionId
    })
    this.state.rawResponses.unshift({'tts-request': req.payload})
    this.state.rawResponses.unshift({'tts-response': req.res})
    this.setState({
      rawResponses: this.state.rawResponses
    })
  }

  bindCollectionTimeouts(timeouts){
    if(!timeouts){
      return
    }
    if(!this.state.isSessionActive){
      return
    }
    if(!SIMULATED_EXPERIENCES(this.state.simulateExperience).bindTimeouts){
      return
    }
    let mainTimeout = timeouts.timeout
    // let completeTimeout = timeouts.completeTimeout
    // let incompleteTimeout = timeouts.incompleteTimeout
    // let maxSpeechInput = timeouts.maxSpeechTimeout
    if(this.recoTimeout !== -1){
      console.log("Clearing last collection timeout.")
      clearTimeout(this.recoTimeout)
    }
    let t = parseInt(mainTimeout.substring(0, mainTimeout.length-2))
    console.log("Queuing collection timeout.", t)
    this.recoTimeout = setTimeout(() => {
      Promise.resolve().then(() => {
        this.execute(null, false, {
            type: 'NO_INPUT',
            message: `Standard reco timeout kicked in after ${mainTimeout}.`,
        })
      })
    }, t) // chop the `ms`
  }

  parseResponse(res){
    try{
      let dataAction
      let collectionSettings
      let recognitionSettings
      let latencySettings
      const qaAction = res.response.payload?.qaAction
      const daAction = res.response.payload?.daAction
      const escalationAction = res.response.payload?.escalationAction
      const endAction = res.response.payload?.endAction
      const continueAction = res.response.payload?.continueAction
      if(daAction){
        dataAction = daAction
      } else if (escalationAction){
        dataAction = escalationAction
      } else if (endAction){
        this.stop(true)
      } else if (qaAction){
        recognitionSettings = qaAction.recognitionSettings
        collectionSettings = recognitionSettings.collectionSettings
      } else if (continueAction){
        latencySettings = continueAction.backendConnectionSettings
      }

      let exp = SIMULATED_EXPERIENCES(this.state.simulateExperience)
      if(exp.playTTS){
        let nlgMessageSegments = this.collectNlgMessages(res.response.payload)
        let promiseChain = Promise.resolve()
        nlgMessageSegments.forEach(msgSeg => {
          promiseChain = promiseChain.then(() => {
            return this.playTtsMessage(msgSeg.seg.text, 
              msgSeg.ttsParams)
          })
        })
        promiseChain = promiseChain.then(() => {
          this.ttsClz.whenAudioEnds(() => {
            if(exp.bindTimeouts){
              this.bindCollectionTimeouts(collectionSettings)
            }
          })
        })
      } else {
        // TODO: more precise
        if(collectionSettings){
          this.bindCollectionTimeouts(collectionSettings)
        }
      }
      if(dataAction){
        setTimeout(() => {
          this.processDataAction(dataAction)
        }, 0)
      }
      if(continueAction){
        setTimeout(() => {
          this.processContinueAction(continueAction, latencySettings)
        })
      }
      if(recognitionSettings){
        this.setState({
          recognitionSettings: recognitionSettings
        })
      }
    } catch (ex) {
      console.error('bad response parsing', ex)
    }
  }

  async stop(ended) {
    // Stop the session
    if(this.recoTimeout !== -1){
      clearTimeout(this.recoTimeout)
    }
    if(!ended && this.ttsClz){
      this.ttsClz.resetAudio()
    }
    if(!ended){
      await this.sessionStop()
    }
    if(this._micAudioSource){
      this.stopAudioInput()
    }
    this.setState({
      isSessionActive: false,
      autoScrollChatPanel: false,
      recognitionSettings: null,
      microphone: null
    })
    // this.stopCapturingLogs() // Enable this to reduce requests
    return false
  }

  async restart() {
    // Restart the client.
    this.setState({
      rawResponses: [],
      rawEvents: [],
      sessionId: '',
    })
    if(this.state.logConsumerName){
      await this.destroyConsumer()
    }
    if(this.ttsClz){
      this.ttsClz.resetAudio()
    }
    if(this._micAudioSource){
      this.stopAudioInput()
    }
    this.stopCapturingLogs()
    return false
  }

  stopCapturingLogs(){
    if(this.logTimer !== -1){
      window.clearInterval(this.logTimer)
      this.logTimer = -1
      this.setState({
        logConsumerName: null
      })
    }
  }

  onEditData(dataType, type, item){
    switch(type){
      case 'edit':
      case 'add':
      case 'delete':
        if(dataType === 'start'){
          this.setState({
            startData: item.updated_src
          }, this.saveStartDataToLocalStorage)
        } else if (dataType === 'client'){
          this.setState({
            clientData: item.updated_src
          }, this.saveClientDataToLocalStorage)
        }
        break
      default:
        break
    }
  }

  saveStartDataToLocalStorage(){
    window.localStorage.setItem('startData', JSON.stringify(this.state.startData))
  }

  saveClientDataToLocalStorage(){
    window.localStorage.setItem('clientData', JSON.stringify(this.state.clientData))
  }

  getApiEvents(){
    return this.state.rawEvents.filter(e => e.value.source !== 'NIIEventLogger')
  }

  getLogEvents(){
    const ret = this.state.rawEvents.filter(e => e.value.source === 'NIIEventLogger')
    return ret.sort((a, b) => {
      const _a = parseInt(a.value.data.seqid, 10)
      const _b = parseInt(b.value.data.seqid, 10)
      if(_a < _b){
        return -1
      } else if(_a > _b){
        return 1
      } else {
        return 0
      }
    })
  }

  async go(){
    if(this.isVoiceInputExperience()){
      await this.initMic()
    }
    return await this.start()
  }

  getAuthHtml(){
    return (
      <AuthForm tokenError={this.state.tokenError}
          initToken={this.initToken.bind(this)}
          clientId={this.state.clientId}
          clientSecret={this.state.clientSecret}
          onChangeTextInput={this.onChangeTextInput.bind(this)}
          serviceScope={this.getScope()} />
    )
  }

  addLocationToStartData(){
    let startData = this.state.startData
    this.setState({
      fetchingLocation: true
    })
    navigator.geolocation.getCurrentPosition((pos) => {
      if(!startData.userData){
        startData.userData = {location: {}}
      }
      startData.userData.location = {
        latitude: String(pos.coords.latitude),
        longitude: String(pos.coords.longitude)
      }
      let fetchingLocation = false
      this.setState({
        startData,
        fetchingLocation
      }, this.saveStartDataToLocalStorage)
    }, (error) => {
      console.error(error)
      alert('Unable to get location from browser...')
      this.setState({
        fetchingLocation: false
      })
    })
  }

  getScope(){
    return 'dlg asr tts log'
  }

  getVoiceOptionsHTML(){
    let ret = []
    if(this.state.ttsVoices){
      this.state.ttsVoices.forEach(voice => {
        if(voice.language.startsWith(this.state.language.substring(0,2)) 
            && voice.sampleRateHz === 22050
            && !voice.restricted){
          ret.push(<option key={'opt-'+voice.name+'-'+voice.model} value={voice.name} data-model={voice.model}>{voice.name} ({voice.language})</option>)
        }
      })
    }
    return ret
  }

  onToggleMinMax(minimized){
    this.setState({
      chatPanelHidden: minimized
    })
  }
  
  startRecognizing(){
    if(!this._micAudioSource){
      console.warn("No microphone.")
      return
    }
    if(this.ttsClz){
      this.ttsClz.resetAudio()
    }
    this._micAudioSource.init().then(() => {
      this.sessionExecuteStream()
    })
  }

  stopRecognizing(){
    if(this._dlgController){
      this._dlgController.stopExecuteStream()
    }
  }

  onToggleMicrophone(){
    switch(this.state.processingState){
      case ProcessingState.DISCONNECTED:
      case ProcessingState.IDLE:
        this.startRecognizing()
        break
      default:
        this.stopRecognizing()
        break
    }
  }

  onLaunchedStandalone(url){
    if(this.state.recoTimeout !== -1){
      clearTimeout(this.state.recoTimeout)
    }
    this.setState({
      isSessionActive: false
    })
  }

  getConfigureSessionHtml(){
    let sessionIdExists = Boolean(this.state.sessionId ? this.state.sessionId.length : false)
    return (
      <div className="h-100">
        <div className="col-12 h-100 overflow-auto">
          {/*<span className="badge bg-dark text-white mb-3">Token Expiry {moment(this.state.accessToken.expires_at*1000).fromNow()}</span>*/}
          {this.state.error ? (<div className="badge bg-warning text-dark text-left text-wrap mb-3 w-100"><strong>Oops....</strong>{`   `}{this.state.error}</div>) : '' }
          <div className="row">
            <div className={(this.isStandalone() ? `col-12` : `col-8 offset-md-2`) + ` bg-light rounded-0 px-4 py-1 pt-4`}>
              <h3 className="fw-bold text-center w-100 mb-4 mt-3">Start a Bot Session</h3>
              <div className="form-floating">
                <Form.Control 
                  name="simulateExperience"
                  as="select" 
                  className="form-select"
                  value={this.state.simulateExperience} 
                  onChange={this.onChangeSelectInput.bind(this)}>
                  <optgroup label="Visual VA">
                    <option value={'audioAndTextInTextOut'}>Visual VA: Voice &amp; Text Input with HTML Output</option>
                    <option value={'visualVA'}>Visual VA: Text Input with HTML Output</option>
                    <option value={'visualVAwithTts'}>Visual VA: Text Input with HTML &amp; Voice Output</option>
                  </optgroup>
                  <optgroup label="IVR">
                    <option value={'ivrAudioInOut'}>IVR: Voice &amp; DTMF Input with Voice Output</option>
                    <option value={'ivrAudioInTextOut'}>IVR: Voice &amp; DTMF Input with SSML Output</option>
                    <option value={'ivrTextWithSSML'}>IVR: Text &amp; DTMF Input with SSML Output</option>
                    <option value={'ivrTextWithTts'}>IVR: Text &amp; DTMF Input with Voice Output</option>
                  </optgroup>
                  <optgroup label="IoT">
                    <option value={'smartSpeaker'}>SmartSpeaker: Voice Input with Voice Output</option>
                    <option value={'smartSpeakerWithScreen'}>SmartSpeaker: Voice &amp; Text Input with Voice &amp; HTML Output</option>
                  </optgroup>
                </Form.Control>
                <Form.Label>Simulate Experience</Form.Label>
              </div>
            </div>

            <div className={(this.isStandalone() ? `col-12` : `col-3 offset-md-2`) + ` bg-light rounded-3 px-4 py-4`}>

              <form className="form" onSubmit={(evt) => {this.go(); evt.preventDefault();}}>
                <h4 className="w-100">Configuration</h4>
                <p>
                  See <a target="_blank" rel="noreferrer" href="https://docs.mix.nuance.com/languages/?src=demo#languages-and-voices">Languages and Voices</a>
                </p>
                <div className="form-floating">
                  <input type="text" className="form-control" name="modelUrn" value={this.state.modelUrn} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="modelUrn" className="form-label">App Model URN</label>
                </div>
                <div className="form-floating">
                  <input disabled={sessionIdExists} type="text" className="form-control" name="channel" value={this.state.channel} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="channel" className="form-label">Channel</label>
                </div>
                <div className="form-floating">
                  <input disabled={sessionIdExists} type="text" className="form-control" name="language" value={this.state.language} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="language" className="form-label">Language</label>
                </div>
                {SIMULATED_EXPERIENCES(this.state.simulateExperience).playTTS ? (
                  <div className="form-floating">
                    <Form.Control 
                      name="ttsVoice"
                      as="select" 
                      className="form-select"
                      value={this.state.ttsVoice.name} 
                      onChange={this.onChangeSelectInput.bind(this)}>
                      {this.getVoiceOptionsHTML()}
                    </Form.Control>
                    <Form.Label>Fallback TTS Voice (default)</Form.Label>
                  </div>
                  ) : ''}
                <div className="form-floating">
                  <input type="number" className="form-control" name="sessionTimeout" value={this.state.sessionTimeout} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="sessionTimeout" className="form-label">Session Timeout (s)</label>
                </div>
                <br/>
                <div className="form-floating">
                  <input type="text" className="form-control" name="sessionId" value={this.state.sessionId} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="sessionId" className="form-label">Existing Session ID <span className='text-muted'>(optional)</span></label>
                </div>
                <div className="form-group mt-3">
                  <button className="btn btn-primary d-flex justify-content-center w-100 text-center" type="submit">
                    {sessionIdExists ? 'Resume Session' : 'Start New Session'}
                  </button>
                </div>
              </form>
            </div>
            <div className={(this.isStandalone() ? `col-12` : `col-5`) + ` bg-light rounded-3 px-4 py-4`}>
                <div className="form-floating mb-4 mt-3">
                  <h5 className="pt-5">
                    Client Data
                  </h5>
                  <ReactJson
                    key={'json-clientData'}
                    src={this.state.clientData}
                    displayDataTypes={true}
                    displayObjectSize={true}
                    collapsed={false}
                    name={`clientData`}
                    theme={`grayscale:inverted`}
                    sortKeys={true}
                    onEdit={(edit) => { this.onEditData('client', 'edit', edit); }}
                    onAdd={(add) => { this.onEditData('client', 'add', add); }}
                    onDelete={(del) => { this.onEditData('client', 'delete', del); }}>
                  </ReactJson>
                </div>
                <div className="form-floating">
                  <h5 className="mb-2">
                    Start Data
                  </h5>
                  { navigator.geolocation ? (
                      <div className="d-flex w-100 pb-3">
                        <button disabled={this.state.fetchingLocation} className="btn btn-outline-primary btn-sm" onClick={this.addLocationToStartData.bind(this)}>
                          { this.state.fetchingLocation ? 'Getting location...' : 'Add Client Location' }
                        </button>
                      </div>
                    ) : ('') }
                  <ReactJson
                    key={'json-startData'}
                    src={this.state.startData}
                    displayDataTypes={true}
                    displayObjectSize={true}
                    collapsed={false}
                    name={`startData`}
                    theme={`grayscale:inverted`}
                    sortKeys={true}
                    onEdit={(edit) => { this.onEditData('start', 'edit', edit); }}
                    onAdd={(add) => { this.onEditData('start', 'add', add); }}
                    onDelete={(del) => { this.onEditData('start', 'delete', del); }}>
                  </ReactJson>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getChatResponses(){
    return this.state.rawResponses.filter(res => {
      let keys = Object.keys(res)
      return keys.indexOf('tts-request') === -1 &&
             keys.indexOf('tts-response') === -1
    })
  }

  getBotSessionHtml(){
    const logEvents = this.getLogEvents()
    const apiEvents = this.getApiEvents()
    const chatResponses = this.getChatResponses()
    return (
      <div className="col px-5 h-100">
        <div className="row">
          <div className="col-8">
            <div className="float-end mt-3">
              <span className="badge bg-light text-dark mb-3">Token Expiry {moment(this.state.accessToken.expires_at*1000).fromNow()}</span>
              {` `}
              <span className="badge bg-light text-dark mb-3">Session ID: <strong id="dlgaas-session-id">{this.state.sessionId}</strong></span>
              {` `}
            </div>
            <h3 className="fw-bold mt-3">Converse and Troubleshoot</h3>
          </div>
          <div className="col-4 text-end">
            { this.state.isSessionActive && this.state.sessionId.length > 0 ? (
                <button className="btn btn-danger float-end mt-3" onClick={(evt) => {this.stop(); evt.preventDefault(); }}>Stop Session</button>
              ) : (
                <button className="btn btn-warning float-end mt-3" onClick={(evt) => {this.restart(); evt.preventDefault(); }}>New Session</button>
              )
            }
            {` `}
            { this.state.logConsumerName ? (
                <Button className="text-dark mt-3"
                  variant={`light`}
                  onClick={(evt) => {this.doFetchRecords(0); evt.preventDefault(); }}
                  disabled={this.state.fetchRecordsTimeout !== -1}>
                  {this.state.fetchRecordsTimeout !== -1 ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : ''}
                  {` `}
                  Fetch Log Events
                </Button>
              ) : ('')}
            { this.state.logConsumerName && !this.state.isSessionActive ? (
              <button className="btn btn-danger float-end mt-3" onClick={(evt) => {this.stopCapturingLogs(); evt.preventDefault(); }}>Stop Auto Log Fetcher</button>
            ) : ('')}
          </div>
        </div>
        <div className="row h-100 mt-1">
          <div className={`col-12 h-100`}>
            <DlgTabs
              simulateExperience={this.state.simulateExperience}
              logEvents={logEvents}
              apiEvents={apiEvents}
              rawResponses={this.state.rawResponses}
              className={this.state.isSessionActive && !this.state.chatPanelHidden ?'blurred':''}
            />
          </div>
          <div className={`col-3 float-end`}>
            <ChatPanel
              simulateExperience={this.state.simulateExperience}
              onLaunchedStandalone={this.onLaunchedStandalone.bind(this)}
              onExecute={this.execute.bind(this)}
              rawResponses={chatResponses}
              autoScrollChatPanel={this.state.autoScrollChatPanel}
              width={365}
              height={window.innerHeight-150}
              sessionTimeout={this.state.sessionTimeout}
              sessionId={this.state.sessionId}
              active={this.state.isSessionActive}
              onSessionTimeoutEnded={this.stop.bind(this)}
              recognitionSettings={this.state.recognitionSettings}
              onToggleMicrophone={this.onToggleMicrophone.bind(this)}
              microphone={this.state.microphone}
              isListening={ProcessingState.IN_FLIGHT===this.state.processingState}
              isProcessingInput={ProcessingState.AWAITING_FINAL===this.state.processingState}
              onToggleMinMax={this.onToggleMinMax.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }

  render(){
    let body = this.state.accessToken ? (
        this.state.sessionId && (this.state.isSessionActive || this.state.rawResponses.length) ?
        this.getBotSessionHtml() :
        this.getConfigureSessionHtml()) :
        this.getAuthHtml()
    let html = (<Tabs fill variant="pills"
      defaultActiveKey="dlgaas" transition={false}
      id="noanim-tab-example"
      className="justify-content-center"
      onSelect={this.handleTabSelection.bind(this)}>
      <Tab eventKey="profile" title={`Profile`}></Tab>
      <Tab eventKey="dlgaas" title={`DLGaaS`} className="h-100">
        {body}
      </Tab>
      <Tab eventKey="asraas" title={`ASRaaS`}></Tab>
      <Tab eventKey="nluaas" title={`NLUaaS`}></Tab>
      <Tab eventKey="ttsaas" title={`TTSaaS`}></Tab>
    </Tabs>)
    if(this.isStandalone()){
      html = body
    }
    return (
      <div className="dlgaas row h-100">
        {html}
      </div>
    )
  }
}
