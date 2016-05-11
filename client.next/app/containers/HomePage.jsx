import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Menu } from 'antd'


class HomePage extends Component {
  handleMenuClick(e) {
    this.context.router.push(e.key)
  }

  isAdminUser() {
    return this.props.userRole === 'manager'
  }

  renderMenu() {
    if (!this.isAdminUser()) {
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
    let defaultOpenKeys = ['suggestion-management']
    if (['/suggestion-types', '/award-types'].includes(location.pathname)) {
      defaultOpenKeys.push('suggestion-management-admin-area')
    }

    return (
      <Row style={{ marginLeft: 120, marginRight: 120, marginTop: 48, background: '#FFFFFF' }} >
        <Col span="4">
          <Menu
            onClick={(e) => { this.handleMenuClick(e) }}
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
          >
            {this.renderMenu()}
          </Menu>
        </Col>
        <Col span="18" offset="1" style={{ marginTop: 48 }}>
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
  userRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

function mapStateToProps(state) {
  return {
    userRole: state.auth.userRole
  }
}

export default connect(mapStateToProps)(HomePage)
