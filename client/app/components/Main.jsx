import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {NavItem,Nav,Icon} from 'amazeui-react';
import Top from './Top';
import Tree from './Tree';
import Center from './Center';
import Title from './Title';
import Left from './Left';

export default class Main extends Component {
  render() {
      return (
          <div>
             <div>
                <Title/>
             </div>
              <div >
               <Left/>
              <Center/>
              </div>
          </div>
      )
  }
}
