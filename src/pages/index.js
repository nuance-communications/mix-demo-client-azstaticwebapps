/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import { useEffect } from 'react'
import { navigate } from 'gatsby'

// Redirect directly to CSR
export default () => {
  useEffect(() => {
    navigate('/app/'+window.location.search)
  }, [])
  return null
};
