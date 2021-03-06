import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Breadcrumb,Icon,NavItem}from 'amazeui-react';
export default class NavIndex extends Component {
  render() {
    return (
        <Breadcrumb slash>
            <Breadcrumb.Item>
                <Icon icon="home" /><Link to="/login">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >后台管理</Breadcrumb.Item>
            <Breadcrumb.Item active>建议类型</Breadcrumb.Item>
        </Breadcrumb>
    )
  }
}
