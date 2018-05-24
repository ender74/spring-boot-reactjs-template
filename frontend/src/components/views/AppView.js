import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-intl-redux'

import App from './App'
import LandingPage from './landing-page/LandingPage'

function detectLocale() {
    var lang = window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.language
    if (lang.indexOf('-') !== -1)
        lang = lang.split('-')[0]

    if (lang.indexOf('_') !== -1)
        lang = lang.split('_')[0]

    return lang
}

class AppView extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
    }

    render() {
        return (
              <App>
                <Router>
                  <Switch>
                    <Route exact path='/' component = { LandingPage } />
                  </Switch>
                </Router>
              </App>
        )
    }
}

export default AppView
