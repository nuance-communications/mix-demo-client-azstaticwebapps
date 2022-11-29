/*
 * Copyright 2022-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React, { useState } from "react"

import moment from 'moment'
import loadable from '@loadable/component'
import Form from 'react-bootstrap/Form'

import { BaseClass, AuthForm } from "./shared"
import { LogEventsTable, LogEventsViz } from "./log"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong, faArrowRightLong, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

const ReactJson = loadable(() => import('react-json-view'))
const Button = loadable(() => import('react-bootstrap/Button'))
const Tabs = loadable(() => import('react-bootstrap/Tabs'))
const Tab = loadable(() => import('react-bootstrap/Tab'))
const TabContent = loadable(() => import('react-bootstrap/TabContent'))

//
// Log Events API
//

function LoggingTabs({logEvents, apiEvents}){
  const [key, setKey] = useState('table_log_events')
  return (
    <Tabs fill onSelect={(k) => setKey(k)}
      activeKey={key}
      transition={false}
      id="noanim-tab-example">
      <Tab className="h-100" eventKey="table_log_events" title={(<div>Log Events Table</div>)} disabled={logEvents.length === 0}>
        <TabContent className={"bg-light px-2 py-2 h-100 "}>
          { logEvents.length && key === 'table_log_events' ? (<LogEventsTable events={logEvents}/>) : ''}
        </TabContent>
      </Tab>
      <Tab eventKey="viz_log_events" title={(<div>Log Events Viz</div>)} disabled={logEvents.length === 0}>
        <TabContent className={"bg-light px-2 py-2 overflow-auto h-100 "}>
          {logEvents.length && key === 'viz_log_events' ? (<LogEventsViz events={logEvents}/>) : ''}
        </TabContent>
      </Tab>
      <Tab eventKey="raw_log_events" title={(<div>Log Events JSON <small className="badge bg-light text-secondary">{logEvents.length}</small></div>)} disabled={logEvents.length === 0}>
        <TabContent className={"bg-light px-2 py-2 overflow-auto h-75 "}>
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
        <TabContent className={"bg-light px-2 py-2 overflow-auto h-75 "}>
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

export default class LogEvents extends BaseClass {

  constructor(){
    super()
    this.state = {
      error: null,
      clientId: '',
      clientSecret: '',
      accessToken: null,
      rawResponses: [],
      rawEvents: [],
      tokenError: '',
      logConsumerGroup: null,
      logConsumerName: null,
      fetchRecordsTimeout: -1,
      fetchingLocation: false,
      filterSessionId: null
    }
    this.logTimer = -1
  }

  componentDidMount(){
    const params = this.initStateFromQueryParams([
      'clientId',
      'clientSecret',
    ])
    window.addEventListener('beforeunload', this.onUnmount, false)
    if(Object.keys(params).length){
      console.log('setting state')
      this.setState(params, this.init)
    }
  }

  componentDidUpdate(){
    if(this.state.filterSessionId === null){
      if(this.state.rawEvents.length > 0){
        const { sessionIds } = this.getSessionIdOptions()
        this.setState({
          filterSessionId: sessionIds[0]
        })
      }
    }
  }

  init(){}

  onUnmount = (e) => {
    try{
      if(this.state.logConsumerName){
        this.destroyConsumer()
      }
      this.stopCapturingLogs()
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
    console.info("[token acquired]")
    this.start()
  }

  // App

  async start() {
    // Attach a Log Consumer
    await this.startCapturingLogs()
    return true
  }

  async stop(ended) {
    this.stopCapturingLogs()
    return true
  }

  async restart() {
    // Restart the client.
    this.setState({
      rawEvents: [],
      error: null,
    })
    if(this.state.logConsumerName){
      await this.destroyConsumer()
    }
    this.stopCapturingLogs()
    return true
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

  getApiEvents(){
    const ret = this.state.rawEvents.filter(e => {
      if(e.value.source !== 'NIIEventLogger'){
        if(this.state.filterSessionId){
          return e.value.data.sessionid === this.state.filterSessionId
        }
        return true
      }
    })
    return ret
  }

  getLogEvents(){
    const ret = this.state.rawEvents.filter(e => {
      if(e.value.source === 'NIIEventLogger'){
        if(this.state.filterSessionId){
          return e.value.data.sessionid === this.state.filterSessionId
        }
        return true
      }
    })
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

  getScope(){
    return 'log'
  }

  shouldLimitRecordsToSession(){
    return false
  }

  getSessionIdOptions(){
    let ret = []
    let sessionIds = []
    this.state.rawEvents.forEach((evt, evtIdx) => {
      if(evt.key.service === 'DLGaaS'){
        if(evt.value.type === 'NIIEventLog'){
          const sessionId = evt.value.data.sessionid
          if(sessionIds.indexOf(sessionId) === -1){
            const html = <option value={sessionId}>{sessionIds.length+1}. {sessionId} <small>({moment(evt.value.timestamp).fromNow()})</small></option>
            if(ret.indexOf(html) === -1){
              ret.push(html)
              sessionIds.push(sessionId)                
            }
          }
        }
      }
    })
    return {
      html: ret,
      count: sessionIds.length,
      sessionIds: sessionIds
    }
  }

  filterPreviousSession(){
    const sessionIdOptions = this.getSessionIdOptions()
    const currentFilter = this.state.filterSessionId
    const sessionIds = sessionIdOptions.sessionIds
    const idx = sessionIds.indexOf(currentFilter)
    if(idx > 0){
      this.setState({
        filterSessionId: sessionIds[idx-1]
      })
    }
  }

  filterNextSession(){
    const sessionIdOptions = this.getSessionIdOptions()
    const currentFilter = this.state.filterSessionId
    const sessionIds = sessionIdOptions.sessionIds
    const idx = sessionIds.indexOf(currentFilter)
    const len = sessionIds.length
    if(idx+1 < len){
      this.setState({
        filterSessionId: sessionIds[idx+1]
      })
    }
  }

  getLogEventsHTML(){
    const logEvents = this.getLogEvents()
    const apiEvents = this.getApiEvents()
    const sessionIdOptions = this.getSessionIdOptions()
    const currentFilteredSessionIdIndex = sessionIdOptions.sessionIds.indexOf(this.state.filterSessionId)
    return (
      <div className="col px-5 h-100">
        <div className="row">
          <div className="col-3">
            <h3 className="fw-bold mt-3 mb-0">Observe Log Events</h3>
            <small>See <a href="https://docs.nuance.com/mix/apis/event_logs/" target="_blank">docs</a> for more.</small>
          </div>
          <div className="col-6">
            { sessionIdOptions.count > 0 ? (
              <div className="row">
                <div className="col-2 text-end">
                  <Button className="mt-4" 
                    variant={`light`} 
                    disabled={sessionIdOptions.count === 0 || currentFilteredSessionIdIndex === 0}
                    onClick={this.filterPreviousSession.bind(this)}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                  </Button>
                </div>
                <div className="col-8">
                  <div class="form-floating">
                    <Form.Control 
                      name="filterSessionId"
                      as="select" 
                      disabled={sessionIdOptions.count === 0}
                      placeholder="Session ID"
                      className="form-select mt-3 mb-2"
                      value={this.state.filterSessionId} 
                      onChange={this.onChangeSelectInput.bind(this)}>
                      {sessionIdOptions.html}
                    </Form.Control>
                    <Form.Label>Current DLGaaS Session from {sessionIdOptions.count}</Form.Label>
                  </div>
                </div>
                <div className="col-2 text-start">
                  <Button className="mt-4" variant={`light`} 
                    disabled={sessionIdOptions.count === 0 || currentFilteredSessionIdIndex === sessionIdOptions.count-1}
                    onClick={this.filterNextSession.bind(this)}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                  </Button>
                </div>
              </div>
            ) : ''}
          </div>
          <div className="col-3 text-end pt-2 pb-2">
            { this.state.logConsumerName ? (
                <Button className="text-dark btn-sm mt-3"
                  variant={`light`}
                  onClick={(evt) => {this.doFetchRecords(0); evt.preventDefault(); }}
                  disabled={this.state.fetchRecordsTimeout !== -1}>
                  {this.state.fetchRecordsTimeout !== -1 ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : ''}
                  {` `}
                  Fetch Log Events
                </Button>
              ) : (
                <Button className="text-dark btn-sm mt-3"
                  variant={`warning`}
                  onClick={(evt) => {this.start(); evt.preventDefault(); }}>
                  Restart Log Fetcher
                </Button>
              )}
            { this.state.logConsumerName ? (
              <button className="btn btn-danger btn-sm mt-3" onClick={(evt) => {this.stopCapturingLogs(); evt.preventDefault(); }}>Stop Auto Log Fetcher</button>
            ) : ('')}
          </div>
        </div>
        <div className="row h-100 mt-1">
          <div className={`col-12 h-100`}>
            <LoggingTabs
              logEvents={logEvents}
              apiEvents={apiEvents}
            />
          </div>
        </div>
      </div>
    )
  }

  render(){
    let hasToken = this.state.accessToken
    let body = hasToken ? 
        this.getLogEventsHTML() :
        this.getAuthHtml()
    let html = (<Tabs fill variant="pills"
      defaultActiveKey="logging" transition={false}
      id="noanim-tab-example"
      className="justify-content-center"
      onSelect={this.handleTabSelection.bind(this)}>
      <Tab eventKey="profile" title={`Profile`}></Tab>
      <Tab eventKey="dlgaas" title={`DLGaaS`}></Tab>
      <Tab eventKey="asraas" title={`ASRaaS`}></Tab>
      <Tab eventKey="nluaas" title={`NLUaaS`}></Tab>
      <Tab eventKey="ttsaas" title={`TTSaaS`}></Tab>
      <Tab eventKey="logging" title={`Log Events`} className="h-100">
        {body}
      </Tab>
    </Tabs>)
    return (
      <div className="logging row h-100">
        {html}
      </div>
    )
  }
}
