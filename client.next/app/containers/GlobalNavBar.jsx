import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'

import { cleanupToken } from 'ducks/auth'


class GlobalNavBar extends Component {
  handleMenuClick(e) {
    if (e.key === 'user:sign_out') {
      localStorage.setItem('accessToken', '')
      this.props.dispatch(cleanupToken())
    }
  }

  render() {
    return (
      <Menu
        mode="horizontal"
        onClick={(e) => { this.handleMenuClick(e) }}
      >
        <Menu.SubMenu title={<span><Icon type="user" />{this.props.userName}</span>}>
          <Menu.Item key="user:sign_out">注销</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
  }
}

GlobalNavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accessToken: state.auth.accessToken,
    userName: state.auth.userName
  }
}

export default connect(mapStateToProps)(GlobalNavBar)
