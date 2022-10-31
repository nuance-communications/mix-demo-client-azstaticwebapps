/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React from "react"
import { navigate } from "gatsby"
import axios from "axios"

export const VERSION = '2.0.0'
export const ROOT_URL = process.env.NODE_ENV === 'production' ? '' : 'https://localhost:7071'
export const ASR_SERVICE_URL = process.env.ASR_SERVICE_URL || "https://asr.api.nuance.com"
export const DLG_SERVICE_URL = process.env.DLG_SERVICE_URL || "https://dlg.api.nuance.com"
export const CLIENT_DATA = {
    "version": VERSION,
    "client": "Mix.demo",
}
export const LOG_TIMER_DURATION = 8 * 1000 // log get records will trigger at this interval
export const URN_REGEX_DIALOG = /urn:nuance-mix:tag:model\/(?<tag>[^/].*)\/mix.dialog/
export const URN_REGEX_NLU = /urn:nuance-mix:tag:model\/(?<tag>[^/].*)\/mix.nlu\?=language=(?<language>.*)/
export const CLIENT_ID_REGEX = "appID:([^ $^%:]*)(:geo:)*([^ $^%:]*)?(:clientName:)*([^ $]*)?"
export const LANG_EMOJIS = {
    "en-us": "🇺🇸",
    "ja-jp": "🇯🇵",
    "de-de": "🇩🇪",
    "en-gb": "🇬🇧",
    "fr-fr": "🇫🇷",
    "it-it": "🇮🇹",
    "fr-ca": "🇨🇦(fr)",
    "fr-be": "🇧🇪(fr)",
    "es-es": "🇪🇸(es)",
    "eu-es": "🇪🇺(es)",
    "es-us": "🇲🇽(es)",
    "es-mx": "🇲🇽(es)",
    "nl-nl": "🇳🇱",
    "nl-be": "🇳🇱(be)",
    "en-au": "🇦🇺",
    "en-es": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "en-sc": "🏴󠁧󠁢󠁳󠁣󠁴󠁿(en)",
    "en-ie": "🇮🇪",
    "id-id": "🇮🇩",
    "hu-hu": "🇭🇺",
    "en-za": "🇿🇦",
    "el-gr": "🇬🇷",
    "he-il": "🇮🇱",
    "pl-pl": "🇵🇱",
    "pt-br": "🇧🇷",
    "sk-sk": "🇸🇰",
    "ro-ro": "🇷🇴",
    "ms-ms": "🇲🇾",
    "bg-bg": "🇧🇬",
    "hi-in": "🇮🇳",
    "bh-in": "🇮🇳(bh)",
    "bn-in": "🇮🇳(bn)",
    "mr-in": "🇮🇳(mr)",
    "ta-in": "🇮🇳(ta)",
    "te-in": "🇮🇳(te)",
    "kn-in": "🇮🇳(kn)",
    "th-th": "🇹🇭",
    "hr-hr": "🇭🇷",
    "cs-cz": "🇨🇿",
    "es-ar": "🇦🇷",
    "ar-ww": "ar_WW",
    "ru-ru": "🇷🇺",
    "ca-es": "ca_ES",
    "va-es": "va_ES",
    "en-in": "🇮🇳(en)",
    "pt-pt": "🇵🇹",
    "da-dk": "🇩🇰",
    "fi-fi": "🇫🇮",
    "in-id": "🇮🇩",
    "es-cl": "🇨🇱",
    "es-co": "🇨🇴",
    "ko-kr": "🇰🇷",
    "uk-ua": "🇺🇦",
    "ms-my": "🇲🇾",
    "sv-se": "🇸🇪",
    "vi-vn": "🇻🇳",
    "cn-hk": "🇭🇰",
    "yue-hk": "🇭🇰",
    "no-no": "🇳🇴",
    "nb-no": "🇳🇴(nb)",
    "tr-tr": "🇹🇷",
    "cmn-cn": "🇨🇳",
    "zh-cn": "🇨🇳",
    "cmn-tw": "🇹🇼",
    "zh-tw": "🇹🇼"
};
export const LANGUAGES = [
 {
  "code": "ara-XWW", 
  "name": "Arabic (Worldwide)"
 }, 
 {
  "code": "cat-ESP", 
  "name": "Catalan (Spain)"
 }, 
 {
  "code": "hrv-HRV", 
  "name": "Croatian (Croatia)"
 }, 
 {
  "code": "ces-CZE", 
  "name": "Czech (Czech Republic)"
 }, 
 {
  "code": "dan-DNK", 
  "name": "Danish (Denmark)"
 }, 
 {
  "code": "nld-NLD", 
  "name": "Dutch (Netherlands)"
 }, 
 {
  "code": "eng-AUS", 
  "name": "English (Australia)"
 }, 
 {
  "code": "eng-USA", 
  "name": "English (United States)"
 }, 
 {
  "code": "eng-IND", 
  "name": "English (India)"
 }, 
 {
  "code": "eng-GBR", 
  "name": "English (United Kingdom)"
 }, 
 {
  "code": "fin-FIN", 
  "name": "Finnish (Finland)"
 }, 
 {
  "code": "fra-CAN", 
  "name": "French (Canada)"
 }, 
 {
  "code": "fra-FRA", 
  "name": "French (France)"
 }, 
 {
  "code": "deu-DEU", 
  "name": "German (Germany)"
 }, 
 {
  "code": "ell-GRC", 
  "name": "Greek (Greece)"
 }, 
 {
  "code": "heb-ISR", 
  "name": "Hebrew (Israel)"
 }, 
 {
  "code": "hin-IND", 
  "name": "Hindi (India)"
 }, 
 {
  "code": "hun-HUN", 
  "name": "Hungarian (Hungary)"
 }, 
 {
  "code": "ind-IDN", 
  "name": "Indonesian (Indonesia)"
 }, 
 {
  "code": "ita-ITA", 
  "name": "Italian (Italy)"
 }, 
 {
  "code": "jpn-JPN", 
  "name": "Japanese (Japan)"
 }, 
 {
  "code": "kor-KOR", 
  "name": "Korean (South Korea)"
 }, 
 {
  "code": "zlm-MYS", 
  "name": "Malay (Malaysia)"
 }, 
 {
  "code": "nor-NOR", 
  "name": "Norwegian (Norway)"
 }, 
 {
  "code": "pol-POL", 
  "name": "Polish (Poland)"
 }, 
 {
  "code": "por-BRA", 
  "name": "Portuguese (Brazil)"
 }, 
 {
  "code": "por-PRT", 
  "name": "Portuguese (Portugal)"
 }, 
 {
  "code": "ron-ROU", 
  "name": "Romanian (Romania)"
 }, 
 {
  "code": "rus-RUS", 
  "name": "Russian (Russia)"
 }, 
 {
  "code": "cmn-CHN", 
  "name": "Mandarin (China)"
 }, 
 {
  "code": "slk-SVK", 
  "name": "Slovak (Slovakia)"
 }, 
 {
  "code": "spa-ESP", 
  "name": "Spanish (Spain)"
 }, 
 {
  "code": "spa-XLA", 
  "name": "Spanish (Latin America)"
 }, 
 {
  "code": "swe-SWE", 
  "name": "Swedish (Sweden)"
 }, 
 {
  "code": "tha-THA", 
  "name": "Thai (Thailand)\u00a0BETA"
 }, 
 {
  "code": "yue-CHS", 
  "name": "Cantonese (Hong Kong)"
 }, 
 {
  "code": "cmn-TWN", 
  "name": "Mandarin (Taiwan)"
 }, 
 {
  "code": "tur-TUR", 
  "name": "Turkish (Turkey)"
 }, 
 {
  "code": "ukr-UKR", 
  "name": "Ukrainian (Ukraine)"
 }, 
 {
  "code": "vie-VNM", 
  "name": "Vietnamese (Vietnam)"
 }
]

