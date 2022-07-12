/*
 * Copyright 2022-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React, { useState } from "react"

import loadable from '@loadable/component'

import Card from "react-bootstrap/Card"
// import Alert from "react-bootstrap/Alert"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'

import { 
  BaseClass,
  AuthForm,
  LANGUAGES,
  ASR_SERVICE_URL 
} from "./shared"

import { MicrophoneAudioSource } from "../lib/audio"
import { AudioVisualizer } from "../lib/visualizer"
import { 
  AsrController, 
  AsrRequest, 
  AsrResponse, 
  AsrResponseType 
} from "../lib/asr"

const ReactJson = loadable(() => import('react-json-view'))
const Tabs = loadable(() => import('react-bootstrap/Tabs'))
const Tab = loadable(() => import('react-bootstrap/Tab'))
const Alert = loadable(() => import('react-bootstrap/Alert'))

const Table = loadable(() => import('react-bootstrap/Table'))
const TabContent = loadable(() => import('react-bootstrap/TabContent'))

const ProcessingState = {
  DISCONNECTED: 0, 
  IDLE: 1, // PENDING
  IN_FLIGHT: 2, // LISTENING
  AWAITING_FINAL: 3,
  INITIALIZING: 4
}

//
// ASRaaS
//

function getConfLevelClz(confidence){
  let confLevel = "text-dark"
  let conf = confidence * 1000;
  if(conf > 800){
    confLevel = 'text-success';
  } else if (conf > 600){
    confLevel = 'text-warning';
  } else {
    confLevel = 'text-danger';
  }
  return confLevel
}

function RecoRequestView({request, error}){
  if(!request){
    return (<div className="text-center" style={{'minHeight': '500px', 'paddingTop': '225px'}}><p className="text-muted align-middle">Please record speech sample for analysis.</p></div>)
  }
  const getAsrTokensRendered = (hyp) => {
    let confLevel = undefined
    let words = []
    // console.log(hyp.wordsList)
    if(!hyp || !hyp.wordsList){
      return words
    }
    hyp.wordsList.forEach((word, idx) => {
      let conf = word.confidence * 1000;
      if(conf > 800){
        confLevel = 'highConf';
      } else if (conf > 600){
        confLevel = 'medConf';
      } else {
        confLevel = 'lowConf';
      }
      words.push(
        <span key={request.getId()+'word'+word.text+'-'+idx} className={"asrWord pr-2 " + confLevel}
          data-confidence={isNaN(conf) ? '' : conf.toFixed(0)} 
          data-startms={word.startMs}
          data-endms={word.endMs}>
          {word.text}
        </span>
      )
    })
    return words;
  }
  const renderPotentialTranscriptions = (hypotheses) => {
    let ret = []
    hypotheses.forEach((hyp, idx) => {
      ret.push(
        <tr key={request.getId()+'pt-'+idx} className="">
          <td className="align-middle">
            {getAsrTokensRendered(hyp)}
          </td>
          <td className="align-middle">
            <span className={"badge bg-light "+ getConfLevelClz(hyp.confidence)}>{hyp.confidence ? hyp.confidence.toFixed(3) : ''}</span>
          </td>
          <td className="align-middle">
            <span className={"badge bg-light "+ getConfLevelClz(hyp.averageConfidence)}>{hyp.averageConfidence ? hyp.averageConfidence.toFixed(3) : ''}</span>
          </td>
        </tr>
      )
    })
    if(ret.length === 0){
      return ''
    }
    return ret
  }
  let hypotheses = []
  let partialResults = []
  let finalResult = undefined
  if(request.getFinalResult()){
    finalResult = (
      <dd key={'result-'+request.getId()} className="pt-2 pb-2">
        {request.getTranscriptionText()}
        <ReactJson src={request.getFinalResult()}
          name={'finalResult'}
          displayDataTypes={false}
          iconStyle={'square'}
          indentWidth={2}
          collapsed={true}
          displayObjectSize={false}
          />
      </dd>
    )
  }
  if(request.getPartialResults().length) {
    request.getPartialResults().forEach((r, idx) => {
      hypotheses = []
      r.hypothesesList.forEach((hyp, idx2) => {
        hypotheses.push(
          <span key={'hyp-formatted-text-'+idx+'-'+idx2}>
            {hyp.formattedText}<br/>
            <small className="text-muted">{hyp.minimallyFormattedText}</small>
          </span>
        )
      })
      partialResults.push(
        <li key={'result-'+idx} className="pt-2 pb-2">
          {hypotheses}
          <ReactJson src={r}
            displayDataTypes={false}
            iconStyle={'square'}
            indentWidth={2}
            collapsed={true}
            displayObjectSize={false}
            />
        </li>
      )
    })
  }
  return (
    <Card className="asr vh-100 min-vh-100 overflow-hidden">
      <div className="card-body pl-0 pr-0 vh-100 min-vh-100">
        <Alert className="bg-light text-center">
          {(request.wasSuccess() && !error) ? (
            <div className="row">
              <div className="col-12">
                <strong className="fs-5">{getAsrTokensRendered(request.getTranscriptionHyp())}</strong>
                <br/>
                <small>
                  <small className="text-muted fst-italic">{request.getTranscriptionMffText()}</small>
                </small>
              </div>
            </div>
          ) : ('')}
          { error ? (
            <div className="badge bg-danger text-white w-100 pt-5 pb-5 text-wrap">
              <pre className="h5">{error.code} {error.message}</pre>
            </div>
          ) : ('') }
        </Alert>
        {request.wasSuccess() && request.getDatapack().language && !error ? (
          <Card className="bg-light text-dark border-0 px-4 py-4 vh-100 min-vh-100 overflow-auto">
            <dl className="pl-4 pr-4 h-50 min-vh-50 overflow-auto">
              <dt className="mb-3">
                  <div className="float-end text-end">
                    <span className="badge bg-light text-dark">
                      language: {request.getDatapack().language}
                    </span>
                    <span className="badge bg-light text-dark">
                      topic: {request.getDatapack().topic}
                    </span> &nbsp;
                    <span className="badge bg-light text-dark">
                      version: {request.getDatapack().version}
                    </span> &nbsp;
                    <span className="badge bg-light text-secondary">
                      id: {request.getDatapack().id}
                    </span> &nbsp;
                    <span className="badge bg-light text-primary">
                      {request.getUttInfo().durationMs}ms
                    </span>
                  </div>
                  <h5>Results</h5>
              </dt>
              {request.getPotentialTranscriptions().length ? (
                <Table className="transcriptions table-borderless ml-3 mt-2" size="sm">
                  <thead className="table-secondary">
                    <tr>
                      <th className="rounded-left">Transcript</th>
                      <th>Score</th>
                      <th className="rounded-right">Average</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    { 
                      renderPotentialTranscriptions(
                        request.getPotentialTranscriptions()
                      ) 
                    } 
                  </tbody>
                </Table>
              ) : ('')}
              { finalResult ? (<dt><h5>Final Result</h5></dt>) : '' }
              <ol>{ finalResult }</ol>
              { partialResults ? (<dt><h5>Partial Hypotheses</h5></dt>) : '' }
              <ol>{ partialResults }</ol>
            </dl>
          </Card>
        ) : ('')}
      </div>
    </Card>
  )
}

function AsrTabs({asrRequests, rawResponses, useDLM, inlineWordset, onUpdateInlineWordset, onStubInlineWordset, error}){
  const [key, setKey] = useState('live_mic')
  let rawReqHtml = []
  asrRequests.slice().reverse().forEach(req => {
    rawReqHtml.push(
      <tr>
        <td className="align-middle"><span className="badge bg-light text-dark">{moment(req.getId()).format()}</span></td>
        <td className="align-middle">
          <span className="badge bg-light text-dark">
            {req.getDatapack().language}
          </span>
        </td>
        <td className="align-middle">
          <span className="badge bg-light text-dark">
            {req.getDatapack().topic}&nbsp;
            {req.getDatapack().version}
          </span>
        </td>
        <td className="align-middle">{req.getTranscriptionText()}<br/><small className="text-muted">{req.getTranscriptionMffText()}</small></td>
        <td className="align-middle"><span className={"badge bg-light " + getConfLevelClz(req.getTranscriptionScore())}>{req.getTranscriptionScore()}</span></td>
        <td className="align-middle"><span className="badge bg-light text-dark">{req.getDuration()}</span></td>
        <td className="align-middle"><ReactJson groupArraysAfterLength={1} collapsed={0} src={req.getFinalResult()} /></td>
      </tr>
    )
  })
  let rawResponsesHTML = (
    <div className="card">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Lang</th>
              <th>Datapack</th>
              <th>Transcription</th>
              <th>Score</th>
              <th>Duration (ms)</th>
              <th>Final Result</th>
            </tr>
          </thead>
          <tbody>
            {rawReqHtml}
          </tbody>
        </table>
      </div>
    </div>)
  return (
    <Tabs fill onSelect={(k) => setKey(k)}
      activeKey={key}
      transition={false} 
      id="noanim-tab-example">
      <Tab className="vh-100 min-vh-100" disabled={!useDLM} eventKey="inline_wordset_payload" title={(<div>Inline Wordsets</div>)}>
        <TabContent className="bg-light px-2 py-2 h-75 overflow-auto">
          { key === 'inline_wordset_payload' ? (<div className="h-100 overflow-auto"><p><small>
            <span role="img" aria-label="notice" aria-labelledby="warning">⚠️</span> Wordsets are automatically saved in local storage for convenience. Please ensure valid JSON.
            </small><button className="btn btn-sm btn-outline-primary float-end" onClick={onStubInlineWordset}>Stub Wordset</button></p>
            <ReactJson 
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
      <Tab className="vh-100 min-vh-100" eventKey="live_mic" title={(<div>Recognize using a Live Microphone</div>)}>
        <TabContent className="bg-light px-2 py-2 h-100 overflow-hidden">
          { key === 'live_mic' ? (
            <div className="px-3 py-3 overflow-auto">
              <RecoRequestView request={asrRequests[asrRequests.length-1]} error={error}/>
            </div>
          ) : ''}
        </TabContent>
      </Tab>
      <Tab className="vh-100 min-vh-100" eventKey="all_reqs" title={(<div>All Requests</div>)}>
        <TabContent className="bg-light px-2 py-2 h-75 overflow-auto">
          { key === 'all_reqs' ? (
            <div className="px-3 py-3 h-75 overflow-auto">
              {rawResponsesHTML}
            </div>
          ) : ''}
        </TabContent>
      </Tab>
      <Tab className="vh-100 min-vh-100" eventKey="raw_payloads" title={(<div>Payloads <small className="badge bg-light text-secondary">{rawResponses.length}</small></div>)}>
        <TabContent className="bg-light px-2 py-2 h-75 overflow-hidden">
          { key === 'raw_payloads' ? (
            <div className="col-12 h-75 overflow-auto">
              <ReactJson 
                className="mb-2"
                key={'raw-json-' + rawResponses.length}
                src={rawResponses} 
                displayDataTypes={false}
                iconStyle={'circle'}
                indentWidth={2}
                name={false}
                groupArraysAfterLength={5}
                collapseStringsAfterLength={50}
                displayObjectSize={true}
                collapsed={5}
                displayArrayKey={false}
              />
            </div>
          ) : ('')}
        </TabContent>
      </Tab>
    </Tabs>
  )
}

export default class ASRaaS extends BaseClass {

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
      processing: ProcessingState.DISCONNECTED,
      language: 'eng-USA',
      topic: 'GEN',
      utteranceDetectionMode: 0, // 0 = 'SINGLE'; 1 = 'MULTIPLE',
      resultType: 1, // 'PARTIAL',
      autoPunctuate: true,
      maskLoadFailures: false,
      filterProfanity: true,
      includeTokenization: false,
      suppressCallRecording: false,
      suppressInitialCapitalization: false,
      maxHypotheses: 0,
      noInputTimeoutMs: 0,
      recognitionTimeoutMs: 0,
      speechDetectionSensitivity: null,
      utteranceEndSilenceMs: 0,
      inlineWordset: {},
      useDLM: false,
      asrModelUrn: '',
      userId: 'demo-client-test-user',
      raw: [],
      microphone: null
    }
    this._micAudioSource = null
    this._asrController = null
    this._asrRequests = []
  }

  componentDidMount(){
    const toUpdate = this.initStateFromQueryParams([
      'clientId', 
      'clientSecret',
      'asrModelUrn',
    ])
    if(Object.keys(toUpdate).length){
      this.setState(toUpdate)
    }
    window.addEventListener('beforeunload', this.onUnmount, false)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnmount.bind(this), false)
    this.onUnmount()
  }

  initAudioIn(){
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

  initAsr(){
    const viewController = this
    this._asrController = new AsrController(ASR_SERVICE_URL, async function (){
      await viewController.ensureTokenNotExpired()
      return viewController.state.accessToken
    })
    this._asrController.on('started', () => {
      console.log('Recognition request initiated. Audio attached.')
      this.setState({
        error: false,
        processing: ProcessingState.INITIALIZING // REVISIT
      })
    })
    this._asrController.on('start', () => {
      console.log('ASRaaS has acknowledged the request, and audio is being streamed.')
      this.setState({
        processing: ProcessingState.IN_FLIGHT // REVISIT
      })
    })
    this._asrController.on('result', (data, err) => {
      let updateState = false
      let response = new AsrResponse(data)
      this.state.rawResponses.unshift(response.raw)
      console.log("ASRaaS has returned a result", response)
      switch(response.getType()){
        case AsrResponseType.PARTIAL:
          this.storePartialResult(response.raw)
          updateState = true
          break
        case AsrResponseType.FINAL:
          this.storeFinalResult(response.raw)
          updateState = true
          // Final result -> stop the request
          this._asrController.stop()
          break
        default:
          break
      }
      if(updateState){
        this.setState({
          rawResponses: this.state.rawResponses
        })
      }
    })
    this._asrController.on('finish', () => {
      this.setState({
        processing: ProcessingState.IDLE
      })
    })
    this._asrController.on('end', (data) => {
      console.log('Recognition request has completed', data)
      this.getLatestAsrRequest().raw_audio = data
      this.setState({
        processing: ProcessingState.IDLE
      })
    })
    this._asrController.on('stopped', (data, err) => {
      console.log('Recognition request stopped.', data, err)
      this.setState({
        processing: ProcessingState.AWAITING_FINAL
      })
    })
    this._asrController.on('error', (err) => {
      console.error('ASR error.', err)
      this.setState({
        error: err,
        processing: ProcessingState.IDLE
      })
    })
    console.log("ASR initialized.")
    return this._asrController
  }

  getScope(){
    return 'asr'
  }

  getLatestAsrRequest(){
    if(this._asrRequests.length < 1){
      return null
    }
    return this._asrRequests[this._asrRequests.length -1]
  }

  storePartialResult(res){
    let asrReq = this.getLatestAsrRequest()
    if(asrReq){
      asrReq.addPartialResult(res)
    }
  }

  storeFinalResult(res){
    let asrReq = this.getLatestAsrRequest()
    if(asrReq){
      asrReq.setFinalResult(res)
    }
  }

  toggleRecognition(){
    switch(this.state.processing){
      case ProcessingState.DISCONNECTED:
      case ProcessingState.IDLE:
        this.startRecognizing()
        break
      default:
        this.stopRecognizing()
        break
    }
  }

  startRecognizing(){
    if(!this._micAudioSource){
      console.warn('No microphone.')
      return
    }
    this._micAudioSource.init().then(() => {
      let req = new AsrRequest({
        id: moment.now(),
        language: this.state.language,
        topic: this.state.topic,
        utteranceDetectionMode: this.state.utteranceDetectionMode,
        resultType: this.state.resultType,
        autoPunctuate: this.state.autoPunctuate,
        maskLoadFailures: this.state.maskLoadFailures,
        filterProfanity: this.state.filterProfanity,
        includeTokenization: this.state.includeTokenization,
        suppressCallRecording: this.state.suppressCallRecording,
        suppressInitialCapitalization: this.state.suppressInitialCapitalization,
        maxHypotheses: this.state.maxHypotheses,
        noInputTimeoutMs: this.state.noInputTimeoutMs,
        recognitionTimeoutMs: this.state.recognitionTimeoutMs,
        speechDetectionSensitivity: this.state.speechDetectionSensitivity,
        utteranceEndSilenceMs: this.state.utteranceEndSilenceMs,
        inlineWordset: this.state.inlineWordset,
        dlmUrn: this.state.useDLM ? this.state.asrModelUrn : null,
        userId: this.state.userId
      })
      this._asrRequests.push(req)
      this._asrController.setAudioSource(this._micAudioSource)
      this._asrController.startRecognizing(req).then(() => {
        this.setState({
          processing: ProcessingState.IN_FLIGHT
        })
      })
    }).catch(() => {
      alert("unable to successfully start mic for recording!!!")
    })
  }

  stopRecognizing(){
    if(this._asrController){
      this._asrController.stop()
    }
  }

  stopMic(){
    if(this._micAudioSource){
      this._micAudioSource.dispose()
      this._micAudioSource = undefined
    }
    this.setState({
      microphone: null
    })
  }

  onUnmount = (e) => {
    if(this._asrController){
      this._asrController.dispose()
    }
    this.stopMic()
    return null;
  }

  async onTokenAcquired() { 
    let audioIn = this.initAudioIn() // mic-based
    let controller = this.initAsr()
    audioIn.init().then(() => {
      // start mic & feed controller
      controller.setAudioSource(this._micAudioSource)
    })
  }

  getAuthHtml(){
    return (
      <AuthForm tokenError={this.state.tokenError}
          initToken={this.initToken.bind(this)}
          clientId={this.state.clientId}
          clientSecret={this.state.clientSecret}
          onChangeTextInput={this.onChangeTextInput.bind(this)}
          serviceScope="asr" />
    )
  }

  getLanguageOptions(){
    let langOptions = []
    let lastLangs = []
    LANGUAGES.forEach(lang => {
      let l = lang.code.split('-')[0]
      if(lastLangs.indexOf(l) === -1){
        langOptions.push(<optgroup key={'optgroup-'+l} label={lang.name.substring(0, lang.name.indexOf('(')-1)}></optgroup>)
        lastLangs.push(l)
      }
      langOptions.push(<option key={'option-'+lang.code} value={lang.code}>{lang.name}</option>)
    })
    return langOptions
  }

  toggleMute(){
    if(this.state.processing === ProcessingState.IN_FLIGHT){
      return
    }
    if(this._micAudioSource){
      this.stopMic()
    } else {
      this.initAudioIn()
        .init()
        .then(() => {
          this._asrController.setAudioSource(this._micAudioSource)
        }) // start mic & feed controller
    }
  }

  getRecognizeHtml() {
    let clz = this.state.processing === ProcessingState.IN_FLIGHT ? 'btn-danger' : 
              (this.state.processing === ProcessingState.INITIALIZING || this.state.processing === ProcessingState.AWAITING_FINAL) ? ' btn-warning' : 
              'btn-primary'
    let recoStateClass = 'float-end btn btn-lg mt-3 ' + clz
    let langOptions = this.getLanguageOptions()
    return (
      <div className="col px-5 h-100">
        <div className="h-100 gx-0">
          <form className="form mb-3" 
            disabled={!this.state.microphone}
            onSubmit={
              (evt) => {
                evt.preventDefault()
                this.toggleRecognition()
              }
            }>
            <div className="row gx-0">
              <div className="col-3 mb-0">
                <h3 className="fw-bold mt-3">Speech Recognition</h3>
                <span className="text-dark mb-3 float-start">
                  Convert Speech Audio to Text <a href="https://docs.mix.nuance.com/asr-grpc/v1/">ASR</a>. 
                </span>
              </div>
              <div className="col-9">
                  <div className="col-12 mt-3">
                    <div className="row">
                      <div className="col-9">
                        <AudioVisualizer 
                          audioDataSource={this.state.microphone}
                          options={{
                            width: 785,
                            height: 70,
                            tickWidth: 100
                          }} />
                      </div>
                      <div className="col-1">
                        <button title="Mute/Unmute" className={"float-end fs-4 mt-2 btn " + (this._micAudioSource ? 'text-dark' : 'text-danger')}
                          type="button" onClick={this.toggleMute.bind(this)}>
                          {this._micAudioSource ? (
                            <FontAwesomeIcon icon={faMicrophone}/>
                          ) : (
                            <FontAwesomeIcon icon={faMicrophoneSlash}/>
                          )}
                        </button>
                      </div>
                      <div className="col-2">
                        <button disabled={!this.state.microphone || this.state.processing === ProcessingState.AWAITING_FINAL}
                          className={recoStateClass}
                          type="submit" 
                          style={{'width': '100%'}}>
                          {this.state.processing === ProcessingState.IN_FLIGHT ? 'Stop' : 
                          this.state.processing === ProcessingState.AWAITING_FINAL ? 'Getting results..' : 
                          this.state.processing === ProcessingState.INITIALIZING ? 'Waiting for resource...' : 
                          'Recognize'}
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="col-12 text-center py-2 bg-light rounded">
                <div className="row row-cols-md-auto align-items-center mx-0">
                  <div className="col-12">
                    <div className="input-group mt-0">
                      <span className="input-group-text" id="languageTopic">Topic</span>
                      <input name="topic" type="text" className="form-control" onChange={this.onChangeTextInput.bind(this)} value={this.state.topic} placeholder="languageTopic" aria-label="languageTopic" aria-describedby="languageTopic" />
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="input-group mt-0">
                      <span className="input-group-text" htmlFor="language">Language</span>
                      <select className="form-control" name="language"
                        value={this.state.language} 
                        onBlur={this.onChangeLanguage.bind(this)}>
                        { langOptions }
                      </select>
                    </div>
                    {/*<input name="language" type="text" className="form-control" onChange={this.onChangeTextInput.bind(this)} value={this.state.language} placeholder="language" aria-label="language" aria-describedby="language" />*/}
                  </div>
                  <div className="col-6">
                    <div className="form-check form-check-inline">
                      <label className="form-check-label text-nowrap">Use DLM
                      <input onChange={this.onChangeCheckboxInput.bind(this)} 
                        name="useDLM" 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={this.state.useDLM?'checked':''} 
                        aria-label="Use ASR Customization artifact (DLM)" /></label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label text-nowrap">Auto Punctuate
                      <input onChange={this.onChangeCheckboxInput.bind(this)} 
                        name="autoPunctuate" 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={this.state.autoPunctuate?'checked':''} 
                        aria-label="Auto Punctuate" /></label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label text-nowrap">Filter Profanity
                      <input onChange={this.onChangeCheckboxInput.bind(this)} 
                        name="filterProfanity" 
                        className="form-check-input mt-0" 
                        type="checkbox" 
                        checked={this.state.filterProfanity?'checked':''} 
                        aria-label="Filter Profanity" /></label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label text-nowrap">Suppress Initial Caps
                      <input onChange={this.onChangeCheckboxInput.bind(this)} 
                        name="suppressInitialCapitalization" 
                        className="form-check-input mt-0" 
                        type="checkbox" 
                        checked={this.state.suppressInitialCapitalization?'checked':''} 
                        aria-label="Suppress initial capitalization" /></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="col-12 mt-0 h-100">
            <AsrTabs
              rawResponses={this.state.rawResponses}
              asrRequests={this._asrRequests}
              useDLM={this.state.useDLM}
              inlineWordset={this.state.inlineWordset}
              onUpdateInlineWordset={this.onUpdateInlineWordset.bind(this)}
              onStubInlineWordset={this.onStubInlineWordset.bind(this)}
              error={this.state.error}
            />
          </div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className="row h-100">
        <Tabs fill defaultActiveKey="asraas" transition={false} 
          id="noanim-tab-example" 
          variant="pills"
          className="justify-content-center"
          onSelect={this.handleTabSelection.bind(this)}>
          <Tab eventKey="profile" title={`Profile`}></Tab>
          <Tab eventKey="dlgaas" title={`DLGaaS`}></Tab>
          <Tab eventKey="asraas" title={`ASRaaS`}>
            { 
              this.state.accessToken ? 
              this.getRecognizeHtml() : 
              this.getAuthHtml() 
            }
          </Tab>
          <Tab eventKey="nluaas" title="NLUaaS"></Tab>
          <Tab eventKey="ttsaas" title="TTSaaS"></Tab>
        </Tabs>
      </div>
    )
  }

}
