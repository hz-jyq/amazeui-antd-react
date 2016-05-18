import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Button,ButtonToolbar} from 'amazeui-react';

export default class HeadButton extends Component {
    render() {
            return (
                <div>
                <Link to={this.props.router}><Button amStyle="primary">新增</Button></Link>
                </div>
            )
        }
}
