import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Breadcrumb,Icon}from 'amazeui-react';
export default class BreadcrumbCenter extends Component {
  render() {
    return (
        <Breadcrumb slash>
            <Breadcrumb.Item href="http://www.amazeui.org">
                <Icon icon="home" />首页
            </Breadcrumb.Item>
            <Breadcrumb.Item href="http://www.amazeui.org">建议管理</Breadcrumb.Item>
            <Breadcrumb.Item active>我的建议</Breadcrumb.Item>
        </Breadcrumb>
    )
  }
}
