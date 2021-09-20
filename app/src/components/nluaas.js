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

import { BaseClass, AuthForm, CLIENT_DATA, ROOT_URL } from "./shared"

const ReactJson = loadable(() => import('react-json-view'))
const Tabs = loadable(() => import('react-bootstrap/Tabs'))
const Tab = loadable(() => import('react-bootstrap/Tab'))
const TabContent = loadable(() => import('react-bootstrap/TabContent'))

const ProcessingState = {
  IDLE: 1,
  IN_FLIGHT: 2,
}

//
// NLUaaS
//

function getConfidenceClass(conf){
  if(conf >= 0.8){
    return 'success'
  } else if(conf >= 0.5){
    return 'warning'
  } else {
    return 'danger'
  }
}

function process(literal, entities, ret, depth){
  Object.keys(entities).forEach(entity => {
    const e = entities[entity]
    e.entities.forEach(_e => {
      const {startIndex, endIndex} = _e.textRange
      const _eEntities = _e.entities
      let children = []
      const hasChildren = Object.keys(_eEntities).length
      if(hasChildren){
        process(literal, _eEntities, children, depth+1)
      }
      const confClz = getConfidenceClass(_e.confidence)
      ret.push(
        <div className="badge lh-lg align-top" key={'nlu-tree-'+depth+'-'+entity}>
          <div className="bg-light text-dark">
            {/*{depth !== 0 ? (<span className={`d-block lh-sm fs-`+(depth+2)}>↑</span>) : ('')}*/}
            <strong>"{literal.substring(startIndex, endIndex)}"</strong>
            <br/>
            <span className={`badge text-dark border border-`+confClz}>{entity}</span>
            <span className={`badge text-white border bg-` + confClz}>{_e.confidence}</span>
            <br/>
            {(_e.structValue || _e.stringValue) ? (
                <span className="badge bg-light border text-success text-wrap d-block" style={{'maxWidth': '150px', 'textAlign': _e.structValue ? 'left' : 'center'}}>{_e.structValue ? JSON.stringify(_e.structValue, undefined, 2) : _e.stringValue}</span>
              ) : (
                hasChildren ? (<span className="badge bg-light text-dark"></span>) : (<span className="badge bg-danger text-white">x</span>)
              )
            }
          </div>
          <div className="bg-light text-secondary">
            {children}
          </div>
        </div>
      )
    })
  })
}

function InterpretationTree({rootNode, literal, parseType}){
  const ret = []
  if(parseType === 'SINGLE_INTENT'){
    const entities = rootNode.entities
    process(literal, entities, ret, 0)
  } else if (parseType === 'MULTI_INTENT'){

  }
  return (<div className="bg-light" key={literal}><div className="text-dark">{ret}</div></div>)
}

