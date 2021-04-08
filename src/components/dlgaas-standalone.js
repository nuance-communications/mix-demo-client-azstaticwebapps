/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React, { useState } from "react"

import { AuthForm } from "./shared"
import ChatPanel from "./chat"
import DLGaaS from "./dlgaas"

//
// DLGaaS Standalone
//

// Client

export default class DlgStandalone extends DLGaaS {

  isStandalone(){
    return true
  }

  // App

  getAuthHtml(){
    return (
      <div className="col-md-6 offset-md-3">
        <AuthForm standalone={true} 
                tokenError={this.state.tokenError}
                initToken={this.initToken.bind(this)}
                clientId={this.state.clientId}
                clientSecret={this.state.clientSecret}
                onChangeTextInput={this.onChangeTextInput.bind(this)}
                serviceScope="dlg log" />
      </div>
    )
  }

  onToggleMinMax(minimized){
    if(window.parent){}
  }

  getBotSessionHtml(){
    return (
      <div className="col">
        <div className="row mt-4">
          <strong id="dlgaas-session-id">Session ID <span className='badge bg-light text-dark'>{this.state.sessionId}</span></strong>
          { this.state.isSessionActive ? (
              <button className="btn btn-danger mt-3" onClick={(evt) => {this.stop(); evt.preventDefault(); }}>Stop Session</button>
            ) : (
              <button className="btn btn-warning mt-3" onClick={(evt) => {this.restart(); evt.preventDefault(); }}>New Session</button>
            )
          }
          <ChatPanel
            onExecute={this.execute.bind(this)}
            rawResponses={this.state.rawResponses}
            autoScrollChatPanel={this.state.autoScrollChatPanel}
            width={`100%`}
            height={`100%`}
            sessionId={this.state.sessionId}
            sessionTimeout={this.state.sessionTimeout}
            active={this.state.isSessionActive}
            onSessionTimeoutEnded={this.stop.bind(this)}
            onToggleMinMax={this.onToggleMinMax.bind(this)}/>
        </div>
      </div>
    )
  }

}
