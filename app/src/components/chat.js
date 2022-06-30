/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React, { useState } from 'react'

import * as ReactSafeHtml from "react-safe-html"
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, 
  faExternalLinkAlt,
  faWindowMinimize,
  faWindowMaximize, 
  faPhoneSlash
} from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'

import { STUB_SELECTABLE_IMAGES, SIMULATED_EXPERIENCES } from "./shared"

const components = ReactSafeHtml.components.makeElements({})
components.div = ReactSafeHtml.components.createSimpleElement('div', {style: true, class: true})
components.span = ReactSafeHtml.components.createSimpleElement('span', {style: true, class: true})
components.a = ReactSafeHtml.components.createSimpleElement('a', {
  style: true,
  href: true,
  rel: true,
  target: true,
  'data-mix-selectable-id': true,
  'data-mix-selectable-value': true,
  'data-mix-action': true,
  'data-mix-input': true
})
components.p = ReactSafeHtml.components.createSimpleElement('p', {style: true, class: true})
components.br = ReactSafeHtml.components.createSimpleElement('br', {style: true, class: true})
components.em = ReactSafeHtml.components.createSimpleElement('em', {style: true, class: true})
components.small = ReactSafeHtml.components.createSimpleElement('small', {style: true, class: true})
components.img = ReactSafeHtml.components.createSimpleElement('img', {src: true, class: true, width: true})
components.table = ReactSafeHtml.components.createSimpleElement('table', {style: true, class: true})
components.thead = ReactSafeHtml.components.createSimpleElement('thead', {style: true, class: true})
components.tbody = ReactSafeHtml.components.createSimpleElement('tbody', {style: true, class: true})
components.th = ReactSafeHtml.components.createSimpleElement('th', {style: true, class: true})
components.tr = ReactSafeHtml.components.createSimpleElement('tr', {style: true, class: true})
components.td = ReactSafeHtml.components.createSimpleElement('td', {style: true, class: true})
components.strong = ReactSafeHtml.components.createSimpleElement('strong', {style: true, class: true})
components.blockquote = ReactSafeHtml.components.createSimpleElement('blockquote', {style: true, class: true})
components.code = ReactSafeHtml.components.createSimpleElement('code', {style: true, class: true})
components.ul = ReactSafeHtml.components.createSimpleElement('ul', {style: true, class: true})
components.ol = ReactSafeHtml.components.createSimpleElement('ol', {style: true, class: true})
components.dl = ReactSafeHtml.components.createSimpleElement('dl', {style: true, class: true})
components.li = ReactSafeHtml.components.createSimpleElement('li', {style: true, class: true})
components.dd = ReactSafeHtml.components.createSimpleElement('dd', {style: true, class: true})
components.dt = ReactSafeHtml.components.createSimpleElement('dt', {style: true, class: true})
components.h1 = ReactSafeHtml.components.createSimpleElement('h1', {style: true, class: true})
components.h2 = ReactSafeHtml.components.createSimpleElement('h2', {style: true, class: true})
components.h3 = ReactSafeHtml.components.createSimpleElement('h3', {style: true, class: true})
components.h4 = ReactSafeHtml.components.createSimpleElement('h4', {style: true, class: true})
components.h5 = ReactSafeHtml.components.createSimpleElement('h5', {style: true, class: true})
components.h6 = ReactSafeHtml.components.createSimpleElement('h6', {style: true, class: true})

const chatPanelContainerStyles = {
  position: "relative",
  height: "100%",
  overflow: "auto",
  paddingBottom: "30px",
}

const chatPanelMessagesStyles = {
  'overflowY': 'auto',
  "position": "absolute",
  "bottom": "0px",
  "left": 0,
  "right": 0,
  "maxHeight": "100%",
  "minHeight": "100%",
  "paddingTop": "50px",
  "paddingLeft": "15px",
  "paddingRight": "15px",
}

const CountdownTimer = ({sessionTimeout, timeoutRemaining}) => {
  return (
    <span className="badge bg-dark text-white float-end">
      {timeoutRemaining}s
    </span>
  )
}

