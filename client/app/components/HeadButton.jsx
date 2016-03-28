import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Button} from 'amazeui-react';
export default class HeadButton extends Component {
  render() {
    return (
        <div>
            <Button amStyle="primary">新增</Button>
        </div>
    )
  }
}
