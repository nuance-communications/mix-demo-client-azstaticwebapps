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
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { BaseClass, AuthForm, CLIENT_DATA, ROOT_URL, LANG_EMOJIS } from "./shared"
import { DEFAULT_SSML_VALUE, NEEDS_INPUT, SSML_OPTIONS } from "../utility/ssml-options"

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
      defaultSSMLValue: DEFAULT_SSML_VALUE,
      selectVoiceTagActive: false,
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
      if(res.error && !res.response){
        this.setState({
          rawResponses: rawResponses,
          error: res.error.message,
          processing: ProcessingState.IDLE,
        })
      }
      else{
        this.setState({
          rawResponses: rawResponses,
          error: res.response.payload.status.details,
          processing: ProcessingState.IDLE,
        })
      }
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
    let ssmlVoiceOptions = {}
    let lastLang = null
    this.state.voices.forEach((v, idx) => {
      if(v.sampleRateHz === 22050){
        if(lastLang != v.language){
          voiceOptions.push(<optgroup key={'optgroup-'+idx} label={v.language}></optgroup>)
          lastLang = v.language
        }
        voiceOptions.push(<option key={'option-'+idx} value={v.name}>{v.name}</option>)
        ssmlVoiceOptions[v.name] = {
          name: v.name
        }
      }
    })
    return [voiceOptions, ssmlVoiceOptions]
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

  addSSML(evt, ssmlOptions){
    const getSSMLAttributeValues = (attributes, attributeOption) => {
      return attributes.filter(attribute => attributeOption.hasOwnProperty(attribute))
                .map(attribute => `${attribute}="${attributeOption[attribute]}"`)
                .join(" ")
    }

    let ssmlName = evt.target.name;
    let ssmlValue = evt.target.value;
    if(ssmlOptions.hasOwnProperty(ssmlName)){
      const ssmlDetails = ssmlOptions[ssmlName];
      const ssmlAttributeOption = ssmlDetails.options[ssmlValue];
      const ssmlStartTag = `<${ssmlDetails.tag} ${getSSMLAttributeValues(ssmlDetails.attributes, ssmlAttributeOption)}${ssmlDetails.container ? '>' : '/>'}`
      let newCursorIndex = undefined;
      if(ssmlAttributeOption.hasOwnProperty(NEEDS_INPUT) && ssmlAttributeOption[NEEDS_INPUT] === true){
        newCursorIndex = ssmlStartTag.indexOf(`="`) + 2;
        if(ssmlAttributeOption.hasOwnProperty("prefix")){
          newCursorIndex++;
        }
      }
      const textToSynthesize = this.refs.textToSynthesize;
      const cursorStartIndex = textToSynthesize.selectionStart;
      const cursorEndIndex = textToSynthesize.selectionEnd;
      let textInput = this.state.textInput;
      const textToWrap = textInput.substring(cursorStartIndex, cursorEndIndex);
      let ssmlWrappedText = ssmlStartTag + textToWrap;
      if(ssmlDetails.container){
        ssmlWrappedText += `</${ssmlDetails.tag}>`
      }
      textInput = textInput.substring(0, cursorStartIndex) + ssmlWrappedText + textInput.substring(cursorEndIndex);
      this.setState({
        textInput,
        ssmlInput: true
      }, () => {
        if(newCursorIndex !== undefined){
          newCursorIndex += cursorStartIndex;
        }
        else{
          newCursorIndex = cursorStartIndex + ssmlWrappedText.length;
        }
        this.refs.textToSynthesize.selectionStart = this.refs.textToSynthesize.selectionEnd = newCursorIndex;
        this.refs.textToSynthesize.focus();
      })
    }
    else{
      this.setState({
        error: "Invalid SSML Property"
      })
    }
  }

  getSynthesizeHtml() {
    let [voiceOptions, ssmlVoiceOptions] = this.getVoicesSelectOptions();
    const voiceTag = {
      tag: 'voice',
      container: true,
      name: 'Voice Tag',
      attributes: ['name'],
      url: 'https://docs.mix.nuance.com/tts-grpc/v1/#prosody-rate',
      options: ssmlVoiceOptions
    };
    const VOICE_NAME = "voice";
    return (
      <div className="col">
        <div className="row">
          <div className="col-12 mb-3">
            <h3 className="fw-bold">Text to Speech</h3>
            <span className="text-dark mb-3 float-start">
              Learn more about <a href="https://docs.mix.nuance.com/languages/?src=demo#languages-and-voices" target="_blank" rel="noopener noreferrer">voices</a> and <a href="https://docs.mix.nuance.com/tts-grpc/v1/#ssml-tags" target="_blank" rel="noopener noreferrer">SSML tags</a>.
            </span>
          </div>
          <div className="col-12">
            <div className="row" style={{height: '100%'}}>
              <Form onSubmit={
                  (evt) => {
                    evt.preventDefault();
                    this.executeTextInput()
                  }
                }>
                <Row>
                  <label className="switch mx-2 mb-2 p-0">
                      <input type="checkbox" name="ssml" checked={this.state.ssmlInput} onChange={evt => {this.setState({ssmlInput: !this.state.ssmlInput})}}/>
                      <div className="slider round"/>
                  </label>
                </Row>
                <Row>
                  <Col sm={12} md={8}>
                    <Form.Group className="form-floating h-100">
                      <Form.Control className={(!this.state.textInput || this.state.textInput.length <= 0) ? "h-100" : "h-100 pt-2"} name="textInput" type="text" as="textarea" value={this.state.textInput} placeholder="Start typing here..." onChange={this.onChangeTextInput.bind(this)} ref='textToSynthesize'/>
                      {(!this.state.textInput || this.state.textInput.length <= 0) && <Form.Label htmlFor="textInput">Text to Synthesize</Form.Label>}
                    </Form.Group>
                  </Col>
                  <Col sm={6} md={4}>
                    <div className="d-flex">
                        <Form.Group className="form-floating mb-2 mt-sm-2 mt-md-0 w-100">
                          <Form.Control name="voice" as="select" value={this.state.voice.name} onChange={this.onChangeVoice.bind(this)}>
                            { voiceOptions }
                          </Form.Control>
                          <Form.Label htmlFor="voice">Voice</Form.Label>
                        </Form.Group>
                        {!this.state.selectVoiceTagActive && 
                          <div className="mb-2 d-flex justify-content-center align-items-center flex-column" style={{marginLeft: ".5rem"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="100%" fill="currentColor" className="bi bi-question-square-fill cursor-pointer text-secondary add-voice-btn" viewBox="0 0 16 16" onClick={() => this.setState({
                                selectVoiceTagActive: true
                              })}>
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                            </svg>
                          </div>
                        }
                    </div>
                    {this.state.selectVoiceTagActive && 
                      <Form.Group className="form-floating mb-2" style={{marginLeft: "2rem"}}>
                        <Form.Control value={this.state.defaultSSMLValue} name={VOICE_NAME} as="select" onChange={(evt) => this.addSSML(evt, {voice: voiceTag})} onFocus={() => this.refs.textToSynthesize.focus()}>
                          <option disabled value={DEFAULT_SSML_VALUE}>{""}</option>
                          { voiceOptions }
                        </Form.Control>
                        <Form.Label htmlFor={VOICE_NAME} className="text-capitalize">{voiceTag.name}</Form.Label>
                      </Form.Group>
                    }
                    {Object.entries(SSML_OPTIONS).map(([ssmlName, ssmlOptions], index) => {
                      return (
                          <Form.Group className="form-floating mb-2 w-100" key={index}>
                            <Form.Control value={this.state.defaultSSMLValue} name={ssmlName} as="select" onChange={(evt) => this.addSSML(evt, SSML_OPTIONS)} onFocus={() => this.refs.textToSynthesize.focus()}>
                              <option disabled value={DEFAULT_SSML_VALUE}>{""}</option>
                              { Object.entries(ssmlOptions.options).map(([ssmlOption, _], idx) => 
                                <option key={`${index}-${idx}`} value={ssmlOption}>{ssmlOption}</option> 
                              )}
                            </Form.Control>
                            <Form.Label htmlFor={ssmlName} className="text-capitalize">{ssmlOptions.name}</Form.Label>
                          </Form.Group>
                        )
                    })}
                    <Button disabled={this.state.textInput.length === 0 || this.state.processing === ProcessingState.IN_FLIGHT} variant="secondary" 
                    type="submit">Synthesize</Button>
                  </Col>
                </Row>
                { this.state.error ? (
                  <div className="badge bg-danger text-white w-100 text-wrap mt-2">
                    {JSON.stringify(this.state.error)}
                  </div>
                ) : ('') }
              </Form>
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
