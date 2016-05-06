import React, { PropTypes } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'


export default function GlobalNavBar(props) {
  let navDropdown = ''
  if (props.isAuthenticated) {
    navDropdown = (
      <Nav pullRight>
        <NavDropdown title={props.userName} id="nav-dropdown" />
      </Nav>
    )
  }

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">意见反馈系统</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {navDropdown}
      </Navbar.Collapse>
    </Navbar>
  )
}

GlobalNavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
}
