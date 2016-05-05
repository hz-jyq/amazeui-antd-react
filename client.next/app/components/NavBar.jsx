import React, { Component, PropTypes } from 'react'
import { Navbar as BsNavbar, Nav as BsNav, NavItem as BsNavItem, NavDropdown as BsNavDropdown } from 'react-bootstrap'


export default class NavBar extends Component {
  render() {
    return (
      <BsNavbar>
        <BsNavbar.Header>
          <BsNavbar.Brand>
            <a href="#">意见反馈系统</a>
          </BsNavbar.Brand>
          <BsNavbar.Toggle />
        </BsNavbar.Header>
        <BsNavbar.Collapse>
          {
            this.props.isAuthenticated
            ? <BsNav pullRight>
                <BsNavDropdown title={this.props.userName} id="nav-dropdown" />
              </BsNav>
            : ''
          }
        </BsNavbar.Collapse>
      </BsNavbar>
    )
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
}
