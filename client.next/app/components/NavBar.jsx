import React, { PropTypes } from 'react'
import { Navbar as BsNavbar, Nav as BsNav, NavDropdown as BsNavDropdown } from 'react-bootstrap'


export default function NavBar(props) {
  let navDropdown = ''
  if (props.isAuthenticated) {
    navDropdown = (
      <BsNav pullRight>
        <BsNavDropdown title={props.userName} id="nav-dropdown" />
      </BsNav>
    )
  }

  return (
    <BsNavbar>
      <BsNavbar.Header>
        <BsNavbar.Brand>
          <a href="#">意见反馈系统</a>
        </BsNavbar.Brand>
        <BsNavbar.Toggle />
      </BsNavbar.Header>
      <BsNavbar.Collapse>
        {navDropdown}
      </BsNavbar.Collapse>
    </BsNavbar>
  )
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
}
