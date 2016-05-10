import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Menu, Icon } from 'antd'


class HomePage extends Component {
  renderMenu() {
    return (
      <Menu
        defaultOpenKeys={['suggestionManagement']}
        mode="inline">
        <Menu.SubMenu key="suggestionManagement" title={<span>意见管理</span>}>
          <Menu.Item key="asGuest">公共区域</Menu.Item>
          <Menu.Item key="asSubmitter">我提出的</Menu.Item>
          <Menu.Item key="asReviewer">待我审批</Menu.Item>
          <Menu.Item key="asAwardPresenter">待我奖励</Menu.Item>
          <Menu.SubMenu key="suggestionManagementAdminArea" title={<span>管理区域</span>}>
            <Menu.Item key="suggestionTypes">意见类型</Menu.Item>
            <Menu.Item key="awardTypes">奖励类型</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    )
  }

  render() {
    return (
      <Row style={{ marginLeft: 120, marginRight: 120, marginTop: 48, background: '#FFFFFF' }} >
        <Col span="4">
          {this.renderMenu()}
        </Col>
        <Col>
          {this.props.children}
        </Col>
      </Row>
    )
  }
}

HomePage.propTypes = {
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

export default connect(mapStateToProps)(HomePage)
