import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'

class AppHeader extends Component {
    constructor() {
        super()
        this.state = {
            expanded: false
        }
    }

    render() {
      const collapseNav = () => {
          this.setState({
              expanded: false
          })
      }
      const wrapCollapse = f => () => {
          collapseNav()
          f()
      }
      const sayHello = txt => {
        alert(txt)
      }
      return (
            <Navbar fixedTop fluid expanded={this.state.expanded} onToggle={(expanded) => this.setState({expanded: expanded})}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Spring Boot + React.JS</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={1} title='Menü' id='select-language'>
                            <NavItem eventKey={1.1} onClick={ wrapCollapse(() => sayHello('Hallo')) }>
                              Hallo
                            </NavItem>
                            <NavItem eventKey={1.2} onClick={ wrapCollapse(() => sayHello('Welt')) }>
                              Welt
                            </NavItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default AppHeader
