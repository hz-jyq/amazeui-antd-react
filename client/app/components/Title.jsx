import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Selected,ButtonToolbar,Header}from 'amazeui-react';
export default class Title extends Component {
  render() {
      var props = {
          title: '建议系统',
          data: {
              left: [
                  {
                      link: '/about',
                      icon: 'home',
                  },
                  {
                      link: '#phone-link',
                      icon: 'phone'
                  }
              ],
              right: [
                  {
                      link: '/',
                      icon: 'user',
                      title:'注销',
                      onSelect(){
                          localStorage.removeItem("Authorization")
                      }
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
