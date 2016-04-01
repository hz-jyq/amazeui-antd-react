import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Selected,Button}from 'amazeui-react';
export default class AmazeUi extends Component {
  render() {
      var data = [
          {value: 'one', label: 'One'},
          {value: 'two', label: 'Two'},
          {value: 'three', label: 'Three'}
      ];
      var props = {
          name: 'selected', // 注意设置 `name` 属性
          data: data,
          onChange: function(value) {
              console.log('当前值为：', value);
          }
      };
      return (
          <div>
          <form target="_blank">
              类型：<Selected {...props} />
              <Button type="submit">筛选</Button>
          </form>
      </div>
    );
  }
}
