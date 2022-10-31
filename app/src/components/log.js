/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React from "react"
import Button from 'react-bootstrap/Button'

import moment from 'moment'

import { SIMULATED_EXPERIENCES } from "./shared"

import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'

import loadable from '@loadable/component'

const ReactJson = loadable(() => import('react-json-view'))

const START_EVENTS = ['session-start']
const MESSAGE_EVENTS = ['message']
const INPUT_EVENTS = ['input-received', 'input-required', 'input-processed']
const TRANSFER_EVENTS = ['transfer-initiated']
const DATA_EVENTS = ['data-required', 'data-received']
const END_EVENTS = ['application-ended','session-stopped']
const ERROR_EVENTS = ['error']
const EVENTS_SORTED_LIST = [
  'session-start',
  'selector',
  'decision',
  'transition',
  'event',
  'message',
  'qa-config',
  'input-required',
  'input-received',
  'input-processed',
  'intent',
  'data-received',
  'data-required',
  'question-router',
  'component-invoked',
  'component-returned',
  'transfer-initiated',
  'transfer-completed',
  'reporting-vars',
  'application-ended',
  'session-stop',
  'error',
]
const EVENTS_SORTED = (a, b) => {
  let aIdx = EVENTS_SORTED_LIST.indexOf(a)
  let bIdx = EVENTS_SORTED_LIST.indexOf(b)
  if(aIdx > bIdx){
    return 1
  } else if (aIdx < bIdx){
    return -1
  }
  return 0
}

cytoscape.use( dagre )

export class Graph extends React.Component {

  // credit: https://codesandbox.io/s/k000rnpnn7?file=/components/Graph.js

  constructor(props){
    super(props)
    this.state = {
    }
  }

  initStateMachine(){
    const { machine } = this.props
    const nodes = []
    const edges = []
    function addNodesAndEdges(node, key, parent){
     const id = parent ? parent + "." + key : key
      if (parent) {
        nodes.push({
          data: {
            id,
            label: key,
            parent
          }
        })
      }
      if (node.states) {
        const states = Object.keys(node.states)
          .map(key => ({
            ...node.states[key],
            id: key
          }))
          .concat({
            id: "$initial",
            initial: 1,
            on: { "": node.initial }
          })

        states.forEach(state => {
          addNodesAndEdges(state, state.id, id)
        })
      }
      if (node.on) {
        const visited = {}
        Object.keys(node.on).forEach(event => {
          const target = node.on[event];
          (visited[target] || (visited[target] = [])).push(event);
        })

        Object.keys(visited).forEach(target => {
          edges.push({
            data: {
              id: key + ":" + target,
              source: id,
              target: parent ? parent + "." + target : target,
              label: visited[target].join(",\n")
            }
          })
        })
      }
    }
    addNodesAndEdges(machine, machine.id || "machine")
    // console.log(nodes, edges)
    return {nodes, edges}
  }

  initGraph(nodes, edges){
    this.cy = cytoscape({
      container: this.cyNode,
      boxSelectionEnabled: true,
      autounselectify: true,
      style: `
        node {
          padding: 30px;
        }
        node[label != '$initial'] {
          background-color: #282829;
          border-color: #333;
          border-width: 1px;
          color: white;
          content: data(label);
          font-family: Helvetica Neue;
          font-size: 10px;
          height: label;
          padding-bottom: 5px;
          padding-left: 5px;
          padding-right: 5px;
          padding-top: 5px;
          shape: roundrectangle;
          text-background-padding: 15px;
          text-halign: center;
          text-valign: center;
          width: label;
        }
        node[label = '$initial'] {
          visibility: hidden;
        }
        node:active {
          overlay-color: #ccc;
          overlay-padding: 0;
          overlay-opacity: 0.1;
        }
        $node > node {
          background-color: #282829;
          border-color: white;
          border-width: 1px;
          padding-bottom: 10px;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 10px;
          text-halign: center;
          text-valign: top;
        }
        edge {
          color: #333;
          curve-style: bezier;
          font-size: 9px;
          font-weight: bold;
          label: data(label);
          line-color: #333;
          target-arrow-color: #333;
          target-arrow-shape: triangle;
          target-distance-from-node: 2px;
          text-background-color: #fff;
          text-background-opacity: 1;
          text-background-padding: 3px;
          text-wrap: wrap;
          width: 1px;
          z-index: 100;
        }
        edge[label = ''] {
          source-arrow-shape: circle;
          source-arrow-color: #369;
        }
      `,
      elements: {
        nodes, 
        edges
      },
      layout: this.getLayoutOptions()
    })
  }