const EXPERIENCE_TYPES = {
  ivrTextWithTts: {
    playTTS: true,
    isOutputHTML: false,
    isOutputSSML: true,
    bindTimeouts: true,
    dtmfInput: true
  },
  ivrTextWithSSML: {
    playTTS: false,
    isOutputHTML: false,
    isOutputSSML: true,
    bindTimeouts: true,
    dtmfInput: true
  },
  ivrAudioInOut: {
    playTTS: true,
    isOutputHTML: false,
    isOutputSSML: true,
    bindTimeouts: true,
    dtmfInput: true,
    voiceInput: true
  },
  ivrAudioInTextOut: {
    playTTS: false,
    isOutputHTML: false,
    isOutputSSML: true,
    bindTimeouts: true,
    dtmfInput: true,
    voiceInput: true
  },
  audioAndTextInTextOut: {
    playTTS: false,
    isOutputHTML: true,
    isOutputSSML: false,
    bindTimeouts: false,
    dtmfInput: false,
    voiceInput: true
  },
  visualVA: {
    playTTS: false,
    isOutputHTML: true,
    isOutputSSML: false,
    bindTimeouts: false,
    dtmfInput: false
  },
  visualVAwithTts: {
    playTTS: true,
    isOutputHTML: true,
    isOutputSSML: true,
    bindTimeouts: false,
    dtmfInput: false
  },
  smartSpeaker: {
    voiceInput: true,
    playTTS: true, // represents SEPARATE orchestration
    isOutputHTML: false,
    isOutputSSML: true,
    isOutputVoice: true,
    bindTimeouts: false,
    dtmfInput: false
  },
  smartSpeakerWithScreen: {
    voiceInput: true,
    playTTS: true, // represents SEPARATE orchestration
    isOutputHTML: true,
    isOutputSSML: true,
    isOutputVoice: true,
    bindTimeouts: false,
    dtmfInput: false,
    autoListen: true
  }
}

