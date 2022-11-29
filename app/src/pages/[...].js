/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile"
import DLGaaS from "../components/dlgaas"
import NLUaaS from "../components/nluaas"
import TTSaaS from "../components/ttsaas"
import ASRaaS from "../components/asraas"
import LogEvents from "../components/logging"

const App = () => {
  return (
    <Layout>
      <Router basepath="/">
        <ASRaaS path="/app/asr"/>
        <TTSaaS path="/app/tts"/>
        <NLUaaS path="/app/nlu"/>
        <DLGaaS path="/app/dlg"/>
        <LogEvents path="/app/logging"/>
        <Profile path="/app"/>
      </Router>
    </Layout>
  )
}

export default App
