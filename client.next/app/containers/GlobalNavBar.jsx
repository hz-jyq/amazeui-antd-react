import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Menu, Icon } from 'antd'

import { cleanupToken } from 'ducks/auth'


class GlobalNavBar extends Component {
  handleMenuClick(e) {
    if (e.key === 'user:signOut') {
      localStorage.setItem('accessToken', '')
      this.props.dispatch(cleanupToken())
    }
  }

  renderDropdownMenu() {
    if (!this.props.isAuthenticated) {
      return (
        <Menu.Item disabled>
          <span>&nbsp;</span>
        </Menu.Item>
      )
    }

    return (
      <Menu.SubMenu title={<span><Icon type="user" />{this.props.userName}</span>}>
        <Menu.Item key="user:signOut">注销</Menu.Item>
      </Menu.SubMenu>
    )
  }

  render() {
    return (
      <Row style={{ background: '#FFFFFF' }}>
        <Col span="4" push="20">
          <Menu mode="horizontal" onClick={(e) => { this.handleMenuClick(e) }} >
            {this.renderDropdownMenu()}
          </Menu>
        </Col>
      </Row>
    )
  }
}

GlobalNavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accessToken: state.auth.accessToken,
    userName: state.auth.userName,
    userRole: state.auth.userRole
  }
}

export default connect(mapStateToProps)(GlobalNavBar)
