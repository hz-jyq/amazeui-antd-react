import React, {Component,PropTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory,IndexLink,Link} from 'react-router';
import {NavItem,Nav,Icon,Panel} from 'amazeui-react';
import {render} from 'react-dom'
import Top from './Top';
import Tree from './MenuLeft';
import MyEvaluationCenter from './MyEvaluationCenter';
import AdviceTypeCenter from './AdviceTypeCenter';
import Title from './Title';
import Left from './Left';
import Footer from './FooterBuff';
import HeadButton from './HeadButton';
import Login from './Login';
import Registered from './Registered';
import MyOpinionCenter from './MyOpinionCenter';
import AddAdvice from './AddAdvice';
class Main extends Component {
  render() {
      return (
          <div>
             <Title/>
              <div >
               <Left/>
                  <div className="center">
               {this.props.children}
                      </div>
              </div>
          </div>
      )
  }
}
render((
    <Router history={browserHistory}>
        <Route path="/login" component={Main}>
            <Route path="/MyOpinionCenter" component={MyOpinionCenter} />
            <Route path="/MyEvaluationCenter" component={MyEvaluationCenter} />
            <Route path="/AdviceTypeCenter" component={AdviceTypeCenter} />
            <Route path="/add" component={AddAdvice} />
            <Route path="login" component={Footer} />
        </Route>
        <Route path="/" component={Login}></Route>
        <Route path="/registered" component={Registered}></Route>

    </Router>
), document.getElementById("main"))

