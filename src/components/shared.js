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

export const ROOT_URL = process.env.NODE_ENV === 'production' ? '' : 'https://localhost:7071'
export const VERSION = '1.2.0'
export const CLIENT_DATA = {
    "version": VERSION,
    "client": "Nuance Mix Demo Client - Azure StaticWebApps",
}
export const LOG_TIMER_DURATION = 8 * 1000 // log get records will trigger at this interval
export const URN_REGEX = /urn:nuance-mix:tag:model\/(?<tag>[^\/].*)\/mix.nlu\?=language=(?<language>.*)/
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
    const toUpdate = {}
    if(typeof window !== `undefined`){
      const urlParams = new URLSearchParams(window.location.search)
      params.forEach((q) => {
        const v = urlParams.get(q)
        if(v){
          toUpdate[q] = decodeURIComponent(v)
        }
      });
    }
    return toUpdate
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
    return 'nlu tts dlg log'
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
    if((accessToken.expires_at * 1000) - Date.now() < one_minute){
      return await this.initToken(this.getScope())
    }
    return false;
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
    })
    this.onTokenAcquired()
    return !!res
  }

  onTokenAcquired() {
    // Do something
  }

  // Log API

  async createConsumer(){
    // First, create a consumer for getting the LOG data
    await this.ensureTokenNotExpired()
    const ret = await this.request(`${ROOT_URL}/api/logapi-create-consumer`, {
      clientId: encodeURIComponent(this.state.clientId),
      token: this.state.accessToken,
    })
    console.log("New consumer created")
    this.setState({
      logConsumerName: ret.response.consumerName,
      logConsumerGroup: ret.response.consumerGroup,
    })
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
    // Lastly, destroy the Consumer attached
    await this.ensureTokenNotExpired()
    const ret = await this.request(`${ROOT_URL}/api/logapi-destroy-consumer`, {
      token: this.state.accessToken,
      consumerName: this.state.logConsumerName,
      consumerGroup: this.state.logConsumerGroup,      
    })
    console.log("Consumer destroyed")
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
    this.logTimer = window.setInterval(() => {
      const logEvents = this.getLogEvents();
      if(logEvents.length > 0){
        const lastEvent = logEvents[logEvents.length-1].value.data.events[0].name
        if(lastEvent === 'application-ended'){
          this.stopCapturingLogs()
          return
        }
      }
      this.doFetchRecords(50)
    }, LOG_TIMER_DURATION)
  }

  doFetchRecords(dur){
    if(this.state.fetchRecordsTimeout !== -1){
      return
    } 
    if(this.state.logConsumerName){
      let newTimeout = setTimeout(this.fetchRecords.bind(this), dur)
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
    console.log('clearing fetch record timeout', this.state.fetchRecordsTimeout);
    clearTimeout(this.state.fetchRecordsTimeout)
    const toUpdate = {}
    if(error){
      try{
        if(this.state.isSessionActive){
          if(error.error_code === 40403){
            console.warn('error getting records, creating new consumer')
            await this.createConsumer()
          } else {
            console.warn('uncaptured error', error)
            let r2 = await this.destroyConsumer()
            if(!r2.error){
              console.warn(r2.error)
              // re-establish link
              await this.createConsumer()
            } else {
              console.log('Ending log timer')
              this.stopCapturingLogs()
            }
          }
        } else {
          let r3 = await this.destroyConsumer()
          if(r3.error){
            this.stopCapturingLogs()
          }
        }
      } catch(ex) {
        console.error('error fetching records', ex, error, response)
      }
    } else if (response) {
      if(response.payload){
        const rawEvents = this.state.rawEvents.concat(response.payload)
        toUpdate.rawEvents = rawEvents
      }
    }
    toUpdate.fetchRecordsTimeout = -1
    this.setState(toUpdate)
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
      case 'language':
        this.setState({
          language: tgt.value
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
        console.log('using language code', lang6, newUrn)
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

  parseContextTag(urn){
    try {
      const results = urn.match(URN_REGEX)
      console.log('parsed', results)
      if(results && results.length){
        console.log('Setting state context tag to', results[1])
        return results[1]
      }
    } catch (ex) {
      console.error('unable to parse context tag', ex)
    }
    return ''
  }

  handleTabSelection(key){
    if(key === 'nluaas'){
      navigate(`/app/nlu/${window.location.search}`)
    } else if (key === 'profile'){
      navigate(`/app/${window.location.search}`)
    } else if (key === 'dlgaas'){
      navigate(`/app/dlg/${window.location.search}`)
    } else if (key === 'ttsaas'){
      navigate(`/app/tts/${window.location.search}`)
    }
  }

}

export const AuthForm = ({tokenError, clientId, clientSecret, initToken, onChangeTextInput, serviceScope, standalone}) => {
  return (
    <div>
      <h3 className="fw-bold mt-4">Authenticate</h3>
      { !standalone ? (
        <div className="text-muted">
          <small>Provide your Mix Application's <a target="_blank" rel="noreferrer" href="https://docs.mix.nuance.com/app-configs/?src=demo#client-id">Client Credentials</a>.</small>
        </div>) : '' }
      <form className="" onSubmit={(evt) => {initToken(serviceScope); evt.preventDefault();}}>
        <div className="form-floating mt-3">
          <input type="text" className="form-control" name="clientId" value={clientId} onChange={onChangeTextInput} />
          <label htmlFor="clientId" className="form-label">Client ID</label>
        </div>
        <div className="form-floating mt-2">
          <input type="password" className="form-control" name="clientSecret" value={clientSecret} onChange={onChangeTextInput} />
          <label htmlFor="clientSecret"  className={'form-label ' + (tokenError ? 'is-invalid' : '')}>Client Secret</label>
          { tokenError ? (
            <div id="validationClientSecret" className="badge bg-danger text-white text-wrap invalid-feedback">
              <strong>Issue</strong> {tokenError}
            </div>
          ) : '' }
        </div>
        <div className="form-group mt-3">
          <span className="form-label mr-3">OAuth Scopes: &nbsp; &nbsp;</span>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="scopeSvc" value={serviceScope.split(' ')[0]} checked readOnly={true}/>
            <label className="form-check-label" htmlFor="scopeSvc">{serviceScope.split(' ')[0]}</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="scopeLog" value={serviceScope.split(' ')[1]} checked readOnly={true}/>
            <label className="form-check-label" htmlFor="scopeLog">{serviceScope.split(' ')[1]}</label>
          </div>
        </div>
        <div className="form-group mt-3">
          <button className="btn btn-primary" type="submit">Get Token</button>
        </div>
      </form>
    </div>
  )
}
