import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Menu } from 'antd'


class HomePage extends Component {
  handleMenuClick(e) {
    this.context.router.push(e.key)
  }

  renderMenu() {
    if (this.props.userRole !== 'manager') {
      return (
        <Menu.SubMenu key="suggestion-management" title={<span>意见管理</span>}>
          <Menu.Item key="/suggestions/identifier=none">公共区域</Menu.Item>
          <Menu.Item key="/suggestions/identifier=submitter">我提出的</Menu.Item>
          <Menu.Item key="/suggestions/identifier=reviewer">待我审批</Menu.Item>
          <Menu.Item key="/awards/identifier=presenter">待我奖励</Menu.Item>
        </Menu.SubMenu>
      )
    }

    return (
      <Menu.SubMenu key="suggestion-management" title={<span>意见管理</span>}>
        <Menu.Item key="/suggestions/identifier=none">公共区域</Menu.Item>
        <Menu.Item key="/suggestions/identifier=submitter">我提出的</Menu.Item>
        <Menu.Item key="/suggestions/identifier=reviewer">待我审批</Menu.Item>
        <Menu.Item key="/awards/identifier=presenter">待我奖励</Menu.Item>
        <Menu.SubMenu key="suggestion-management-admin-area" title={<span>管理区域</span>}>
          <Menu.Item key="/suggestion-types">意见类型</Menu.Item>
          <Menu.Item key="/award-types">奖励类型</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    )
  }

  render() {
    return (
      <Row style={{ marginLeft: 120, marginRight: 120, marginTop: 48, background: '#FFFFFF' }} >
        <Col span="4">
          <Menu
            onClick={(e) => { this.handleMenuClick(e) }}
            defaultOpenKeys={['suggestion-management']}
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
          >
            {this.renderMenu()}
          </Menu>
        </Col>
        <Col>
          {this.props.children}
        </Col>
      </Row>
    )
  }
}

HomePage.contextTypes = {
  router: React.PropTypes.object
}

HomePage.propTypes = {
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

export default connect(mapStateToProps)(HomePage)
