import React, {Component} from 'react';
import { render } from 'react-dom'
import {Router, Route, IndexRoute, browserHistory,IndexLink,Link} from 'react-router';
import {Accordion,Button,Icon,Menu,Topbar,CollapsibleNav,Nav,NavItem,ListItem,List,Panel} from 'amazeui-react';
import HeadButton from './HeadButton';
import Center from './AdviceTypeCenter';
import Main from './Main';
import Footer from './FooterBuff';

export default class MenuLeft extends Component {
    render() {
         var data=[{link:'/',title:'公司',subCols:2,subMenu:[{link:'/about',title:'公司'},{link:'/inbox',title:'人物'},{link:'##',title:'趋势'},{link:'##',title:'投融资'},{link:'##',title:'创业公司'},{link:'##',title:'创业人物'}]}];
         var handleClick = function(nav, index, e) {
         if (nav && nav.subMenu) {
         this.handleToggle();
         } else {
         e.preventDefault();
         console.log('点击的链接为：', nav);
         this.handleToggle();
         }
         }
        var themes = [ 'gapped'];
        var br = <br />;
         return (
    <div className="tree left">
        <Nav>
            <NavItem href="http://www.amazeui.org">
                <Icon icon="home" />首页</NavItem>
                 <NavItem><Link to="/MyOpinionCenter">我的建议</Link></NavItem>
                 <NavItem ><Link to="/MyEvaluationCenter">我的评价</Link></NavItem>
                 <NavItem ><Link to="/adviceTypeCenter">类型管理</Link></NavItem>
                 <NavItem ><Link to="/EvaluationTypeCenter">评价管理</Link></NavItem>
        </Nav>
        </div>
              /* <Menu
               cols={3}
               theme="dropdown2"><li><Link to="/about">About</Link></li></Menu>*/
              /*     <Menu
               cols={3}
               data={data} theme="dropdown2"
               onSelect={handleClick} />
        /*   if (this.state.active){
         return <Link to={data.link}  activeStyle={{ color: 'red' }}>{this.props.name}</Link>;
         }else{
         return <span onMouseOver={this.handleMouseOver}>{this.props.name}</span>;
         }
         }
    }
}*/
         )}}





