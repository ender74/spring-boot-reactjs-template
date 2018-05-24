'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'

function renderToString(reactComponent) {
    const react = ReactDOM.renderToString(reactComponent)
    console.log(react.length)
    return react   
}

export default renderToString
module.exports = renderToString