const MinMaxToggle = ({ toggle }) => {
  const [minimized, setMinimized] = useState(false)
  function handleClick(e) {
    e.preventDefault()
    setMinimized(!minimized)
    toggle(!minimized)
  }
  return (
    <Button variant="link" className="badge text-primary float-end fw-light text-decoration-none expand-collapse-button" onClick={handleClick}>
      { minimized ? (<FontAwesomeIcon icon={faWindowMaximize}/>) : (<FontAwesomeIcon icon={faWindowMinimize}/>) }
    </Button>
  )
}

//
// UI Widgets
//

const Keypad = ({name, disabled, onKeypadInput, settings}) => {
  const KEYPAD_OPTIONS = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    ['*',0,'#'],
  ]
  const handleClick = (e) => {
    onKeypadInput(e.target.innerText, settings.dtmfMappings, settings.dtmfSettings, e)
  }

  let optionsHtml = []
  KEYPAD_OPTIONS.forEach((opts, idx2) => {
    let buttons = []
    opts.forEach((opt, idx) => {
      buttons.push(<button key={`keypad-button-${idx}`} disabled={disabled} className="btn rounded-circle btn-outline-secondary px-3 py-2 my-1 mx-1" onClick={handleClick}>{opt}</button>)
    })
    optionsHtml.push(<div key={'keypad-'+idx2} className="d-flex justify-content-center">{buttons}</div>)
  })

  return (
    <div className="row keypadInput">
      <div className="col-md pt-3 pb-3">
        {optionsHtml}
      </div>
    </div>
  )
}

const ChatButtons = ({view, selectables, selectItem, idx}) => {
  let items = []

  selectables.forEach((selectable, i) => {
    items.push(
      <button key={i}
        className={'mr-1 btn btn-outline-primary ' + (view ? view.id : '')}
        onClick={(evt) => {selectItem(evt, selectable.value);}}>
        {selectable.displayText}
      </button>
    )
  })

  return (
    <div className="position-relative bottom-0 start-50 translate-middle-x slide text-center">
      {items}
    </div>
  )
}

const ChatCarousel = ({view, selectables, selectItem, idx}) => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  let items = []
  selectables.forEach((selectable, i) => {
    if(selectable.value){
      if(STUB_SELECTABLE_IMAGES[selectable.value.id] &&
         STUB_SELECTABLE_IMAGES[selectable.value.id][selectable.value.value]){
        selectable.displayImageUri = STUB_SELECTABLE_IMAGES[selectable.value.id][selectable.value.value]
      }
    }
    items.push(
      <Carousel.Item key={i} interval={10000}>
        <Card className="card d-inline-block">
          { selectable.displayImageUri ? (
            <img alt="displayImage" onClick={(evt) => {selectItem(evt, selectable.value);}} src={selectable.displayImageUri} className="card-img-top"/>
          ) : '' }
          {/*<h5 className="card-title">{selectable.displayText}</h5>*/}
          {/*<p className="card-text badge bg-light text-dark">{selectable.description}</p>*/}
          <Card.Footer className="px-0 py-0">
            <button className="btn btn-outline-primary w-100 btn-sm text-center" onClick={(evt) => {selectItem(evt, selectable.value);}}>
              Select {selectable.displayText}
            </button>
          </Card.Footer>
        </Card>
      </Carousel.Item>
    )
  })

  return (
    <Carousel activeIndex={index}
        key={'qa'+idx+'-selectable'}
        className="position-relative bottom-0 start-50 translate-middle-x slide text-center"
        onSelect={handleSelect}>
      {items}
    </Carousel>
  )
}

const ChatColorPicker = ({view, selectables, selectItem, idx}) => {
  let items = []

  selectables.forEach((selectable, i) => {
    items.push(
      <button key={i}
        className={'mr-1 ml-1 btn rounded-circle ' + (view ? view.id : '')}
        style={{'background': selectable.description, 'height': '25px'}}
        onClick={(evt) => {selectItem(evt, selectable.value);}}
        title={selectable.displayText}>
        {`  `}
      </button>
    )
  })

  return (
    <div className="position-relative bottom-0 start-50 translate-middle-x text-center">
      {items}
    </div>
  )
}

