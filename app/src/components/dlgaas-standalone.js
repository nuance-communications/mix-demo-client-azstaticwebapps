/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React from "react"

import { AuthForm, VERSION } from "./shared"
import ChatPanel from "./chat"
import DLGaaS from "./dlgaas"
import { ProcessingState } from "./asraas"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

//
// DLGaaS Standalone
//

// Client

export default class DlgStandalone extends DLGaaS {

  constructor(){
    super()
    this.domElement = React.createRef()
    this.loading = true
  }

  init(){
    // standalone init means init token,
    // connect to dlgaas
    // start any simulation needs
    // and trigger a startRequest
    if(this.shouldAutoStart()){
      this.initToken(this.getScope())
        .then(() => {
          console.info("DLG Client Ready.")
          if(this.state.clientId 
            && this.state.clientSecret){
            return this.go().then(() => {
              this.loading = false
            })
          }
        })
    }
  }

  shouldAutoStart(){
    if(!this.loading){
      return false
    }
    return this.isStandalone() 
      && this.state.clientId 
      && this.state.clientSecret
  }

  isStandalone(){
    return true
  }

  getScope(){
    return 'dlg asr tts'
  }

  // App

  getLoadingHtml(){
    return (
      <div className="col h-100">
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="chat-header-img mb-5" width={'15%'}></div>
          <div className="text-center">
            <small>v{VERSION}</small>
            <br/>
            <FontAwesomeIcon spin={true} icon={faCircleNotch}/>
          </div>
          
        </div>
      </div>
    )
  }

  getAuthHtml(){
    let html = ''
    if(this.shouldAutoStart()){
      html = this.getLoadingHtml()
    } else {
      html = (
        <div className="col-md-6 offset-md-3">
          <AuthForm standalone={true} 
              tokenError={this.state.tokenError}
              initToken={this.initToken.bind(this)}
              clientId={this.state.clientId}
              clientSecret={this.state.clientSecret}
              onChangeTextInput={this.onChangeTextInput.bind(this)}
              serviceScope={this.getScope()} />
        </div>
      )
    }
    return html
  }

  onToggleMinMax(minimized){
    if(window.parent){}
  }

  getConfigureSessionHtml(){
    if(this.shouldAutoStart()){
      return this.getLoadingHtml()
    }
    return super.getConfigureSessionHtml()
  }

  getBotSessionHtml(){
    const chatResponses = this.getChatResponses()
    return (
      <div className="col">
        <div className="row mt-4" ref={this.domElement}>
          <div className="text-center">
            <strong id="dlgaas-session-id">Session ID <span className='badge bg-light text-dark'>{this.state.sessionId}</span></strong>
            <br/>
            { this.state.isSessionActive ? (
                <button className="btn btn-danger mt-3" onClick={(evt) => {this.stop(); evt.preventDefault(); }}>Stop Session</button>
              ) : (
                <button className="btn btn-warning mt-3" onClick={(evt) => {this.restart(); evt.preventDefault(); }}>New Session</button>
              )
            }
          </div>
          <ChatPanel
            simulateExperience={this.state.simulateExperience}
            onExecute={this.execute.bind(this)}
            rawResponses={chatResponses}
            autoScrollChatPanel={this.state.autoScrollChatPanel}
            width={`100%`}
            height={`100%`}
            sessionId={this.state.sessionId}
            sessionTimeout={this.state.sessionTimeout}
            active={this.state.isSessionActive}
            onSessionTimeoutEnded={this.stop.bind(this)}
            recognitionSettings={this.state.recognitionSettings}
            onToggleMicrophone={this.onToggleMicrophone.bind(this)}
            microphone={this.state.microphone}
            micVizWidth={this.chatWidth-5}
            isListening={ProcessingState.IN_FLIGHT===this.state.processingState}
            isProcessingInput={ProcessingState.AWAITING_FINAL===this.state.processingState}
            onToggleMinMax={this.onToggleMinMax.bind(this)}/>
        </div>
      </div>
    )
  }

}
