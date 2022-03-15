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
import { StandaloneLayout } from "../components/layout"
import DlgStandalone from "../components/dlgaas-standalone"


const App = () => {
  return (
    <StandaloneLayout>
      <Router basepath="/">
        <DlgStandalone path="/chat"/>
      </Router>
    </StandaloneLayout>
  )
}

export default App