const EmailInput = ({placeholder, onSubmit}) => {
  const [email, setEmail] = useState('')
  const handleChange = (evt) => {
    setEmail(evt.target.value)
  }
  return (
    <form onSubmit={(evt) => {
      evt.preventDefault()
      onSubmit(email)
    }}>
      <InputGroup className="">
        <InputGroup.Text className="border-0" id="phonenumber"><span role="img" aria-label="email" aria-labelledby="email">📧</span></InputGroup.Text>
        <div className="form-control px-0 py-0 bg-light border-0">
          <input placeholder={placeholder || 'user@company.com'} type="email" value={email} className="form-control border-0" onChange={handleChange}/>
        </div>
        <Button type={'submit'} variant={`primary`} className="rounded-0 rounded-end">></Button>
      </InputGroup>
    </form>
  )
}

const PhoneInput = ({placeholder, onSubmit}) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const handleChange = (evt) => {
    setPhoneNumber(evt.target.value)
  }
  return (
    <form onSubmit={(evt) => {
      evt.preventDefault()
      onSubmit(phoneNumber)
    }}>
      <InputGroup className="">
        <InputGroup.Text className="border-0" id="phonenumber"><span role="img" aria-label="phone" aria-labelledby="phone">📱</span></InputGroup.Text>
        <div className="form-control px-0 py-0 bg-light border-0">
          <input placeholder={placeholder} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phoneNumber} className="form-control border-0" onChange={handleChange}/>
        </div>
        <Button type={'submit'} variant={`primary`} className="rounded-0 rounded-end">></Button>
      </InputGroup>
    </form>
  )
}

const DateInput = ({placeholder, onSubmit}) => {
  const d = placeholder === 'now' ? (new Date()) : (new Date())
  const [date, setDate] = useState(d)
  return (
    <form onSubmit={(evt) => {
      evt.preventDefault()
      let d = moment(date).format('YYYY-MM-DD')
      onSubmit(d)
    }}>
      <InputGroup className="">
        <InputGroup.Text className="border-0" id="datepickerselection"><span role="img" aria-label="date" aria-labelledby="date">📅</span></InputGroup.Text>
        <div className="form-control px-0 py-0 bg-light border-0">
          <DatePicker selected={date} className="form-control border-0" onChange={date => setDate(date)}/>
        </div>
        <Button type={'submit'} variant={`primary`} className="rounded-0 rounded-end">></Button>
      </InputGroup>
    </form>
  )
}

const CurrencyInput = ({placeholder, onSubmit}) => {
  const [amount, setAmount] = useState(0)
  const handleChange = (evt) => {
    setAmount(evt.target.value)
  }
  return (
    <form onSubmit={(evt) => {
      evt.preventDefault()
      let a = amount
      if(a.startsWith('$')){
        a = a.substring(1)
      }
      onSubmit(`$${a}`) // prepend the $
    }}>
      <InputGroup className="">
        <InputGroup.Text className="border-0" id="currencyselection">$</InputGroup.Text>
        <FormControl className="border-0" id="amount" placeholder={placeholder} onChange={handleChange}/>
        <Button type={'submit'} variant={`primary`} className="rounded-0 rounded-end">></Button>
      </InputGroup>
    </form>
  )
}

export default class ChatPanel extends React.Component {

  constructor(){
    super()
    this.state = {
      textInput: '',
      dtmfInput: '',
      recognitionSettings: {},
      timeoutRemaining: 0,
      minimized: false,
    }
    this.sessionTimeoutInterval = -1
    this.countdownTimer = null
  }

  componentDidMount(){
    this.focusInput()
    this.setState({
      timeoutRemaining: this.props.sessionTimeout
    })
    this.sessionTimeoutInterval = window.setInterval(() => {
      this.dlgSessionTick()
    }, 1000)
  }

  componentDidUpdate(){
    this.triggerAutoScroll()
    if(!this.props.active && this.sessionTimeoutInterval !== -1){
      this.endSessionTimeoutInterval()
    }
  }

  componentWillUnmount(){
    this.endSessionTimeoutInterval()
  }

  endSessionTimeoutInterval(){
    if(this.sessionTimeoutInterval !== -1){
      window.clearInterval(this.sessionTimeoutInterval)
      this.sessionTimeoutInterval = -1
    }
  }

  dlgSessionTick(){
    if(this.state.timeoutRemaining === 0){
      return
    }
    let newSessionTimeout = this.state.timeoutRemaining - 1
    if(newSessionTimeout < 1){
      newSessionTimeout = 0
      this.props.onSessionTimeoutEnded()
    }
    this.setState({
      timeoutRemaining: newSessionTimeout
    })
  }

