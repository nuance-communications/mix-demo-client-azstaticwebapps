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
import Header from "../images/mix-header.png"

// styles
const pageStyles = {
  position: "fixed",
  color: "#232129",
  padding: "0px 0px",
  fontFamily: "Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 24,
}
const headingAccentStyles = {
  color: "rgb(41,180,197)",
}
const headingImageStyles = {
  height: 'auto',
  width: '100%',
  objectFit: 'contain',
}

export default class Layout extends React.Component {
  render() {
    return (<Location>
      {({ location, navigate }) => (
        <main className="h-100" style={pageStyles}>
          <title>Nuance Mix Demo Client</title>
          <Link to={`/`+location.search} className="text-decoration-none text-dark">
            <img className="text-center display-4" style={headingImageStyles} src={Header}/>
          </Link>
          <div className="container-fluid gx-0 h-100">
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