export const SIMULATED_EXPERIENCES = (experienceType) => {
  return EXPERIENCE_TYPES[experienceType]
}

export const STUB_SELECTABLE_IMAGES = {
  // 'entity':{
  //   'value': 'https://url.png', 
  // },
}

function getLanguageCode(language){
  switch(language){
    case 'ar-WW': return 'ara-XWW'
    case 'ca-ES': return 'cat-ESP'
    case 'da-DK': return 'dan-DNK'
    case 'nl-NL': return 'nld-NLD'
    case 'en-AU': return 'eng-AUS'
    case 'en-US': return 'eng-USA'
    case 'en-IN': return 'eng-IND'
    case 'en-GB': return 'eng-GBR'
    case 'fi-FI': return 'fin-FIN'
    case 'fr-CA': return 'fra-CAN'
    case 'fr-FR': return 'fra-FRA'
    case 'de-DE': return 'deu-DEU'
    case 'hi-IN': return 'hin-IND'
    case 'hu-HU': return 'hun-HUN'
    case 'id-ID': return 'ind-IDN'
    case 'it-IT': return 'ita-ITA'
    case 'ja-JP': return 'jpn-JPN'
    case 'ko-KR': return 'kor-KOR'
    case 'ms-MY': return 'zlm-MYS'
    case 'no-NO': return 'nor-NOR'
    case 'pt-BR': return 'por-BRA'
    case 'pt-PT': return 'por-PRT'
    case 'ru-RU': return 'rus-RUS'
    case 'zh-CN': return 'zho-CHN'
    case 'es-ES': return 'spa-ESP'
    case 'es-US': return 'spa-XLA'
    case 'sv-SE': return 'swe-SWE'
    case 'cn-HK': return 'yue-CHN'
    case 'zh-TW': return 'zho-TWN'
    case 'tr-TR': return 'tur-TUR'
    case 'vi-VN': return 'vie-VNM'
    default:
      return 'eng-USA'
  }
}

