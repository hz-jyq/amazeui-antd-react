import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Selected,ButtonToolbar,Header}from 'amazeui-react';
export default class Title extends Component {
  render() {
      var cutstomIcon =<img src="http://s.amazeui.org/media/i/brand/amazeui-cw.png" />;
      var props = {
          title: cutstomIcon,
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
                      title:'你好:jyq',
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
