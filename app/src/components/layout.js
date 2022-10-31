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
import { Helmet } from 'react-helmet'
import { BaseClass } from '../components/shared'

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
const headingImageStyles = {
  height: 'auto',
  width: '100%',
  objectFit: 'contain',
}

export default class Layout extends BaseClass {

  render() {
    return (<Location>
      {({ location, navigate }) => (
        <main className="h-100" style={pageStyles}>
          <title>Nuance Mix Demo Client</title>
          <Link to={`/`+location.search} className="text-decoration-none text-dark d-block position-relative">
            <img alt={`Nuance Mix`} className="text-center display-4" style={headingImageStyles} src={Header}/>
          </Link>
          <div className="container-fluid gx-0 h-100">
            {this.props.children}
          </div>
        </main>
      )}
  </Location>)
  }
}

export class StandaloneLayout extends Layout {
  render() {
    return (<Location>
      {({ location, navigate }) => (
        <main style={{padding: "6px 10px"}}>
          <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          </Helmet>
          <div className="container standalone">
            {this.props.children}
          </div>
        </main>
      )}
  </Location>)
  }
}
