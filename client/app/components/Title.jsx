import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Selected,ButtonToolbar,Header}from 'amazeui-react';
export default class Title extends Component {
  render() {
      var props = {
          title: '后台管理',
          data: {
              left: [
                  {
                      link: '#left-link',
                      icon: 'home',
                  },
                  {
                      link: '#phone-link',
                      icon: 'phone'
                  }
              ],
              right: [
                  {
                      link: '#user-link',
                      icon: 'user',
                      title:'注销'
                  }
              ]
          }}
      return (
      <div>
          <Header {...props}/>
      </div>
    );
  }
}
