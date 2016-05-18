import React, {Component,PropTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory,IndexLink,Link,hashHistory,RoutingContext} from 'react-router';
import {NavItem,Nav,Icon,Panel,Grid,Col,Container} from 'amazeui-react';
import {render} from 'react-dom'
import Title from './Title';
import Left from './Left';
import Login from './user/Login';
import Registered from './user/Registered';
import AdviceTypeCenter from './advice/AdviceTypeCenter';
import AdviceTypeUpdate from './advice/AdviceTypeUpdate';
import AdviceTypeView from './advice/AdviceTypeView';
import AdviceTypeAdd from './advice/AdviceTypeAdd';
import request  from 'superagent';

class Main extends Component {
    render() {
        window.strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
      return (
          <div>
              <Grid  className="doc-g">
                  <Title/>
                  <Col sm={1}><Left/></Col>
                  <Col sm={11}> {this.props.children}</Col>
              </Grid>
          </div>
      )
  }
}
render((
    <Router history={browserHistory}>
        <Route path="/login" component={Main}>
            <Route path="/AdviceTypeCenter" component={AdviceTypeCenter} />
            <Route path="/AdviceTypeCenter/update"   component={AdviceTypeUpdate} />
            <Route path="/AdviceTypeCenter/view"   component={AdviceTypeView} />
            <Route path="/AdviceTypeAdd"   component={AdviceTypeAdd} />
        </Route>
        <Route path="/" component={Login}></Route>
        <Route path="/registered" component={Registered}></Route>
    </Router>
), document.getElementById("main"))