  triggerAutoScroll(){
    let elem = document.getElementById('messagesHnd')
    if(elem && this.props.autoScrollChatPanel){
      elem.scrollTop = elem.scrollHeight
    }
  }

  focusInput(){
    document.getElementById('textInput').focus()
  }

  focusKeypad(){
    document.getElementById('keypadInput').focus()
  }

  onChangeTextInput(evt) {
    // Handle text input
    const tgt = evt.target
    switch(tgt.name){
      case 'textInput':
        this.setState({
          textInput: tgt.value,
          dtmfInput: ''
        })
        break
      default:
        break
    }
  }

  onChangeKeypadInput(value, mappings, settings, evt) {
    // Handle a dtmf-like input
    let dtmfInput = {}
    let executed = false
    mappings.forEach(mapping => {
      if(mapping.dtmfKey === value){
        dtmfInput[mapping.id] = mapping.value
      }
    })
    if(Object.keys(dtmfInput).length){
      this.props.onExecute(dtmfInput, null, null, true)
      executed = true
    }
    let newInput = this.state.dtmfInput
    if(!executed && value === settings.termChar){
      this.props.onExecute(newInput, null, null, true)
      executed = true
    } else {
      newInput += value
    }
    let input = executed ? '' : newInput
    this.setState({
      dtmfInput: input,
      textInput: input
    })

  }

  renderSelectables(view, selectables, idx){
    switch(view.name){
      case 'carousel':
        return (<ChatCarousel key={idx} view={view} index={idx} selectables={selectables} selectItem={this.selectItem.bind(this)}></ChatCarousel>)
      case 'colorpicker':
        return (<ChatColorPicker key={idx} view={view} index={idx} selectables={selectables} selectItem={this.selectItem.bind(this)}></ChatColorPicker>)
      case 'buttons':
      default:
        return (<ChatButtons key={idx} view={view} index={idx} selectables={selectables} selectItem={this.selectItem.bind(this)}></ChatButtons>)
    }
  }

  renderSpecialInput(qaAction, idx){
    let ret = null
    let viewName = qaAction.view.name // Mix.dialog QA 'type' (id=css)
    switch(viewName){
      case 'currency':
        ret = (
          <CurrencyInput placeholder={qaAction.data ? (qaAction.data.currencyHint || '') : ''}
            onSubmit={this.submitDirectTextInput.bind(this)}/>
        )
        break
      case 'date':
        ret = (
          <DateInput placeholder={qaAction.data ? (qaAction.data.dateHint || '') : ''}
            onSubmit={this.submitDirectTextInput.bind(this)}/>
        )
        break
      case 'phone':
        ret = (
          <PhoneInput placeholder={qaAction.data ? (qaAction.data.phoneHint || '') : ''}
            onSubmit={this.submitDirectTextInput.bind(this)}/>
        )
        break
      case 'email':
        ret = (
          <EmailInput placeholder={qaAction.data ? (qaAction.data.emailHint || '') : ''}
            onSubmit={this.submitDirectTextInput.bind(this)}/>
        )
        break
      default:
        break
    }
    if(ret){
      return (
        <div className="rounded rounded-3 bg-light text-dark p-2" key={idx+'-qa-'+viewName}>
          {ret}
        </div>
      )
    }
    return ret
  }

  onClickEvent(evt){
    let target = evt.target
    switch(target.getAttribute('data-mix-action')){
      case 'selectable':
        this.props.onExecute({
          'id': target.getAttribute('data-mix-selectable-id'),
          'value': target.getAttribute('data-mix-selectable-value')
        })
        evt.preventDefault()
        break
      case 'input':
        this.props.onExecute(target.getAttribute('data-mix-input'))
        evt.preventDefault()
        break
      default:
        console.log('unhandled use-case')
        break
    }
  }

  isVisualExperience(){
    return SIMULATED_EXPERIENCES(this.props.simulateExperience).isOutputHTML
  }

  isVoiceExperience(){
    return SIMULATED_EXPERIENCES(this.props.simulateExperience).isOutputSSML
  }

  isIVRExperience(){
    return SIMULATED_EXPERIENCES(this.props.simulateExperience).dtmfInput
  }

