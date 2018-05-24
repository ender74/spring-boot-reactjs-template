'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import AppView from './views/AppView'
import LandingPage from './views/landing-page/LandingPage'

ReactDOM.hydrate(<AppView><LandingPage/></AppView>, document.getElementById("container"))
