/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React from "react"

import loadable from '@loadable/component'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { BaseClass } from "./shared"

const Tabs = loadable(() => import('react-bootstrap/Tabs'))
const Tab = loadable(() => import('react-bootstrap/Tab'))
const Button = loadable(() => import('react-bootstrap/Button'))

function ProfileView({
  clientId, 
  clientSecret, 
  simulateExperience, 
  modelUrn, 
  language, 
  sessionTimeout, 
  channel, 
  nluModelUrn,
  asrModelUrn,
  sessionId, 
  onChangeTextInput, 
  onChangeSelectInput
}){

  const save = () => {
    let params = new URLSearchParams()
    params.set('clientId', clientId)
    // params.set('clientSecret', clientSecret) // USE IN DEV MODE only
    params.set('simulateExperience', simulateExperience)
    params.set('modelUrn', modelUrn)
    params.set('language', language)
    params.set('sessionTimeout', sessionTimeout)
    params.set('channel', channel)
    params.set('sessionId', sessionId)
    params.set('nluModelUrn', nluModelUrn)
    params.set('asrModelUrn', asrModelUrn)
    window.location.search = params.toString()
  }

  return (
    <main className="px-1 py-1 mt-3 col-md-8 offset-md-2 vh-100 min-vh-100">
      <div className="text-center alert border-1 text-muted mb-2 ">
        Set up your configuration, and save it for a URL you can bookmark and share.
      </div>
      <Form className="h-75 min-vh-75 overflow-auto px-3" 
        onSubmit={evt => {
          evt.preventDefault()
          save()
        }}>
        <h6 className='text-muted mt-4'>Client Configuration</h6>
        <Form.Group className="form-floating">
          <Form.Control name="clientId" type="text" value={clientId} placeholder="Enter Client ID" onChange={onChangeTextInput}/>
          <Form.Label htmlFor="clientId">Client ID</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating">
          <Form.Control name="clientSecret" type="password" value={clientSecret} placeholder="Enter Client Secret" onChange={onChangeTextInput} />
          <Form.Label>Client Secret <span className="text-danger">***</span></Form.Label>
        </Form.Group>
        <h6 className='text-muted mt-4'>DLGaaS Tab Configuration</h6>
        <Form.Group className="form-floating">
          <Form.Control 
            name="simulateExperience"
            as="select" 
            className="form-select"
            value={simulateExperience} 
            onChange={onChangeSelectInput}>
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
        </Form.Group>
        <Form.Group className="form-floating">
          <Form.Control name="modelUrn" type="text" value={modelUrn} placeholder="Enter DLG URN" onChange={onChangeTextInput} />
          <Form.Label>DLG App Model URN</Form.Label>
        </Form.Group>
        <Row className="gx-0">
          <Col className="px-0">
            <Form.Group className="form-floating">
              <Form.Control name="sessionTimeout" type="text" value={sessionTimeout} placeholder="Enter DLG Timeout in Seconds" onChange={onChangeTextInput} />
              <Form.Label>DLG Session Timeout</Form.Label>
            </Form.Group>
          </Col>
          <Col className="px-0">
            <Form.Group className="form-floating">
              <Form.Control name="channel" type="text" value={channel} placeholder="Enter DLG Channel" onChange={onChangeTextInput} />
              <Form.Label>DLG Channel</Form.Label>
            </Form.Group>
          </Col>
          <Col className="px-0">
            <Form.Group className="form-floating">
              <Form.Control name="language" type="text" value={language} placeholder="Enter DLG Language" onChange={onChangeTextInput} />
              <Form.Label>DLG Language</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="form-floating">
          <Form.Control name="sessionId" type="text" value={sessionId} placeholder="Enter DLG Session ID" onChange={onChangeTextInput} />
          <Form.Label>DLG Session ID <span className='text-muted'>(optional)</span></Form.Label>
        </Form.Group>
        <h6 className='text-muted mt-4'>ASRaaS Tab Configuration</h6>
        <Form.Group className="form-floating">
          <Form.Control name="asrModelUrn" type="text" value={asrModelUrn} placeholder="Enter ASR DLM URN" onChange={onChangeTextInput} />
          <Form.Label>ASR DLM URN</Form.Label>
        </Form.Group>
        <h6 className='text-muted mt-4'>NLUaaS Tab Configuration</h6>
        <Form.Group className="form-floating">
          <Form.Control name="nluModelUrn" type="text" value={nluModelUrn} placeholder="Enter NLU URN" onChange={onChangeTextInput} />
          <Form.Label>NLU Model URN</Form.Label>
        </Form.Group>
        <br/>
        <div className="row">
          <div className="col-8 text-center alert border-1 text-muted mt-0 pt-0 mb-2">
            <small className="text-center text-danger"><span role="img" aria-label="padlock" aria-labelledby="padlock">🔐</span> <span className="text-danger">***</span> Keep your Client Secret handy <em>(and safe and secure!)</em><br/> you need to provide it with every new browser session.</small>
          </div>
          <div className="col-4">
            <Button variant="primary" type="submit" className=" w-100">
              <span role="img" aria-label="floppy" aria-labelledby="floppy">💾</span> Save
            </Button>
          </div>
        </div>
      </Form>
    </main>
  )
}