export class BaseClass extends React.Component {

  initStateFromQueryParams(params){
    let toUpdate = {}
    if(typeof window !== `undefined`){
      const urlParams = new URLSearchParams(window.location.search)
      params.forEach((q) => {
        const v = urlParams.get(q)
        if(v){
          toUpdate[q] = decodeURIComponent(v)
        }
      });
    }
    let title = 'Nuance Mix Demo Client'
    if(toUpdate.clientId){
      title += ` - AppID: ${this.getAppIDFromClientID(toUpdate['clientId'])}`
    }
    if(toUpdate.modelUrn){
      title += ` - Tag: ${this.parseContextTag(toUpdate.modelUrn, URN_REGEX_DIALOG)}`
    }
    if(toUpdate.language){
      title += ` - Language: ${toUpdate.language}`
    }
    if(toUpdate.channel){
      title += ` - Channel: ${toUpdate.channel}`
    }
    if(toUpdate.simulateExperience){
      title += ` - Simulate: ${toUpdate.simulateExperience}`
    }
    document.title = title
    return { 
      ...toUpdate, 
      ...this.initStateFromSessionStorage(params) 
    }
  }

  initStateFromSessionStorage(params){
    const toUpdate = {}
    if(typeof window !== `undefined`){
      params.forEach(q => {
        let v = window.sessionStorage.getItem(q)
        if(v){
          try{
            toUpdate[q] = JSON.parse(v)
          } catch(ex) {
            toUpdate[q] = v
          }
        }
      })
    }
    return toUpdate
  }

  saveToSessionStorage(data){
    if(typeof window !== `undefined`){
      Object.keys(data).forEach(key => {
        let item = data[key]
        window.sessionStorage.setItem(key, item)
      })
      return true
    }
    return false
  }

  getAppIDFromClientID(clientID){
    const clientIDRegex = new RegExp(CLIENT_ID_REGEX)
    const parsed = clientIDRegex.exec(clientID)
    return parsed.length > 0 ? parsed[1] : clientID
  }

  // Request

  async request(url, data, flat){
    let result
    try {
      const payload = flat ? data : {
        data: data,
        headers: {
          'User-Agent': `mix-demo-client/${VERSION}`
        }
      }
      const response = await axios.post(url, payload)
      if(!response){
        throw Error('Bad request ' + url)
      }
      result = { response: response.data, error: null }
    } catch (error) {
      console.log('Request error', url, error);
      result = { response: null, error }
    }
    return result
  }

  // OAuth Token

  getScope(){
    return 'asr nlu tts dlg log'
  }

  async getToken(scope) {
    // First, the user must acquire a token.
    return await this.request(`${ROOT_URL}/api/oauth2-get-token`, {
      clientId: encodeURIComponent(this.state.clientId), 
      clientSecret: this.state.clientSecret,
      scope: scope || this.getScope()
    })
  }

  async ensureTokenNotExpired(){
    const accessToken = this.state.accessToken
    const one_minute = 60 * 1000
    if(!accessToken || 
      ((accessToken.expires_at * 1000) - Date.now() < one_minute)){
      return await this.initToken(this.getScope())
    }
    return false
  }

  async initToken(scope){
    // Grabs the token
    let res = await this.getToken(scope)
    if(res.error){
      this.setState({
        tokenError: res.error.response ? res.error.response.data.error : JSON.stringify(res.error),
      })
      return false
    }
    this.setState({
      accessToken: res.response.token,
      tokenError: null,
    }, async () => {
      await this.onTokenAcquired(res.response.token)
    })
    return !!res
  }

  async onTokenAcquired() {
    // Do something
  }

  // Log API