function NluTabs({apiEvents, interpretations, rawResponses, inlineWordset, onUpdateInlineWordset}){
  const [key, setKey] = useState('rendered_payload')
  return (
    <Tabs onSelect={(k) => setKey(k)}
      activeKey={key}
      transition={false} 
      id="noanim-tab-example">
      <Tab eventKey="inline_wordset_payload" title={(<div>Inline Wordsets</div>)}>
        <TabContent className="bg-light px-2 py-2">
          { key === 'inline_wordset_payload' ? (<div className=""><p><small>
            <span role="img" aria-label="notice" aria-labelledby="warning">⚠️</span> Wordsets are automatically saved in local storage for convenience. Please ensure valid JSON.
            </small></p><ReactJson 
              className="mb-2"
              key={'inline-wordset-json'}
              src={inlineWordset} 
              displayDataTypes={false}
              iconStyle={'circle'}
              indentWidth={2}
              name={false}
              collapseStringsAfterLength={50}
              displayObjectSize={true}
              collapsed={5}
              displayArrayKey={false}
              theme={'grayscale:inverted'}
              onEdit={(edit) => { onUpdateInlineWordset(edit.updated_src) }}
              onAdd={(add) => { onUpdateInlineWordset(add.updated_src) }}
              onDelete={(del) => { onUpdateInlineWordset(del.updated_src) }} 
            /></div>) : '' }
        </TabContent>
      </Tab>
      <Tab eventKey="rendered_payload" title={(<div>Interpretations</div>)}>
        <TabContent className="bg-light px-2 py-2">
          { key === 'rendered_payload' ? interpretations : ''}
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

export default class NLUaaS extends BaseClass {

  constructor(){
    super()
    this.state = {
      error: '',
      clientId: '',
      clientSecret: '',
      nluModelUrn: 'urn:nuance-mix:tag:model/REPLACE_ME/mix.nlu?=language=eng-USA',
      contextTag: 'REPLACE_ME',
      accessToken: null,
      rawResponses: [],
      rawEvents: [],
      tokenError: '',
      textInput: '',
      logConsumerGroup: null,
      logConsumerName: null,
      interpretationResultType: 'SINGLE_INTENT',
      interpretationInputLoggingMode: 'PLAINTEXT',
      maxInterpretations: 10,
      inlineWordset: {},
      activeInterpretations: [],
      fetchRecordsTimeout: -1,
      processing: ProcessingState.IDLE,
    }
    this.toggleInterpretation = this.toggleInterpretation.bind(this)
  }

  componentDidMount(){
    const toUpdate = this.initStateFromQueryParams([
      'clientId', 
      'clientSecret',
      'nluModelUrn',
    ])
    if(toUpdate.nluModelUrn){
      toUpdate.contextTag = this.parseContextTag(toUpdate.nluModelUrn)
    }
    if(Object.keys(toUpdate).length){
      this.setState(toUpdate)
    }
    window.addEventListener('beforeunload', this.onUnmount, false)
    this.initInlineWordsets()
  }

  onUnmount = (e) => {
    try{
      this.saveInlineWordsetsToLocalStorage()
      if(this.state.logConsumerName){
        this.destroyConsumer()
      }
    } catch(ex) {
      console.warn(ex)
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnmount.bind(this), false)
    this.onUnmount()
  }

  // NLUaaS

  async interpret(rawPayload) {
    // Second, the Session is Started
    await this.ensureTokenNotExpired()
    return await this.request(`${ROOT_URL}/api/nluaas-interpret`, {
      token: this.state.accessToken, 
      rawPayload: rawPayload
    })
  }

  async executeTextInput(){
    const payload = {
      input: {
        text: this.state.textInput,
      },
      model: {
        type: 'SEMANTIC_MODEL',
        uri: this.state.nluModelUrn,
      },
      parameters: {
        interpretationResultType: this.state.interpretationResultType,
        interpretationInputLoggingMode: this.state.interpretationInputLoggingMode,
        maxInterpretations: this.state.maxInterpretations,
      },
      resources: {
        inlineWordset: JSON.stringify(this.state.inlineWordset),
      },
      client_data: CLIENT_DATA,
    }
    let rawResponses = this.state.rawResponses || [];
    rawResponses.unshift({
      request: payload,
    })
    this.setState({
      processing: ProcessingState.IN_FLIGHT
    })
    let res = await this.interpret(payload)
    // console.log(res)
    if(res.error){
      this.setState({
        error: res.error,
        processing: ProcessingState.IDLE,
      })
    } else {
      rawResponses.unshift(res);
      this.setState({
        rawResponses: rawResponses,
        activeInterpretations: [res],
        error: null,
        processing: ProcessingState.IDLE,
      })
    }
  }

  initInlineWordsets(){
    const inlineWordsetsLocalStorage = window.localStorage.getItem('inlineWordset');
    if(inlineWordsetsLocalStorage){
      try{
        this.setState({
          inlineWordset: JSON.parse(inlineWordsetsLocalStorage)
        })
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  saveInlineWordsetsToLocalStorage(){
    window.localStorage.setItem('inlineWordset', JSON.stringify(this.state.inlineWordset));
  }

  onUpdateInlineWordset(inlineWordset){
    this.setState({ inlineWordset })
    this.saveInlineWordsetsToLocalStorage()
  }

  getApiEvents(){
    return this.state.rawEvents
  }

  getAuthHtml(){
    return (
      <div className="col-md-6 offset-md-3">
        <Tabs defaultActiveKey="nluaas" transition={false} 
          id="noanim-tab-example" 
          variant="pills"
          className="justify-content-center"
          onSelect={this.handleTabSelection.bind(this)}>
          <Tab eventKey="profile" title={`Profile`}></Tab>
          <Tab eventKey="dlgaas" title={`DLGaaS`}></Tab>
          <Tab eventKey="nluaas" title="NLUaaS">
            <AuthForm tokenError={this.state.tokenError}
                initToken={this.initToken.bind(this)}
                clientId={this.state.clientId}
                clientSecret={this.state.clientSecret}
                onChangeTextInput={this.onChangeTextInput.bind(this)}
                serviceScope="nlu log" />
          </Tab>
          <Tab eventKey="ttsaas" title={`TTSaaS`}></Tab>
        </Tabs>
      </div>
    );
  }

  // NLUaaS Parsing

  renderInterpretationChildren(child, idx){
    let ret = []
    const e = child.entity
    if(e){
      const tree = []
      e.children.forEach(child => {
        tree.push(this.renderInterpretationChildren(child, idx+1))
      })
      ret.push(
        <ul className={`pl-${idx+1}`} key={`interp-${e.name}-${idx}`}>
          <li>
            <span className='badge bg-light text-dark'>{e.textRange.startIndex}->{e.textRange.endIndex}</span>
            <span className='badge bg-info text-white'>{e.name}</span>
            <span className='float-end badge bg-light text-dark'>confidence={e.confidence}</span>
            <span className='badge bg-dark text-white'>{e.literal}</span>
            <span className='badge bg-light text-dark'>value={JSON.stringify(e.structValue || e.stringValue)}</span>
            <br/>
            {tree}
          </li>
        </ul>
      )
    }
    return ret
  }

  renderMultiInterpretation(intent){
    const tree = []
    intent.children.forEach(child => {
      tree.push(this.renderInterpretationChildren(child, 0))
    })
    return (
      <div className="card mb-2">
        <div className="card-header bg-dark text-white">
          <strong>{intent.name}</strong>
          <span className={`float-end badge bg-`+(intent.confidence > 0.8 ? 'success' : intent.confidence > 0.5 ? 'warning' : 'dark')}>{intent.confidence}</span>
        </div>
        { tree.length ? (<div className="card-body">
          {tree}
        </div>) : '' }
        {/*<div className="card-footer">{intent.literal}</div>*/}
      </div>
    )
  }

  renderSingleInterpretationEntities(entityName, entities, idx){
    const ret = []
    entities.forEach((e, i) => {
      const tree = []
      Object.keys(e.entities).forEach((subEnt) => {
        tree.push(this.renderSingleInterpretationEntities(subEnt, e.entities[subEnt].entities, idx+1))        
      })
      ret.push(
        <ul className={``} key={`interp-${entityName}-${idx}-${i}`}>
          <li>
              <span className='badge bg-light text-dark'>{e.textRange.startIndex}->{e.textRange.endIndex}</span>
              <span className='badge bg-primary text-white'>{entityName}</span>
              <span className={`float-end badge bg-`+(e.confidence > 0.8 ? 'success' : e.confidence > 0.5 ? 'warning' : 'dark')}>confidence={e.confidence}</span>
              <span className='badge bg-dark text-white'>{e.literal}</span>
              <span className={`badge bg-light text-dark`}>{JSON.stringify(e.structValue || e.stringValue)}</span>
              <br/>
              {tree}
          </li>
        </ul>
      )
    })
    return ret
  }

  renderSingleInterpretation(root, literal, index){
    // const tree = []
    // Object.keys(root.entities).forEach(e => {
    //   tree.push(this.renderSingleInterpretationEntities(e, root.entities[e].entities, 0))
    // })
    return (
      <div className="card" key={'single-interp-'+index}>
        <div className="card-header bg-dark text-white">
          <strong>{root.intent}</strong>
          <span className={`float-end badge bg-`+(root.confidence > 0.8 ? 'success' : root.confidence > 0.5 ? 'warning' : 'dark')}>{root.confidence}</span>
        </div>
        { Object.keys(root.entities).length ? (<div className="card-body text-center">
          <InterpretationTree 
            rootNode={root} 
            literal={literal} 
            parseType={this.state.interpretationResultType}
          />
        </div>) : '' }
        {/*{ tree.length ? (<div className="card-footer">{tree}</div>) : '' }*/}
      </div>
    )
  }

  // Render Results

  toggleInterpretation(res, evt){
    let newInterps = this.state.activeInterpretations
    if(newInterps.indexOf(res) === -1){
      newInterps.push(res)
    } else {
      newInterps = newInterps.filter(i => i !== res)
    }
    this.setState({
      activeInterpretations: newInterps
    })
    evt.preventDefault()
  }

  renderResult(res, isActive){
    let result = res.response.payload.result
    let interpretations = []
    result.interpretations.forEach((interp, idx) => {
      let root = null
      let ret = null
      if(this.state.interpretationResultType === 'MULTI_INTENT'){
        root = interp.multiIntentInterpretation.root  
        ret = this.renderMultiInterpretation(root.intent, result.literal, idx)
      } else {
        root = interp.singleIntentInterpretation
        ret = this.renderSingleInterpretation(root, result.literal, idx)
      }
      interpretations.push(ret)
    })
    return (
      <div className="card border-0 bg-light" key={'result-'+result.literal}>
        <h5 className="card-header fw-bold bg-light">
          {result.literal}
          <Button variant={`link`} className="float-end badge" onClick={evt => this.toggleInterpretation(res, evt)}>
            <small className={`badge text-decoration-none text-primary `+ (isActive?'bg-secondary text-white':'bg-white')}>
              {isActive ? 'hide' : 'show'}
            </small>
          </Button>
        </h5>
        <div className={`card-body ` + (isActive ? '' : 'd-none')}>
          {interpretations}
        </div>
      </div>
    )
  }

  getInterpretations(){
    let results = []
    this.state.rawResponses.forEach(res => {
      if(res.response){
        if(res.response.payload.status.code === 200){
          if(res.response.payload.result){
            let isActive = this.state.activeInterpretations.indexOf(res) > -1
            results.push(
              this.renderResult(res, isActive)
            )
          }
        }
      }
    })
    return results
  }

  getInterpretHtml(){
    const apiEvents = this.getApiEvents()
    const interpretations = this.getInterpretations()
    return (
      <div className="col">
        <div className="row">
          <div className="col-12 mb-3">
            {/*<span className="badge bg-light text-dark mb-3 float-end">Token Expiry {moment(this.state.accessToken.expires_at*1000).fromNow()}</span>*/}
            <h3 className="fw-bold">Natural Language Understanding</h3>
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
                  <Form.Group style={{'height': '50px', 'width': '75%'}} className="form-floating">
                    <Form.Control name="textInput" type="text" value={this.state.textInput} placeholder="Start typing here..." onChange={this.onChangeTextInput.bind(this)}/>
                    <Form.Label htmlFor="textInput">Text to Interpret</Form.Label>
                  </Form.Group>
                  <Form.Group style={{'width': '15%'}} className="form-floating">
                    <Form.Control name="contextTag" type="text" value={this.state.contextTag} placeholder="A1_C1" onChange={this.onChangeTextInput.bind(this)}/>
                    <Form.Label htmlFor="contextTag">Context Tag</Form.Label>
                  </Form.Group>
                  <button disabled={this.state.textInput.length === 0 || this.state.processing === ProcessingState.IN_FLIGHT} className="btn btn-secondary" 
                    type="submit" style={{'width': '10%'}}>Interpret</button>
                </div>
                { this.state.error ? (
                  <div className="badge bg-danger text-white w-100 text-wrap mt-2">
                    {JSON.stringify(this.state.error.response.data.error)}
                  </div>
                ) : ('') }
              </form>
            </div>
          </div>
          <div className="col-3 text-right">
            { this.state.logConsumerName ? (
                <Button className="btn btn-secondary text-white mt-3" 
                  onClick={(evt) => {this.doFetchRecords(0); evt.preventDefault(); }}
                  disabled={this.state.fetchRecordsTimeout !== -1}>
                  Fetch Log Events{` `}
                  {this.state.fetchRecordsTimeout !== -1 ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : ''}
                </Button>
              ) : ('')}
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-12 mt-3">
            <NluTabs 
              inlineWordset={this.state.inlineWordset}
              onUpdateInlineWordset={this.onUpdateInlineWordset.bind(this)}
              apiEvents={apiEvents} 
              interpretations={interpretations}
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
          this.getInterpretHtml() : 
          this.getAuthHtml() 
        }
      </div>
    )
  }
}
