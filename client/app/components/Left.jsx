import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Topbar,NavItem,Nav}from 'amazeui-react';
import Tree from  './Tree';
export default class Left extends Component {
  render() {
      return (
         <div>
                <Tree/>
          </div>
    );
  }
}