export default class Profile extends BaseClass {

  constructor(){
    super()
    this.state = {
      clientId: '',
      clientSecret: '',
      simulateExperience: 'visualVA',
      modelUrn: 'urn:nuance-mix:tag:model/REPLACE_ME/mix.dialog',
      nluModelUrn: 'urn:nuance-mix:tag:model/REPLACE_ME/mix.nlu?=language=eng-USA',
      asrModelUrn: 'urn:nuance-mix:tag:model/REPLACE_ME/mix.asr?=language=eng-USA',
      channel: 'default',
      language: 'en-US',
      sessionTimeout: 900,
      sessionId: ''
    }
    this.onChangeTextInput = this.onChangeTextInput.bind(this)
    this.onChangeSelectInput = this.onChangeSelectInput.bind(this)
  }

  componentDidMount(){
    const params = this.initStateFromQueryParams([
      'clientId', 
      'clientSecret', 
      'modelUrn', 
      'nluModelUrn',
      'asrModelUrn',
      'channel', 
      'language', 
      'sessionTimeout',
      'sessionId',
      'simulateExperience',
    ]);
    if(Object.keys(params).length){
      this.setState(params)
    }
  }

  render(){
    return (
      <div className="h-100 min-vh-100">
        <Tabs fill defaultActiveKey="profile" 
              transition={false} 
              id="noanim-tab-example" 
              variant="pills" 
              className="justify-content-center"
              onSelect={this.handleTabSelection.bind(this)}>
          <Tab className="vh-100 min-vh-100 overflow-hidden" eventKey="profile" title={`Profile`}>
            <ProfileView 
              clientId={this.state.clientId} 
              clientSecret={this.state.clientSecret}
              modelUrn={this.state.modelUrn}
              nluModelUrn={this.state.nluModelUrn}
              asrModelUrn={this.state.asrModelUrn}
              onChangeTextInput={this.onChangeTextInput.bind(this)}
              onChangeSelectInput={this.onChangeSelectInput.bind(this)}
              channel={this.state.channel}
              language={this.state.language}
              sessionTimeout={this.state.sessionTimeout} 
              sessionId={this.state.sessionId}
              simulateExperience={this.state.simulateExperience}/>
          </Tab>
          <Tab eventKey="dlgaas" title={`DLGaaS`}></Tab>
          <Tab eventKey="asraas" title={`ASRaaS`}></Tab>
          <Tab eventKey="nluaas" title={`NLUaaS`}></Tab>
          <Tab eventKey="ttsaas" title={`TTSaaS`}></Tab>
        </Tabs>
      </div>
    )
  }

}
