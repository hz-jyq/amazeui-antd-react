import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Accordion,Button,Icon}from 'amazeui-react';
export default class Tree extends Component {

  render() {
      var data = [
          {
              "title": "建议管理",
              "content": "<div><Icon amSize='lg' icon='home' /><a href='http://www.baidu.com'>我的意见</a></div><div><br/><a>222</a></div>",
              Icon:'home'
          },
          {
              "title": "评价管理",
              "content": "<div><a href='http://www.baidu.com'>22222</a></div><div><br/><a>222</a></div>",
          },
          {
              "title": "实施管理",
              "content": "心散的像画？"
          }];
      var themes = [ 'gapped'];
      var br = <br />;
      return (
          <div className="left tree">
              {themes.map(function(theme, index) {
                  return (
                      <div key={index}>
                          {index > 0 ? br : null}
                          <Accordion   data={data} theme={theme} key={index} />
                      </div>
                  );
              })
              }
          </div>

      )
  }
}
