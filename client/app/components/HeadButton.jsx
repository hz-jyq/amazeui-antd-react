import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Button,ButtonToolbar,Icon} from 'amazeui-react';

export default class HeadButton extends Component {
    render() {
            const {router} = this.props;
            return (
                  <ButtonToolbar>
                    <Link to={router}><Button  amStyle="primary"><Icon icon="plus"></Icon>  新增</Button></Link>
                  </ButtonToolbar>
            )
        }
}
