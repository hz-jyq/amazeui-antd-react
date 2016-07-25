import React, {Component} from 'react';
import { render } from 'react-dom'
import {Router, Route, IndexRoute, browserHistory,IndexLink,Link} from 'react-router';
import {Accordion,Button,Icon,Menu,Topbar,CollapsibleNav,Nav,NavItem,ListItem,List,Panel,Titlebar,PanelGroup} from 'amazeui-react';
import HeadButton from './HeadButton';
import Main from './Main';
import Footer from './FooterBuff';

export default class MenuLeft extends Component {
    render() {
         return (
          <div className="admin-sidebar am-offcanvas">
         <PanelGroup defaultActiveKey="1" accordion >
              <Panel header="用户管理"  eventKey="1" amStyle="white">
              <List static fill className="menu">
                    <ListItem><Icon icon="check"></Icon>每个人都有</ListItem>
                    <ListItem><Icon icon="check"></Icon>我把最深沉</ListItem>
                    <ListItem><Icon icon="check"></Icon>你不懂我</ListItem>
                    <ListItem><Icon icon="check"></Icon>每个人</ListItem>
            </List>
            </Panel>
            <Panel header="后台管理" eventKey="2" amStyle="white">
              <List static fill className="menu">
                <ListItem><Link to="/AdviceTypeCenter"><Icon icon="check"/>建议类型</Link></ListItem>
                <ListItem><Icon icon="check"></Icon>我把最深沉</ListItem>
            </List>
            </Panel>
            <p></p>
            <PanelGroup>
              <Panel amStyle="white">
              <p><span className="am-icon-bookmark"></span>公告</p>
              <p>时光静好，与君语；细水流年，与君同。—— Amaze UI</p>
              </Panel>
              <Panel amStyle="white">
              <p><span className="am-icon-tag"></span> wiki</p>
              <p>Welcome to the Amaze UI wiki!</p>
              </Panel>
          </PanelGroup>
         </PanelGroup>
       </div>
      /**  <ul className="am-list admin-sidebar-list">
         <li><a href="admin-index.html"><span className="am-icon-home"></span> 首页</a></li>
         <li className="admin-parent">

        <Panel header="面板标题">
          <ul className="am-list admin-sidebar-sub am-collapse" id="collapse-nav">
            <li><a href="admin-user.html" className="am-cf"><span className="am-icon-check"></span> 个人资料<span className="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
            <li><a href="admin-help.html"><span className="am-icon-puzzle-piece"></span> 帮助页</a></li>
            <li><a href="admin-gallery.html"><span className="am-icon-th"></span> 相册页面<span className="am-badge am-badge-secondary am-margin-right am-fr">24</span></a></li>
            <li><a href="admin-log.html"><span className="am-icon-calendar"></span> 系统日志</a></li>
            <li><a href="admin-404.html"><span className="am-icon-bug"></span> 404</a></li>
          </ul>
          </Panel>
         </li>
         <li><a href="admin-table.html"><span className="am-icon-table"></span> 表格</a></li>
         <li><a href="admin-form.html"><span className="am-icon-pencil-square-o"></span> 表单</a></li>
         <li><a href="#"><span className="am-icon-sign-out"></span> 注销</a></li>
       </ul>
**/
         )}}