  getLayoutOptions(){
    return {
      name: "dagre",
      idealEdgeLength: 70,
      nodeDimensionsIncludeLabels: true,
      fit: false,
    }
  }

  componentDidMount(){
    try {
      const {nodes, edges} = this.initStateMachine()
      this.initGraph(nodes, edges)
    } catch (ex) {
      console.error(ex)
    }
  }

  componentDidUpdate(){
    if(this.cy){
      try {
        const {nodes, edges} = this.initStateMachine()
        this.cy.json({elements: [...nodes, ...edges]})
        let l = this.cy.layout(this.getLayoutOptions())
        l.run()
      } catch (ex) {
        console.error(ex)
      }
    }
  }

  render(){
    return (
      <div className="container">
        <div id="cy" ref={n => (this.cyNode = n)} />
      </div>
    )
  }

}

export class LogEventsViz extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      maxEventCount: props.events.length,
    }
  }

  getEventsMachine(){
    const retEvents = []
    const states = new Map()
    let lastIntentMapper = null
    this.props.events.forEach((evt, idx) => {
      const niiEvt = evt.value.data.events[0]
      const seqid = evt.value.data.seqid
      if(idx > this.state.maxEventCount){
        return
      }
      // console.log(niiEvt)
      // bounded by TRANSITIONS for now
      if(niiEvt.name === 'transition'){
        if(!niiEvt.value.from){
          // console.warn('skipping', niiEvt)
          return
        }
        let _from = niiEvt.value.from.name
        let _to = niiEvt.value.to.name
        let _toType = seqid + '-' + niiEvt.value.to.type // unique

        if(_from === 'return-intent-mapper'){
          return
        }
        if(_to === 'return-intent-mapper'){
          _to = lastIntentMapper
          _toType = `${seqid}-intentmapper`
        }

        if(!states.get(_from)){
          states.set(_from,{
            on: {},
            initial: _from,
          })
        }
        if(!states.get(_to)){
          states.set(_to,{
            on: {},
            initial: _to,
          })
        }
        if(!states.get(_from)['on'][_toType]){
          states.get(_from)['on'][_toType] = _to
        } else {
          states.get(_from)['on'][_toType + '-' + _from] = _to // defensive
        }
        if(niiEvt.value.to.type === 'intentmapper'){
          lastIntentMapper = _to
        }
      }
      retEvents.push(evt)
    })
    // console.log('states', states)
    return {
      machine: {
        id: "dlgaas-events",
        initial: "start",
        states: Object.fromEntries(states)
      }, 
      events: retEvents
    }
  }

  sequenceRangeChange(evt){
    const updatedCount = parseInt(evt.target.value)
    this.setState({
      maxEventCount: updatedCount,
    })
  }

  render(){
    const { machine, events } = this.getEventsMachine(this.props.events)
    // console.log(machine)
    return (
      <div className="row">
        <div className="col-12">
          <div className="input-group">
            <input type="range" 
              className="form-range" 
              value={this.state.maxEventCount} 
              min="0" 
              max={this.props.events.length} 
              step="1" 
              id="eventRange" 
              onChange={this.sequenceRangeChange.bind(this)}/>
          </div>
        </div>
        <Graph machine={machine} events={events}/>
      </div>
    )
  }

}

export class ApiEventsTable extends React.Component {

  render(){
    return (<div><h1>API Events</h1></div>)
  }

}

export class LogEventsTable extends React.Component {

  constructor(){
    super()
    this.state = {
      filterTypes: [],
      eventsReversed: false
    }
  }

  getInterpretationHtml(interpretation){
    if(!interpretation){
      return ''
    }
    return (<ReactJson name="interpretation" src={interpretation}/>)
  }

