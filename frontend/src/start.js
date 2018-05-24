import polyfills from './polyfills'

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'
import frLocaleData from 'react-intl/locale-data/fr'
import esLocaleData from 'react-intl/locale-data/es'

function init() {
    polyfills()

    const locales = [enLocaleData, deLocaleData[0], frLocaleData, esLocaleData]
    const flatLocales = []

    locales.forEach(f => {
        if (typeof(f) == 'array') {
            f.forEach(ff => flatLocales.push(ff))
        } else {
            flatLocales.push(f)
        }
    })

    addLocaleData( flatLocales )
}

function renderApp() {
    require('./components/main')
}

window.onerror = function(message, source, lineno, colno, error) {
    alert(message)
}

init()
renderApp()