  async createConsumer(){
    if(this.state.logConsumerName){
      console.log("Log consumer already exists, while attempting to create.")
      return null
    }
    // First, create a consumer for getting the LOG data
    await this.ensureTokenNotExpired()
    const ret = await this.request(`${ROOT_URL}/api/logapi-create-consumer`, {
      clientId: encodeURIComponent(this.state.clientId),
      token: this.state.accessToken,
    })
    if(ret && ret.response){
      console.log("New log API consumer created")
      this.setState({
        logConsumerName: ret.response.consumerName,
        logConsumerGroup: ret.response.consumerGroup,
      })
    }
    return ret
  }

  async getRecords(sessionId){
    // Then, consumer records periodically
    await this.ensureTokenNotExpired()
    return await this.request(`${ROOT_URL}/api/logapi-get-records`, {
      sessionId: sessionId,
      token: this.state.accessToken,
      consumerName: this.state.logConsumerName,
      consumerGroup: this.state.logConsumerGroup,
    })
  }

  async destroyConsumer(){
    if(this.state.logConsumerName){
      console.log("No log consumer to delete.")
      return null
    }
    // Lastly, destroy the Consumer attached
    await this.ensureTokenNotExpired()
    const ret = await this.request(`${ROOT_URL}/api/logapi-destroy-consumer`, {
      token: this.state.accessToken,
      consumerName: this.state.logConsumerName,
      consumerGroup: this.state.logConsumerGroup,
    })
    console.log("Consumer destroyed", ret)
    this.setState({
      logConsumerName: null,
      logConsumerGroup: null,
    })
    return ret
  }

  async startCapturingLogs(){
    if(!this.state.logConsumerName){
      await this.createConsumer()
    }
    // purposefully scheduled on interval; 
    // fetch records will noop if request is inflight
    console.log("New log API request queued")
    this.logTimer = window.setInterval(() => {
      Promise.resolve().then(() => {
        console.log("get log events")
        const logEvents = this.getLogEvents();
        if(logEvents.length > 0){
          const lastEvent = logEvents[logEvents.length-1].value.data.events[0].name
          if(lastEvent === 'application-ended'){
            console.log("Will stop capturing logs.")
            this.stopCapturingLogs()
            return
          }
        }
        this.doFetchRecords(50)
      })
    }, LOG_TIMER_DURATION)
  }

  doFetchRecords(dur){
    if(this.state.fetchRecordsTimeout !== -1){
      console.log("Fetch request already in flight, ignoring.")
      return
    } 
    if(this.state.logConsumerName){
      let newTimeout = setTimeout(this.fetchRecords.bind(this), dur)
      console.log("Fetch records request initiated.")
      this.setState({
        fetchRecordsTimeout: newTimeout
      })
    }
  }

  async fetchRecords(){
    if(!this.state.sessionId){
      return
    }
    const { response, error } = await this.getRecords(this.state.sessionId);
    console.log('Clearing fetch record timeout', this.state.fetchRecordsTimeout);
    clearTimeout(this.state.fetchRecordsTimeout)
    const toUpdate = {}
    if(error){
      console.error("There was an error fetching logs.", error)
      try{
        if(this.state.isSessionActive){
          console.log("The session is active.")
          if(error.error_code === 40403){
            console.warn('Consumer instance not found. Recreating consumer.')
            await this.createConsumer()
          } else {
            console.warn('*** Uncaptured error.. destroying consumer.', error)
            let r2 = await this.destroyConsumer()
            if(!r2.error){
              console.log("Create a new consumer after error since session active.")
              console.warn(r2.error)
              // re-establish link
              await this.createConsumer()
            } else {
              console.log('Failed to destroy consumer, stopping log capture.')
              this.stopCapturingLogs()
            }
          }
        } else {
          console.log("No session active. Destroying consumer.")
          let r3 = await this.destroyConsumer()
          if(r3.error){
            console.log("Ending")
            this.stopCapturingLogs()
          }
        }
      } catch(ex) {
        console.error('Error fetching records', ex, error, response)
      }
    } else if (response) {
      if(response.payload){
        const rawEvents = this.state.rawEvents.concat(response.payload)
                            // .filter((obj, index, arr) => {
                            //   return arr.map(mapObj => mapObj.seqid).indexOf(obj.seqid) === index
                            // })
        toUpdate.rawEvents = rawEvents
      }
    }
    toUpdate.fetchRecordsTimeout = -1
    this.setState(toUpdate)
  }