  gatherAndPopulateMessages(action, resMessages){
    if(!action) return
    let m = action.message
    if(this.isVisualExperience()){
      m.visual.forEach((m, idx) => {
        resMessages.push(
          <dd key={`latency-msg-${idx}`} className="d-flex justify-content-start">
            <div className="rounded rounded-3 bg-light msg text-dark p-2" onClick={this.onClickEvent.bind(this)} >
              <ReactSafeHtml html={m.text} components={components} />
            </div>
          </dd>
        )
      })
    } else if(this.isVoiceExperience()){
      m.nlg.forEach((m, idx) => {
        resMessages.push(
          <dd key={`latency-msg-${idx}`} className="d-flex justify-content-start">
            <div className="rounded rounded-3 bg-light msg text-dark p-2">
              {m.text}
            </div>
          </dd>
        )
      })
    }
  }

  renderMessages(){
    let messages = []
    if(this.props.rawResponses){
      this.props.rawResponses.forEach((res, idx) => {
        const resMessages = []
        if(res.error){
          // console.warn('this error i got', res, res.error)
          resMessages.push(<dd key={idx} className="badge bg-danger text-white text-wrap">{JSON.stringify(res.error.response.data.error)}</dd>)
        } else if(res.request){
          if(!res.request){
            return
          }
          if(!res.request.user_input){
            if(!res.request.dialog_event){
              return
            }
            return
          }
          if(!res.request.user_input.user_text){
            // DTMF
            if(res.request.user_input.interpretation){
              let inter = res.request.user_input.interpretation.data
              let interKeys = Object.keys(inter)
              let interKey = interKeys.length === 1 ? interKeys[0] : null
              let interValue = inter[interKey]
              let dtmfInput = res.request.user_input.interpretation.input_mode === 'dtmf'
              resMessages.push(
                <dd key={idx} className="d-flex justify-content-end">
                  <div className={`rounded rounded-3 text-primary bg-white msg p-2 d-inline-flex flex-row-reverse ` + (dtmfInput ? `dtmf` : ``) }>
                    <sub className="text-light">{interKey}</sub> {interValue} 
                  </div>
                  {/*<div className="float-end lh-lg mx-1">{dtmfInput ? `🔢` : ''}</div>*/}
                </dd>)
            } else {
              if(!res.request.user_input.selected_item){
                return
              }
              // USER SELECTABLE
              resMessages.push(
                <dd key={idx} className="d-flex justify-content-end">
                  <div className="rounded rounded-3 text-primary bg-white msg p-2 d-inline-flex flex-row-reverse">
                    <sub><em className="text-light">{res.request.user_input.selected_item.id}</em></sub> {res.request.user_input.selected_item.value}
                  </div>
                </dd>)
            }

          } else {
            // USER MESSAGE
            let originalResponse = this.props.rawResponses.length > idx ? this.props.rawResponses[idx+1]  : null
            let userText = res.request.user_input.user_text
            if(originalResponse && originalResponse.response){
              if(originalResponse.response.payload.qaAction
                  && originalResponse.response.payload.qaAction.mask){
                userText = Array(userText.length+1).join('*')
              }
            }
            resMessages.push(
              <dd key={idx} className="d-flex justify-content-end">
                <div className="rounded rounded-3 text-primary bg-white msg p-2 d-inline-flex flex-row-reverse">{userText}</div>
              </dd>
            )
          }
        } else if (!res.response){
          return
        } else if(res.response.payload) {
          // SYSTEM MESSAGE
          if(!res.response || res.error){
            return
          }
          // MESSAGES
          const msgs = res.response.payload.messages
          if(msgs){
            msgs.forEach((m,idx2) => {
              if(this.isVisualExperience()){
                m.visual.forEach((_m, idx3) => {
                  let txt = _m.text
                  if(txt.length){
                    resMessages.push(
                      <dd key={idx+'-msg-'+idx2+'-'+idx3} className="d-flex justify-content-start">
                        <div className="rounded rounded-3 bg-light msg text-dark p-2" onClick={this.onClickEvent.bind(this)} >
                          <ReactSafeHtml html={txt} components={components} />
                        </div>
                      </dd>
                    )
                  }
                })
              } else if(this.isVoiceExperience()){
                m.nlg.forEach((_m, idx3) => {
                  let txt = _m.text
                  if(txt.length){
                    resMessages.push(
                      <dd key={`${idx}-msg-${idx2}-${idx3}`} className="">
                        <div className="rounded rounded-3 bg-light msg text-dark p-2">
                          {txt}
                        </div>
                      </dd>
                    )
                  }
                })
              }
            })
          }
          // CONTINUE ACTION
          const continueAction = res.response.payload.continueAction
          if(continueAction){
            this.gatherAndPopulateMessages(continueAction, resMessages)
          }
          // QA ACTION
          const qaAction = res.response.payload.qaAction
          if(qaAction){
            let cardMsgs = []
            if(this.isVisualExperience()){
              // Text
              if(qaAction.message){
                qaAction.message.visual.forEach((m, idx2) => {
                  cardMsgs.push(
                    <ReactSafeHtml key={'msg-safe-'+idx2} html={m.text} components={components} />
                  )
                })
              }
              if(idx === 0 && this.props.active){
                // View handling -> Special Input Types
                const specialInput = this.renderSpecialInput(qaAction, idx)
                if(specialInput){
                  cardMsgs.push(specialInput)
                }
                // Selectable
                if(qaAction.selectable){
                  const selectables = qaAction.selectable.selectableItems
                  if(selectables && selectables.length){
                    cardMsgs.push(<div className="mt-3 mb-2" key={'msg-selectable-'+idx}>{this.renderSelectables(qaAction.view, selectables, idx)}</div>)

                  }
                }
              }
              resMessages.push(<dd key={'qa-'+idx} className="d-flex justify-content-start"><div className="rounded rounded-3 bg-light msg text-dark p-2" onClick={this.onClickEvent.bind(this)}>{cardMsgs}</div></dd>)
            } else if(this.isVoiceExperience()){
              if(qaAction.message){
                qaAction.message.nlg.forEach((m, idx2) => {
                  cardMsgs.push(m.text)
                })
              }
              resMessages.push(<dd key={'qa-'+idx} className="d-flex justify-content-start"><div className="rounded rounded-3 bg-light msg text-dark p-2">{cardMsgs}</div></dd>)
              if(idx === 0 && this.props.active){
                const dtmfMappings = qaAction.recognitionSettings.dtmfMappings
                const dtmfMappingKeys = Object.keys(dtmfMappings)
                if(dtmfMappingKeys.length){
                  let dtmfTable = []
                  dtmfMappingKeys.forEach(m => {
                    let mapping = dtmfMappings[m]
                    dtmfTable.unshift(<tr key={'dtmf-'+idx+'-'+m}><td>{mapping.dtmfKey}</td><td>{mapping.value}</td><td>{mapping.id}</td></tr>)
                  })
                  resMessages.push(<dd key={'da-'+idx}><div className="w-100 rounded rounded-3 bg-transparent msg text-secondary p-2"><table className='table table-sm'><thead><tr><th>Key</th><th>Value</th><th>ID</th></tr></thead><tbody>{dtmfTable}</tbody></table></div></dd>)
                }
                this.setState({
                  recognitionSettings: qaAction.recognitionSettings
                })
              }
            }
          }
          // DATA ACTION
          const daAction = res.response.payload.daAction
          if(daAction){
            resMessages.push(<dd key={'da-'+idx}><div className="badge w-100 rounded rounded-3 bg-light msg text-secondary p-2">{daAction.id}</div></dd>)
            this.gatherAndPopulateMessages(daAction, resMessages)
          }
          // ESCALATE ACTION
          const escalationAction = res.response.payload.escalationAction
          if(escalationAction){
            resMessages.push(<dd key={'esc-'+idx}><div className="badge rounded rounded-3 bg-warning text-dark p-2">{escalationAction.id}</div></dd>)
          }
          // END ACTION
          const endAction = res.response.payload.endAction
          if(endAction){
            resMessages.push(<dd key={'end-'+idx}><div className="badge rounded rounded-3 bg-danger text-dark p-2">{endAction.id}</div></dd>)
          }
        }
        messages = [resMessages, ...messages]
      })
    }
    return messages
  }