  renderNiiEvent(niiEvent){
    const val = niiEvent.value
    let ret = null
    switch(niiEvent.name){
      case 'event':
        ret = (<span className="badge bg-light text-dark text-start">name={val.name}, message={val.message}</span>)
        break
      case 'component-invoked':
        ret = (<span className="badge bg-light text-dark text-start">name={val.name}</span>)
        break
      case 'component-returned':
        ret = ('')
        break
      case 'application-ended':
        ret = (<span className="badge bg-danger text-white text-start">id={val.id}, language={val.language}</span>)
        break
      case 'session-start':
        ret = (<div>
          <span className="badge bg-dark text-white text-start">project={val.project.name} (id={val.project.id})</span>
          <br/><span className="badge bg-dark text-white text-start">dlg_version={val.version.dlg}  nlu={JSON.stringify(val.version.nlu)}  asr={JSON.stringify(val.version.asr)}</span>
          <br/><span className="badge bg-dark text-white text-start">organization={val.project.namespace}, deployed={moment(val.project.deployed).fromNow()} ({val.project.deployed})</span>
          {/*<br/><span className="badge bg-dark text-white text-start">channel={val.selector.channel} language={val.selector.language}</span>*/}
          </div>)
        break
      case 'session-stopped':
        ret = (<span className="badge bg-danger text-white text-start">done.</span>)
        // TODO: add table to value=>language + data
        break
      case 'selector':
        ret = (<span className="badge bg-light text-dark text-start">channel={val.channel}, language={val.language}</span>)
        break
      case 'decision':
        ret = (<span className="badge bg-light text-dark text-start">label={val.label}, next={val.next}</span>)
        break
      case 'data-required':
        ret = (<div>
          <span className="badge bg-light text-dark text-start">id={val.id}, type={val.type === 'internal' ? 'ServerSide' : 'ClientSide'}</span>
          {val.timeout ? (<br/>) : ''}
          {val.timeout ? (<span className="badge bg-light text-dark text-start">timeout: connect={val.timeout.connect}, request={val.timeout.request}</span>) : ''}
          {val.data ? (<br/>) : ''}
          {val.data ? (<span className="badge bg-light text-dark text-start"><ReactJson name="data" className="overflow-hidden text-break" src={val.data} collapsed={2} /></span>) : ''}
          {val.endpoint ? (<br/>) : ''}
          {val.endpoint ? (<span className="badge bg-light text-dark text-start"><ReactJson name="endpoint" className="overflow-hidden text-break" src={val.endpoint} collapsed={2} /></span>) : ''}
          </div>)
        break
      case 'data-received':
        ret = (<div>
          <span className="badge bg-light text-dark text-start">id={val.id}, returnCode={val.returnCode}, returnMessage={val.returnMessage}</span>
          {val.duration ? (<br/>) : ''}
          {val.duration ? (<span className="badge bg-light text-dark text-start">duration={val.duration}</span>) : ''}
          <br/><span className="badge bg-light text-dark text-start"><ReactJson name="data" className="overflow-hidden text-break" src={val.data} collapsed={2} /></span>
          </div>)
        break
      case 'message':
        const vTxt = []
        const exp = SIMULATED_EXPERIENCES(this.props.simulateExperience)
        if(exp.isOutputSSML){
          val.nlg.forEach(v => vTxt.push(v.text))
        } else {
          val.visual.forEach(v => vTxt.push(v.text))
        }
        ret = (<div>
          <strong className="badge bg-primary text-white text-start text-wrap">{val.visual.length ? vTxt.join(' ') : ''}</strong>
          <br/><span className="badge bg-light text-dark text-start">nlg={val.nlg.length}, visual={val.visual.length}, audio={val.audio.length}</span>
          </div>)
        break
      case 'qa-config':
        ret = (<span className="badge bg-light text-dark text-start">name={val.name}, confirmationMode={val.confirmationMode}, role={val.role}, conf=({val.confidence.low}, {val.confidence.high})}</span>)
        break
      case 'input-required':
        ret = (<span className="badge bg-light text-dark text-start">{JSON.stringify(val.data, null, 2)}</span>)
        break
      case 'input-received':
        let interpretationTable = this.getInterpretationHtml(val.interpretation)
        ret = val.userText ? (
            <div><strong className="badge bg-success text-white text-start">{val.userText}</strong><br/><span className="badge bg-light text-dark text-start"><pre className="overflow-hidden">{interpretationTable}</pre></span></div>
          ) : val.selectedItem ? (
            <div><strong className="badge bg-success text-white text-start">{val.selectedItem.value}</strong><br/><span className="badge bg-light text-dark text-start"><strong>selected item</strong> id={val.selectedItem.id}, value={val.selectedItem.value}</span></div>
          ) : val.interpretation ? (
            <div><strong className="badge bg-success text-white text-start">{val.interpretation.utterance ? val.interpretation.utterance : JSON.stringify(val.interpretation.data)} <small>(via {val.interpretation.inputmode})</small></strong><br/><span className="badge bg-light text-dark text-start"><pre className="overflow-hidden">{interpretationTable}</pre></span></div>
          ) : ('')
        break
      case 'input-processed':
        ret = (<span className="badge bg-light text-dark text-start">result={val.result} (nomatch={val.counters.nomatch}, turn={val.counters.turn}, help={val.counters.help}, repeat={val.counters.repeat}, invalidRecoOption={val.counters.invalidRecoOption}, noToConfirm={val.counters.noToConfirm}, try={val.counters.try})</span>)
        break
      case 'intent':
        ret = (<span className="badge bg-light text-dark text-start">value={val.value}</span>)
        break
      case 'question-router':
        let beliefHtml = []
        val.belief.forEach((belief, idx) => {
          beliefHtml.push(<tr key={'qr-belief-'+idx}>
            <td><span className='badge badge-light text-dark'>{belief.name}</span></td>
            <td><span className='badge badge-light text-dark'>{belief.value || '-'}</span></td>
            <td><span className='badge badge-light text-dark'>{belief.literal || '-'}</span></td>
            <td><span className='badge badge-light text-dark'>{belief.confidence || '-'}</span></td>
            <td><span className='badge badge-light text-dark'>{belief.required || '-'}</span></td>
            <td><span className='badge badge-light text-dark'>{belief.status || '-'}</span></td>
            <td><span className='badge badge-light text-dark'>{belief.inputMode || '-'}</span></td>
            <td><span className='badge badge-light text-dark'>{belief.confirmationMode || '-'}</span></td>
          </tr>)
        })
        ret = (<div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th><span className='badge badge-light text-dark'>Name</span></th>
                <th><span className='badge badge-light text-dark'>Value</span></th>
                <th><span className='badge badge-light text-dark'>Literal</span></th>
                <th><span className='badge badge-light text-dark'>Confidence</span></th>
                <th><span className='badge badge-light text-dark'>Required</span></th>
                <th><span className='badge badge-light text-dark'>Status</span></th>
                <th><span className='badge badge-light text-dark'>Input</span></th>
                <th><span className='badge badge-light text-dark'>Confirmation</span></th>
              </tr>
            </thead>
            <tbody>
              {beliefHtml}
            </tbody>
          </table>
        </div>)
        break
      case 'transition':
        ret = (<span className="badge bg-light text-dark text-start">from=<strong>{val.from.name}</strong> ({val.from.uuid})<br/>to=<strong>{val.to.name}</strong> ({val.to.uuid}, {val.to.type})</span>)
        break
      case 'error':
        ret = (<span className="badge bg-light text-dark text-start text-wrap"><strong>{val.name}</strong>: {val.message}</span>)
        break
      case 'transfer-initiated':
        ret = (<span className="badge bg-light text-dark text-start text-wrap"><strong>{val.id}</strong><br/><pre className="">{JSON.stringify(val.data, null, 2)}</pre></span>)
        break
      case 'transfer-completed':
        ret = (<span className="badge bg-light text-dark text-start text-wrap"><strong>returnCode={val.returnCode}</strong><br/>returnMessage={val.returnMessage}<br/><pre className="">data={JSON.stringify(val.data, null, 2)}</pre></span>)
        break
      case 'reporting-vars':
        ret = (<span className="badge bg-light text-dark text-start"><ReactJson src={val} collapsed={3} /></span>)
        break 
      default:
        ret = (<span className="badge bg-light text-dark text-start">{JSON.stringify(val)}</span>)
        break 
    }
    return ret
  }

  getBadgeClz(e){
    return START_EVENTS.indexOf(e) > -1 ? 'border border-dark bg-dark text-white' :
          MESSAGE_EVENTS.indexOf(e) > -1 ? 'border bg-primary text-primary' :
          INPUT_EVENTS.indexOf(e) > -1 ? 'border bg-success text-success' :
          TRANSFER_EVENTS.indexOf(e) > -1 ? 'border bg-warning text-dark' :
          DATA_EVENTS.indexOf(e) > -1 ? 'border bg-warning text-dark' :
          END_EVENTS.indexOf(e) > -1 ? 'bg-danger text-danger' :
          ERROR_EVENTS.indexOf(e) > -1 ? 'border bg-danger text-danger' :
          'bg-light text-dark'
  }

  renderEventsTable(events){
    const ret = []
    let e = events
    const listMethod = this.state.eventsReversed ? 'unshift' : 'push' 
    e.forEach((evt, idx) => {
      evt.value.data.events.forEach(niiEvt => {
        if(this.state.filterTypes.indexOf(niiEvt.name) > -1){
          return
        }
        let ts = moment(evt.value.timestamp).format('HH:mm:ss.SSS')
        let badgeBg = this.getBadgeClz(niiEvt.name)
        ret[listMethod](
          <tr key={'event-'+idx} className={['session-start','session-stopped'].indexOf(niiEvt.name) >-1 ? 'bg-dark' : ''}>
            <td><span className={`badge ` + badgeBg}>{evt.value.data.seqid}</span></td>
            <td><span className={`badge ` + badgeBg}>{ts}</span></td>
            <td><span className={`badge ` + badgeBg}>{niiEvt.name}</span></td>
            <td className="text-start">{this.renderNiiEvent(niiEvt)}</td>
          </tr>
        )
      })
    })
    return (
      <div className="table-responsive h-75 overflow-auto">
        <table className="table table-sm table-hover table-fixedLayout">
          <thead className="">
            <tr>
              <th style={{'width': '5%'}}><Button variant="link" onClick={this.toggleAllEventsSeqId.bind(this)}>SeqID</Button></th>
              <th style={{'width': '10%'}}>Timestamp</th>
              <th style={{'width': '10%'}}>Event</th>
              <th style={{'width': '75%'}}>Details</th>
            </tr>
          </thead>
          <tbody>
            {ret}
          </tbody>
        </table>
      </div>
    )
  }

  updateFilters(evt){
    const tgt = evt.target
    const isCurrentlyFiltered = this.state.filterTypes.indexOf(tgt.value) > -1
    if(isCurrentlyFiltered){
      const newFilters = this.state.filterTypes.filter(f => f !== tgt.value)
      this.setState({
        filterTypes: newFilters,
      })
    } else {
      this.state.filterTypes.push(tgt.value)
      this.setState({
        filterTypes: this.state.filterTypes
      })
    }
  }

  toggleAllEventsSeqId(){
    this.setState({
      eventsReversed: !this.state.eventsReversed
    })
  }

  toggleAllFilters(){
    const all = this.getAllEventNames()
    if(this.state.filterTypes.length === 0 || (this.state.filterTypes.length < all.length)){
      this.setState({
        filterTypes: all
      })
    } else {
      this.setState({
        filterTypes: []
      })
    }
  }

  getAllEventNames(){
    const ret = []
    this.props.events.forEach(e => {
      const evts = e.value.data.events
      evts.forEach(_e => {
        if(ret.indexOf(_e.name) === -1){
          ret.push(_e.name)
        }
      })
    })
    return ret.sort()
  }

  renderFilters(){
    const eventNames = this.getAllEventNames()
    const views = []
    eventNames.sort(EVENTS_SORTED).forEach(eventName => {
      views.push(
        <div className="form-check form-check-inline" key={'event-filter-'+eventName}>
          <label className="form-check-label" htmlFor={'event-filter-'+eventName}>{eventName}</label>
          <input className="form-check-input" type="checkbox" 
            id={'event-filter-'+eventName} 
            value={eventName} 
            onChange={this.updateFilters.bind(this)}
            checked={this.state.filterTypes.indexOf(eventName) === -1} />
        </div>
      )
    })
    return views
  }

  render(){
    return (
      <div className="log-viewer h-100">
        <div className="row h-100">
          <div className="col-2 border-end border-2">
            <button className="float-end btn mb-2 mt-2 btn-outline-primary btn-sm text-decoration-none" onClick={this.toggleAllFilters.bind(this)}>Toggle All/Reset</button>
            <h5 className="mt-2"><strong>Filter</strong></h5>
            <br/>
            <div className="text-end">
              {this.renderFilters()}
            </div>
          </div>
          <div className="col-10 h-100">
            {this.renderEventsTable(this.props.events)}
          </div>
        </div>
      </div>
    )
  }

}
