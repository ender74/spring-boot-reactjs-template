import React, { Component } from 'react'
import { Grid, Jumbotron, Button, Glyphicon } from 'react-bootstrap'

const LandingPage = (props) => {
  const { children } = props

  return (
    <Grid>
        <Jumbotron>
            <h1>Hi There!</h1>
            <p>
              React.JS frontend integrated into spring-boot
            </p>
            <p>
                <Button bsStyle="success" onClick={ () => alert('I like it!') }>
                    <Glyphicon glyph='log-in' /> &nbsp;vote
                </Button>
            </p>
        </Jumbotron>
    </Grid>
    )
}

export default LandingPage
module.exports = LandingPage
