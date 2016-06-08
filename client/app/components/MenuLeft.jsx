import React, {Component} from 'react';
import { render } from 'react-dom'
import {Router, Route, IndexRoute, browserHistory,IndexLink,Link} from 'react-router';
import {Accordion,Button,Icon,Menu,Topbar,CollapsibleNav,Nav,NavItem,ListItem,List,Panel,Titlebar} from 'amazeui-react';
import HeadButton from './HeadButton';
import Main from './Main';
import Footer from './FooterBuff';

export default class MenuLeft extends Component {
    render() {
         return (
          <Nav>
          <NavItem header={true}>意见管理</NavItem>
           <NavItem><Link to="/MyOpinionCenter">我提出的</Link></NavItem>
          <NavItem ><Link to="/MyEvaluationCenter">我评价的</Link></NavItem>
          <NavItem ><Link to="/EvaluationTypeCenter">待我奖励</Link></NavItem>
          <NavItem header={true}>后台管理</NavItem>
         <NavItem ><Link to="/AdviceTypeCenter">建议类型</Link></NavItem>
         <NavItem ><Link to="/EvaluationTypeCenter">评价管理</Link></NavItem>
        </Nav>
         )}}
