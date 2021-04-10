/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React, { useState } from "react"

import loadable from '@loadable/component'

import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { BaseClass, AuthForm, CLIENT_DATA, ROOT_URL, LANG_EMOJIS } from "./shared"

const ReactJson = loadable(() => import('react-json-view'))
const Tabs = loadable(() => import('react-bootstrap/Tabs'))
const Tab = loadable(() => import('react-bootstrap/Tab'))
const TabContent = loadable(() => import('react-bootstrap/TabContent'))

const ProcessingState = {
  IDLE: 1,
  IN_FLIGHT: 2,
}

//
// TTSaaS
//

class SynthesisRequest {
  constructor(input, res){
    this.input = input
    this.res = res
  }
  getInput(){
    if(this.input){
      let input = this.input.input
      if(input.text){
        return input.text.text
      } else if(input.ssml){
        return input.ssml.text
      }
    }
    return null
  }
  getVoice(){
    let voice = this.input ? this.input.voice : null
    if(voice){
      let flag = LANG_EMOJIS[voice.language]
      if(flag){
        return `${voice.name} ${flag}`
      } else {
        return voice.name
      }
    }
    return voice
  }
  getAudio(){
    return this.res ? this.res.response.payload.audio : null
  }
}

function TtsTabs({voices, audioclips, rawResponses, replay, onUseVoice}){
  const [key, setKey] = useState('rendered_payload')
  let voicesHtml = []
  voices.forEach((v, idx) => {
    voicesHtml.push(
      <tr key={idx} className={'align-middle ' + (v.restricted ? 'bg-light text-danger' : '') + (v.sampleRateHz === 22050 ? '' : ' text-muted')}>
        <td>{v.name}</td>
        <td>{v.language in LANG_EMOJIS ? LANG_EMOJIS[v.language] : v.language} {v.language}</td>
        <td>{v.model}</td>
        <td>{v.gender}</td>
        <td>{v.version}</td>
        <td>{v.sampleRateHz}</td>
        <td>{v.sampleRateHz === 22050 ? (<button className="btn btn-sm badge btn-primary btn-outline-primary" onClick={(evt) => {onUseVoice(v)}}>Use Voice</button>) : ''}</td>
      </tr>
    )
  })
  let headerHtml = (
    <tr>
      <th>Name</th>
      <th>Language</th>
      <th>Model</th>
      <th>Gender</th>
      <th>Version</th>
      <th>Sample Rate Hz</th>
      <th></th>
    </tr>
  )
  let clipsHtml = []
  audioclips.forEach((clip, idx) => {
    clipsHtml.push(
      <dd key={idx}>
        <div className="card">
          <div className="card-header">
            <span className="float-start">{clip.getInput()}</span>
            <a href="#" className="float-end px-3" 
              onClick={evt => {
                if(clip.getAudio()){
                  replay(clip.getAudio())
                }
              }}>
              <FontAwesomeIcon icon={faPlay}/>
            </a>
            <span className="float-end px-3 badge bg-white text-dark">{clip.getVoice()}</span>
          </div>
        </div>
      </dd>
    )
  })
  let voicesTableHtml = (<table className="table table-sm">{headerHtml}<tbody>{voicesHtml}</tbody></table>)
  let audioClipsHtml = (<div className="card"><div className="card-body"><dl className="mb-0">{clipsHtml}</dl></div></div>)
  return (
    <Tabs onSelect={(k) => setKey(k)}
      activeKey={key}
      transition={false} 
      id="noanim-tab-example">
      <Tab eventKey="all_voices" title={(<div>All Voices</div>)}>
        <TabContent className="bg-light px-2 py-2">
          { key === 'all_voices' ? voicesTableHtml : ''}
        </TabContent>
      </Tab>
      <Tab eventKey="rendered_payload" title={(<div>Synthesized Audio</div>)}>
        <TabContent className="bg-light px-2 py-2">
          { key === 'rendered_payload' ? audioClipsHtml : ''}
        </TabContent>
      </Tab>
      <Tab eventKey="raw_payloads" title={(<div>Client Payloads <small className="badge bg-light text-secondary">{rawResponses.length}</small></div>)}>
        <TabContent className="bg-light px-2 py-2">
          { key === 'raw_payloads' ? (
            <ReactJson 
              className="mb-2"
              key={'raw-json-' + rawResponses.length}
              src={rawResponses} 
              displayDataTypes={false}
              iconStyle={'circle'}
              indentWidth={2}
              name={false}
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

export default class TTSaaS extends BaseClass {

  constructor(){
    super()
    this.state = {
      error: '',
      clientId: '',
      clientSecret: '',
      accessToken: null,
      rawResponses: [],
      rawEvents: [],
      tokenError: '',
      textInput: '',
      ssmlInput: false,
      voice: { 
        "name": "Evan", 
        "model": "xpremium-high" 
      },
      synthesizedAudioClips: [],
      processing: ProcessingState.IDLE,
      voices: []
    }
    this.audioSink = null
  }

  componentDidMount(){
    const toUpdate = this.initStateFromQueryParams([
      'clientId', 
      'clientSecret',
    ])
    if(Object.keys(toUpdate).length){
      this.setState(toUpdate)
    }
    window.addEventListener('beforeunload', this.onUnmount, false)
    this.audioSink = new Audio()
  }

  initVoices() {
    this.getVoices().then(res => {
      this.setState({
        voices: res.response.payload.voices
      })
    })
  }

  onUnmount = (e) => {
    try{
      this.audioSink = null
    } catch(ex) {
      console.warn(ex)
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnmount.bind(this), false)
    this.onUnmount()
  }

  onTokenAcquired() {
    if(this.state.voices.length === 0){
      this.initVoices()
    }
  }

  // TTSaaS

  async getVoices(rawPayload) {
    // Load the voices available for use
    await this.ensureTokenNotExpired()
    return await this.request(`${ROOT_URL}/api/ttsaas-voices`, {
      token: this.state.accessToken, 
      rawPayload: rawPayload
    })
  }

  async synthesize(rawPayload) {
    // Synthesize text
    await this.ensureTokenNotExpired()
    return await this.request(`${ROOT_URL}/api/ttsaas-synthesize`, {
      token: this.state.accessToken, 
      rawPayload: rawPayload
    })
  }

  async executeTextInput(){
    let input = {
      text: {
        text: this.state.textInput
      }
    }
    if(this.state.ssmlInput){
      let ssmlInput = this.state.textInput
      if(!ssmlInput.startsWith('<speak')){
        ssmlInput = `<speak xmlns="http://www.w3.org/2001/10/synthesis" version="1.0">${ssmlInput}</speak>`
      } 
      input = {
        ssml: {
          text: `<?xml version="1.0"?>${ssmlInput}`
        }
      }
    }
    const payload = {
      voice: this.state.voice, 
      audio_params: { 
        volume_percentage: 80, 
        audio_chunk_duration_ms: 2000,
        audio_format: {
          ogg_opus: {
            sample_rate_hz: 24000
          }
        }
      }, 
      input: input, 
      event_params: { 
        send_log_events: true 
      },
      client_data: CLIENT_DATA,
    }
    let rawResponses = this.state.rawResponses || []
    let synthesizedAudioClips = this.state.synthesizedAudioClips || []
    rawResponses.unshift({
      request: payload,
    })
    this.setState({
      processing: ProcessingState.IN_FLIGHT
    })
    let res = await this.synthesize(payload)
    rawResponses.unshift(res);
    if(res.response?.payload.status.code !== 200){
      this.setState({
        rawResponses: rawResponses,
        error: res.response.payload.status.details,
        processing: ProcessingState.IDLE,
      })
    } else {
      synthesizedAudioClips.unshift(
        new SynthesisRequest(payload, res))
      this.setState({
        rawResponses: rawResponses,
        synthesizedAudioClips: synthesizedAudioClips,
        error: null,
        processing: ProcessingState.IDLE,
      })
      this.parseResponse(res)
    }
  }

  playAudio(audio) {
    let audioclipRaw = "data:audio/ogg;base64," + audio
    this.audioSink.src = audioclipRaw;
    this.audioSink.play();    
  }

  parseResponse(res){
    if(res.response.payload){
      this.playAudio(res.response.payload.audio)
    }
  }

  getAuthHtml(){
    return (
      <div className="col-md-6 offset-md-3">
        <Tabs defaultActiveKey="ttsaas" transition={false} 
          id="noanim-tab-example" 
          variant="pills"
          className="justify-content-center"
          onSelect={this.handleTabSelection.bind(this)}>
          <Tab eventKey="profile" title={`Profile`}></Tab>
          <Tab eventKey="dlgaas" title={`DLGaaS`}></Tab>
          <Tab eventKey="nluaas" title="NLUaaS"></Tab>
          <Tab eventKey="ttsaas" title={`TTSaaS`}>
            <AuthForm tokenError={this.state.tokenError}
                initToken={this.initToken.bind(this)}
                clientId={this.state.clientId}
                clientSecret={this.state.clientSecret}
                onChangeTextInput={this.onChangeTextInput.bind(this)}
                serviceScope="tts log" />
          </Tab>
        </Tabs>
      </div>
    );
  }

  getVoicesSelectOptions() {
    let voiceOptions = []
    let lastLang = null
    this.state.voices.forEach((v, idx) => {
      if(v.sampleRateHz === 22050){
        if(lastLang != v.language){
          voiceOptions.push(<optgroup key={'optgroup-'+idx} label={v.language}></optgroup>)
          lastLang = v.language
        }
        voiceOptions.push(<option key={'option-'+idx} value={v.name}>{v.name}</option>)
      }
    })
    return voiceOptions
  }

  onChangeVoice(evt) {
    // Handle text input
    const tgt = evt.target
    switch(tgt.name){
      case 'voice':
        let voice = null
        this.state.voices.forEach(v => {
          if(v.sampleRateHz === 22050){
            if(tgt.value === v.name){
              voice = v
              return
            }
          }
        })
        if(voice){
          this.onUseVoice(voice)
        }
        break
      default:
        break
    }
  }

  onUseVoice(voice){
    this.setState({
      voice: voice
    })
  }

  getSynthesizeHtml() {
    let voiceOptions = this.getVoicesSelectOptions()
    return (
      <div className="col">
        <div className="row">
          <div className="col-12 mb-3">
            <h3 className="fw-bold">Text to Speech</h3>
            <span className="text-dark mb-3 float-start">
              Learn more about <a href="https://docs.mix.nuance.com/languages/?src=demo#languages-and-voices">voices</a>.
            </span>
          </div>
          <div className="col-12">
            <div className="row" style={{height: '100%'}}>
              <form className="form" onSubmit={
                  (evt) => {
                    evt.preventDefault();
                    this.executeTextInput()
                  }
                }>
                <div className="input-group">
                  <Form.Group style={{'height': '50px', 'width': '65%'}} className="form-floating">
                    <Form.Control name="textInput" type="text" value={this.state.textInput} placeholder="Start typing here..." onChange={this.onChangeTextInput.bind(this)}/>
                    <Form.Label htmlFor="textInput">Text to Synthesize</Form.Label>
                  </Form.Group>
                  <Form.Group style={{'width': '10%'}} className="form-floating px-3 position-relative end-0 mt-0 mb-0 border">
                    <Form.Check label={`SSML`} className="align-middle my-3" type="checkbox" name="ssml" checked={this.state.ssmlInput} onChange={evt => {this.setState({ssmlInput: !this.state.ssmlInput})}}></Form.Check>
                  </Form.Group>
                  <Form.Group style={{'width': '15%'}} className="form-floating">
                    <Form.Control name="voice" as="select" value={this.state.voice.name} onChange={this.onChangeVoice.bind(this)}>
                      { voiceOptions }
                    </Form.Control>
                    <Form.Label htmlFor="voice">Voice</Form.Label>
                  </Form.Group>
                  <button disabled={this.state.textInput.length === 0 || this.state.processing === ProcessingState.IN_FLIGHT} className="btn btn-secondary" 
                    type="submit" style={{'width': '10%'}}>Synthesize</button>
                </div>
                { this.state.error ? (
                  <div className="badge bg-danger text-white w-100 text-wrap mt-2">
                    {JSON.stringify(this.state.error)}
                  </div>
                ) : ('') }
              </form>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-12 mt-3">
            <TtsTabs
              replay={this.playAudio.bind(this)} 
              voices={this.state.voices} 
              onUseVoice={this.onUseVoice.bind(this)}
              audioclips={this.state.synthesizedAudioClips}
              rawResponses={this.state.rawResponses}/>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className="row">
        { 
          this.state.accessToken ? 
          this.getSynthesizeHtml() : 
          this.getAuthHtml() 
        }
      </div>
    )
  }

}
