import React, {Component,PropTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory,IndexLink,Link,hashHistory,RoutingContext} from 'react-router';
import {NavItem,Nav,Icon,Panel,Grid,Col,Container} from 'amazeui-react';
import {render} from 'react-dom'
import Title from './Title';
import Left from './Left';
import Login from './user/Login';
import Registered from './user/Registered';
import AdviceTypeCenter from './advice/*';
import AdviceTypeUpdate from './advice/AdviceTypeUpdate';
import AdviceTypeView from './advice/AdviceTypeView';
import AdviceTypeAdd from './advice/AdviceTypeAdd';
import request  from 'superagent';
import  NotFound from './NotFound';
import Footer from './FooterBuff';

class Main extends Component {
    render() {
      window.strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
      return (
          <div>
              <Grid  className="doc-g">
                  <Title/>
                  <div className="am-cf admin-main">
                  <Col sm={2}><Left/></Col>
                  <Col sm={10} className="admin-center"> {this.props.children}</Col>
                  </div>
              </Grid>
          </div>
      )
  }
}
render((
    <Router history={browserHistory}>
        <Route path="Main" component={Main}>
            <IndexRoute component={AdviceTypeCenter}/>
            <Route path="/AdviceTypeCenter" component={AdviceTypeCenter}/>
            <Route path="/AdviceTypeCenter/update"   component={AdviceTypeUpdate} />
            <Route path="/AdviceTypeCenter/view"   component={AdviceTypeView} />
            <Route path="/AdviceTypeAdd"   component={AdviceTypeAdd} />
            <Route path="*"   component={NotFound}/>
        </Route>
        <Route path="/" component={Login}/>
        <Route path="/registered" component={Registered}/>
    </Router>
), document.getElementById("main"))
