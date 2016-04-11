import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Button,ButtonToolbar} from 'amazeui-react';

export default class HeadButton extends Component {
    render() {
            var url=this.props.router;
            return (
                <div>
                <Link to={url}><Button amStyle="primary">新增</Button></Link>
                </div>
            )
        }
}
