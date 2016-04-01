import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Button,ButtonToolbar} from 'amazeui-react';

export default class HeadButton extends Component {
    render() {
        if (this.props.type =="advice") {
            return (
                <div>
                <Link to="/add"><Button amStyle="primary">新增</Button></Link>
                </div>
            )
        }else{
            return (
            <div>
                <Link to="/add"><Button amStyle="primary">新增</Button></Link>
                <Link to="/add"><Button amStyle="primary">奖励</Button></Link>
            </div>
        )
        }
    }
}
