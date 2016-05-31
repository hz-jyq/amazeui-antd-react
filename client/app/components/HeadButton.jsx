import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Button,ButtonToolbar} from 'amazeui-react';

export default class HeadButton extends Component {
    render() {
            const {router} = this.props;
            return (
                <div>
                <Link to={router}><Button amStyle="primary">新增</Button></Link>
                </div>
            )
        }
}