  // Inline Wordsets - ASR and NLU

  initInlineWordsets(){
    const inlineWordsetsLocalStorage = window.localStorage.getItem('inlineWordset')
    if(inlineWordsetsLocalStorage){
      try{
        this.setState({
          inlineWordset: JSON.parse(inlineWordsetsLocalStorage)
        })
      } catch (ex) {
        console.error(ex)
      }
    }
  }

  saveInlineWordsetsToLocalStorage(){
    window.localStorage.setItem('inlineWordset', JSON.stringify(this.state.inlineWordset))
  }

  onUpdateInlineWordset(inlineWordset){
    this.setState({ inlineWordset })
    this.saveInlineWordsetsToLocalStorage()
  }

  onStubInlineWordset(){
    let inlineWordset = this.state.inlineWordset
    inlineWordset['STUB'] = [{
      "literal": "La Jolla",
      "spoken": ["la hoya", "la jolla"],
      "canonical": "LA JOLLA"
    }]
    this.setState({ inlineWordset })
  }

  warmupExperienceSimulation(){
    // expects override - on `simulateExperience` change mediator
  }

  onChangeSelectInput(evt) {
    const tgt = evt.target
    switch(tgt.name){
      case 'simulateExperience':
        this.setState({
          simulateExperience: tgt.value
        }, this.warmupExperienceSimulation)
        break
      case 'ttsVoice':
        let newVoice = {
            name: tgt.value, 
            model: tgt.selectedOptions[0].getAttribute('data-model')
          }
        this.setState({
          ttsVoice: newVoice
        })
        this.saveToSessionStorage({
          ttsVoice: JSON.stringify(newVoice)
        })
        break
      default:
        break
    }
  }

  onChangeLanguage(evt){
    const tgt = evt.target
    switch(tgt.name){
      case 'language':
        let toUpdate = {
          language: tgt.value
        }
        let asrModelUrn = this.state.asrModelUrn
        if(asrModelUrn){
          asrModelUrn = asrModelUrn.replace(this.state.language, toUpdate.language)
          toUpdate.asrModelUrn = asrModelUrn
        }
        this.setState(toUpdate)
        break
      default:
        break
    }
  }

  onChangeCheckboxInput(evt){
    const tgt = evt.target
    switch(tgt.name){
      case 'autoPunctuate':
        this.setState({
          autoPunctuate: tgt.checked
        })
        break
      case 'filterProfanity':
        this.setState({
          filterProfanity: tgt.checked
        })
        break
      case 'suppressInitialCapitalization':
        this.setState({
          suppressInitialCapitalization: tgt.checked
        })
        break
      case 'useDLM':
        this.setState({
          useDLM: tgt.checked
        })
        break
      default:
        break
    }
  }