  submitDirectTextInput(input){
    this.props.onExecute(input)
    this.setState({
      timeoutRemaining: this.props.sessionTimeout,
    })
  }

  executeEventInput(eventType, eventMessage){
    let e = {
        type: eventType,
        message: eventMessage,
    }
    this.props.onExecute(null, false, e)
    this.setState({
      textInput: '',
      timeoutRemaining: this.props.sessionTimeout,
    })
  }

  executeTextInput(){
    this.props.onExecute(this.state.textInput)
    this.setState({
      textInput: '',
      timeoutRemaining: this.props.sessionTimeout,
    })
  }

  selectItem(evt, value){
    this.props.onExecute(value)
    this.setState({
      timeoutRemaining: this.props.sessionTimeout,
    })
  }

  minMax(minimized){
    this.setState({minimized: minimized})
    this.props.onToggleMinMax(minimized)
  }

  launchPopup(){
    const searchParams = new URLSearchParams(window.location.search.substring(1))
    searchParams.set('sessionId', this.props.sessionId)

    let url = `${window.location.origin}/chat/?${searchParams.toString()}`
    let params = `width=350,height=600,menubar=false,toolbar=false,location=false,status=false,resiable=true,scrollbars=false`
    window.open(url, 'mixchat', params)

    this.props.onLaunchedStandalone(url)
  }

