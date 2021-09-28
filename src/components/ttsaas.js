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
import { NEEDS_INPUT, SSML_OPTIONS } from "../utility/ssml-options"

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

  addSSML(evt){
    const getSSMLAttributeValues = (attributes, attributeOption) => {
      return attributes.filter(attribute => attributeOption.hasOwnProperty(attribute))
                .map(attribute => `${attribute}="${attributeOption[attribute]}"`)
                .join(" ")
    }

    let ssmlName = evt.target.name;
    let ssmlValue = evt.target.value;
    if(SSML_OPTIONS.hasOwnProperty(ssmlName)){
      const ssmlDetails = SSML_OPTIONS[ssmlName];
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
        textInput
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
                      <Form.Control className="h-100" name="textInput" type="text" as="textarea" value={this.state.textInput} placeholder="Start typing here..." onChange={this.onChangeTextInput.bind(this)} ref='textToSynthesize'/>
                      <Form.Label htmlFor="textInput">Text to Synthesize</Form.Label>
                    </Form.Group>
                  </Col>
                  <Col sm={6} md={4}>
                    <Form.Group className="form-floating mb-2 mt-sm-2 mt-md-0">
                      <Form.Control name="voice" as="select" value={this.state.voice.name} onChange={this.onChangeVoice.bind(this)}>
                        { voiceOptions }
                      </Form.Control>
                      <Form.Label htmlFor="voice">Voice</Form.Label>
                    </Form.Group>
                    {Object.entries(SSML_OPTIONS).map(([ssmlName, ssmlOptions], index) => {
                      return (
                        <div className="d-flex" key={index}>
                          <Form.Group className="form-floating mb-2 w-100">
                            <Form.Control defaultValue="DEFAULT" name={ssmlName} as="select" onChange={this.addSSML.bind(this)} onFocus={() => this.refs.textToSynthesize.focus()}>
                              <option disabled value="DEFAULT">{""}</option>
                              { Object.entries(ssmlOptions.options).map(([ssmlOption, _], idx) => 
                                <option key={`${index}-${idx}`} value={ssmlOption}>{ssmlOption}</option> 
                              )}
                            </Form.Control>
                            <Form.Label htmlFor={ssmlName} className="text-capitalize">{ssmlOptions.name}</Form.Label>
                          </Form.Group>
                          <a href={ssmlOptions.url} className="mb-2" target="_blank" rel="noopener noreferrer" style={{"margin-left": ".5rem"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="100%" fill="currentColor" class="bi bi-question-square-fill" viewBox="0 0 16 16">
                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"/>
                            </svg>
                          </a>
                        </div>
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