  onChangeTextInput(evt) {
    // Handle text input
    const tgt = evt.target
    switch(tgt.name){
      case 'textInput':
        this.setState({
          textInput: tgt.value
        })
        break
      case 'clientId':
        this.setState({
          clientId: tgt.value
        })
        break
      case 'clientSecret':
        this.setState({
          clientSecret: tgt.value
        })
        this.saveToSessionStorage({
          'clientSecret': tgt.value
        })
        break
      case 'channel':
        this.setState({
          channel: tgt.value
        })
        break
      case 'modelUrn':
        this.setState({
          modelUrn: tgt.value
        })
        break
      case 'nluModelUrn':
        this.setState({
          nluModelUrn: tgt.value,
          contextTag: this.parseContextTag(tgt.value)
        })
        break
      case 'asrModelUrn':
        this.setState({
          asrModelUrn: tgt.value,
          contextTag: this.parseContextTag(tgt.value)
        })
        break
      case 'language':
        this.setState({
          language: tgt.value
        })
        break
      case 'topic':
        this.setState({
          topic: tgt.value
        })
        break
      case 'sessionTimeout':
        this.setState({
          sessionTimeout: tgt.value
        })
        break
      case 'sessionId':
        this.setState({
          sessionId: tgt.value
        })
        break
      case 'voice':
        this.setState({
          voice: tgt.value
        })
        break
      case 'contextTag':
        let lang6 = getLanguageCode(this.state.language)
        let newUrn = `urn:nuance-mix:tag:model/${tgt.value}/mix.nlu?=language=${lang6}`
        this.setState({
          contextTag: tgt.value,
          nluModelUrn: newUrn
        })
        break
      case 'maxInterpretations':
        this.setState({
          maxInterpretations: tgt.value
        })
        break
      default:
        break
    }
  }

  parseContextTag(urn, pattern){
    try {
      const results = urn.match(pattern || URN_REGEX_NLU)
      // console.log('parsed', results)
      if(results && results.length){
        return results[1]
      }
    } catch (ex) {
      console.error('unable to parse context tag', ex)
    }
    return ''
  }

  handleTabSelection(key){
    if (key === 'profile'){
      navigate(`/app/${window.location.search}`)
    } else if (key === 'dlgaas'){
      navigate(`/app/dlg/${window.location.search}`)
    } else if(key === 'nluaas'){
      navigate(`/app/nlu/${window.location.search}`)
    } else if (key === 'ttsaas'){
      navigate(`/app/tts/${window.location.search}`)
    } else if (key === 'asraas'){
      navigate(`/app/asr/${window.location.search}`)
    }
  }
}

export const AuthForm = ({tokenError, clientId, clientSecret, initToken, onChangeTextInput, serviceScope, standalone}) => {
  let scopes = []
  serviceScope.split(' ').forEach((scope, idx) => {
    scopes.push(
      <div key={`form-scope-${idx}`} className="form-check form-check-inline">
        <input className="form-check-input" type="checkbox" value={scope} checked readOnly={true}/>
        <label className="form-check-label">{scope}</label>
      </div>
    )
  })
  return (
    <div className="col-md-6 offset-md-3">
      <h3 className="fw-bold mt-4">Authenticate</h3>
      { !standalone ? (
        <div className="text-muted">
          <small>Provide your Mix Application's <a target="_blank" rel="noreferrer" href="https://docs.mix.nuance.com/app-configs/?src=demo#client-id">Client Credentials</a>.</small>
        </div>) : '' }
      <form className="" onSubmit={(evt) => {initToken(serviceScope); evt.preventDefault();}}>
        <div className="form-floating mt-3">
          <input type="text"  className={'form-control ' + (clientId.length === 0 || tokenError ? 'is-invalid' : '')} name="clientId" value={clientId} onChange={onChangeTextInput} />
          <label htmlFor="clientId" className="form-label">Client ID</label>
        </div>
        <div className="form-floating mt-2">
          <input type="password" className={'form-control ' + (clientSecret.length === 0 || tokenError ? 'is-invalid' : '')} name="clientSecret" value={clientSecret} onChange={onChangeTextInput} />
          <label htmlFor="clientSecret" className="form-label">Client Secret</label>
          { tokenError ? (
            <div id="validationClientSecret" className="badge bg-danger text-white text-wrap invalid-feedback">
              <strong>Issue</strong> {tokenError}
            </div>
          ) : '' }
        </div>
        <div className="form-group mt-3">
          <span className="form-label mr-3">OAuth Scopes: &nbsp; &nbsp;</span>
          {scopes}
        </div>
        <div className="form-group mt-3">
          <button className="btn btn-primary" type="submit">Get Token</button>
        </div>
      </form>
    </div>
  )
}