  render() {
    let inputDisabled = this.state.timeoutRemaining < 1 || !this.props.active
    return (<div className={`chat-panel border rounded border-light border-2 ` + (this.state.minimized ? ' chat-panel-minimized ' : '')}>
      <div className={'handle card shadow-lg ' + (this.state.minimized ? 'border-dark' : 'border-light') }
        style={{
          'width': (this.state.minimized ? 'auto' : this.props.width),
          'height': (this.state.minimized ? '56px' : this.props.height),
          'overflow': 'hidden'
        }}>
        <div className={'card-header ' + (this.state.minimized ? 'bg-dark text-white' : '')}>
          <div className="card-header-bg">
            <FontAwesomeIcon icon={faComments}/> Chat 
            { !this.state.minimized && !(window.opener || window.top !== window.self) ? (
                <small>
                  &nbsp;&nbsp;
                  <Button variant="link" className="text-decoration-none" onClick={this.launchPopup.bind(this)}><FontAwesomeIcon icon={faExternalLinkAlt}/></Button>
                </small>
              ) : '' }
            { this.props.active ? (
              <CountdownTimer
                sessionTimeout={this.props.sessionTimeout}
                timeoutRemaining={this.state.timeoutRemaining}/>
            ) : '' }
            <MinMaxToggle toggle={this.minMax.bind(this)}/>
          </div>
        </div>
        <div className="card-body" style={chatPanelContainerStyles}>
          <div className="row" style={{height: '100%'}}>
            <dl id="messagesHnd" className="col" style={chatPanelMessagesStyles}>
              {this.renderMessages()}
            </dl>
          </div>
        </div>
        <div className="card-footer px-2 pb-2 border-0">
          <form className="form" onSubmit={
              (evt) => {
                evt.preventDefault();
                this.executeTextInput()
              }
            }>
            <div className="input-group">
              <input type="text"
                className="form-control"
                autoComplete="off"
                name="textInput"
                style={{'height': '50px'}}
                value={this.state.textInput}
                disabled={inputDisabled}
                id='textInput'
                placeholder="Type or ask me something"
                onChange={this.onChangeTextInput.bind(this)}
                onFocus={this.triggerAutoScroll.bind(this)} />
            </div>
          </form>
          { (!inputDisabled && this.isIVRExperience()) ? (
            <div className="row border-top border-2 mt-2">
              <div className="col-md-12 mt-2 mb-1">
                <Keypad 
                  name="dtmfInput" 
                  disabled={inputDisabled}
                  onKeypadInput={this.onChangeKeypadInput.bind(this)} 
                  settings={this.state.recognitionSettings} />
               </div>
               <div className="col-md-12 text-center mb-3">
                  <button 
                    className="btn btn-danger btn-sm px-3 py-3 rounded-circle"
                    disabled={inputDisabled}
                    onClick={(evt) => {
                      evt.preventDefault()
                      this.executeEventInput('HANGUP', 'User initiated.')
                    }}>
                      <FontAwesomeIcon icon={faPhoneSlash}/>
                  </button>
               </div>

             </div>
             ) : ''
          }
        </div>
      </div>
    </div>)
  }

}
