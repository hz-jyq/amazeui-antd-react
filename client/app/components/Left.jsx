import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Topbar,NavItem,Nav,Panel}from 'amazeui-react';
import Menu from  './MenuLeft';
export default class Left extends Component {
  render() {
      return (
         <div>
                <Menu/>
          </div>
    );
  }
}
