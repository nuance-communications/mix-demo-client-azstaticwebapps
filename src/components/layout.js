/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React from "react"
import { Link } from "gatsby"
import { Location } from '@reach/router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "@popperjs/core/dist/umd/popper.min.js"
import "../stylesheets/main.css"

// styles
const pageStyles = {
  color: "#232129",
  padding: "40px 46px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 24,
}
const headingAccentStyles = {
  color: "rgb(41,180,197)",
}

export default class Layout extends React.Component {
  render() {
    return (<Location>
      {({ location, navigate }) => (
        <main style={pageStyles}>
          <title>Nuance Mix Demo Client</title>
          <h1 style={headingStyles} className="text-center display-4">
              <Link to={`/`+location.search} className="text-decoration-none text-dark">
                Nuance <span style={headingAccentStyles}>Mix</span>
              </Link>
          </h1>
          <div className="container">
            {this.props.children}
          </div>
        </main>
      )}
  </Location>)
  }
}

export class StandaloneLayout extends React.Component {
  render() {
    return (<Location>
      {({ location, navigate }) => (
        <main style={{padding: "6px 10px"}}>
          <div className="container standalone">
            {this.props.children}
          </div>
        </main>
      )}
  </Location>)
  }
}
