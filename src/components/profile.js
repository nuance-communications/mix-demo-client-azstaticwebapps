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

import { BaseClass } from "./shared"

const Tabs = loadable(() => import('react-bootstrap/Tabs'))
const Tab = loadable(() => import('react-bootstrap/Tab'))
const Button = loadable(() => import('react-bootstrap/Button'))

function ProfileView({clientId, clientSecret, modelUrn, language, sessionTimeout, channel, nluModelUrn, sessionId, onChangeTextInput}){

  const save = () => {
    let params = new URLSearchParams()
    params.set('clientId', clientId)
    params.set('clientSecret', clientSecret)
    params.set('modelUrn', modelUrn)
    params.set('language', language)
    params.set('sessionTimeout', sessionTimeout)
    params.set('channel', channel)
    params.set('nluModelUrn', nluModelUrn)
    params.set('sessionId', sessionId)
    window.location.search = params.toString()
  }

  return (
    <main className="px-2 py-2 mt-3">
      <Form onSubmit={evt => {
        evt.preventDefault()
        save()
      }}>
        <Form.Group className="form-floating">
          <Form.Control name="clientId" type="text" value={clientId} placeholder="Enter Client ID" onChange={onChangeTextInput}/>
          <Form.Label htmlFor="clientId">Client ID</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating">
          <Form.Control name="clientSecret" type="password" value={clientSecret} placeholder="Enter Client Secret" onChange={onChangeTextInput} />
          <Form.Label>Client Secret</Form.Label>
        </Form.Group>
        <hr/>
        <Form.Group className="form-floating">
          <Form.Control name="modelUrn" type="text" value={modelUrn} placeholder="Enter DLG URN" onChange={onChangeTextInput} />
          <Form.Label>DLG URN</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating">
          <Form.Control name="language" type="text" value={language} placeholder="Enter DLG Language" onChange={onChangeTextInput} />
          <Form.Label>DLG Language</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating">
          <Form.Control name="sessionTimeout" type="text" value={sessionTimeout} placeholder="Enter DLG Timeout in Seconds" onChange={onChangeTextInput} />
          <Form.Label>DLG Session Timeout</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating">
          <Form.Control name="channel" type="text" value={channel} placeholder="Enter DLG Channel" onChange={onChangeTextInput} />
          <Form.Label>DLG Channel</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating">
          <Form.Control name="sessionId" type="text" value={sessionId} placeholder="Enter DLG Session ID" onChange={onChangeTextInput} />
          <Form.Label>DLG Session ID <span className='text-muted'>(optional)</span></Form.Label>
        </Form.Group>
        <hr/>
        <Form.Group className="form-floating">
          <Form.Control name="nluModelUrn" type="text" value={nluModelUrn} placeholder="Enter NLU URN" onChange={onChangeTextInput} />
          <Form.Label>NLU URN</Form.Label>
        </Form.Group>
        <br/>
        <Button variant="primary" type="submit" className="float-end">
          <span role="img" aria-label="link" aria-labelledby="link">🔗</span> Set Current URL
        </Button>
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
      modelUrn: 'urn:nuance-mix:tag:model/REPLACE_ME/mix.dialog',
      nluModelUrn: 'urn:nuance-mix:tag:model/REPLACE_ME/mix.nlu?=language=eng-USA',
      channel: 'default',
      language: 'en-US',
      sessionTimeout: 900,
      sessionId: ''
    }
    this.onChangeTextInput = this.onChangeTextInput.bind(this)
  }

  componentDidMount(){
    const params = this.initStateFromQueryParams([
      'clientId', 
      'clientSecret', 
      'modelUrn', 
      'nluModelUrn',
      'channel', 
      'language', 
      'sessionTimeout',
      'sessionId',
    ]);
    if(Object.keys(params).length){
      this.setState(params)
    }
  }

  render(){
    return (
      <div className="col-md-6 offset-md-3">
        <Tabs defaultActiveKey="profile" 
              transition={false} 
              id="noanim-tab-example" 
              variant="pills" 
              className="justify-content-center"
              onSelect={this.handleTabSelection.bind(this)}>
          <Tab eventKey="profile" title={`Profile`}>
            <ProfileView 
              clientId={this.state.clientId} 
              clientSecret={this.state.clientSecret}
              modelUrn={this.state.modelUrn}
              nluModelUrn={this.state.nluModelUrn}
              onChangeTextInput={this.onChangeTextInput.bind(this)}
              channel={this.state.channel}
              language={this.state.language}
              sessionTimeout={this.state.sessionTimeout} 
              sessionId={this.state.sessionId}/>
          </Tab>
          <Tab eventKey="dlgaas" title={`DLGaaS`}></Tab>
          <Tab eventKey="nluaas" title={`NLUaaS`}></Tab>
          <Tab eventKey="ttsaas" title={`TTSaaS`}></Tab>
        </Tabs>
      </div>
    )
  }

}
