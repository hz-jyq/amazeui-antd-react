import React, {Component,PropTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory,IndexLink,Link,hashHistory,RoutingContext} from 'react-router';
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
import MyOpinionCenter from './OpinionCenter';
import AddAdvice from './AddAdviceType';
import UpdateAdvice from './UpdateAdvice';
import ViewAdvice from './ViewAdvice';
import AddOpinion from './AddOpinion';
import EvaluationTypeCenter from './EvaluationTypeCenter';
import addEvaluationType from './AddEvaluationType';


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
    <Router history={hashHistory}>
        <Route path="/login" component={Main}>
            <Route path="/MyOpinionCenter" component={MyOpinionCenter} />
            <Route path="/MyEvaluationCenter" component={MyEvaluationCenter} />
            <Route path="/EvaluationTypeCenter" component={EvaluationTypeCenter} />
            <Route path="/AdviceTypeCenter" component={AdviceTypeCenter} />
            <Route path="/AdviceTypeCenter/update"   component={UpdateAdvice} />
            <Route path="/AdviceTypeCenter/view"   component={ViewAdvice} />
            <Route path="/addAdviceType" component={AddAdvice} />
            <Route path="/addOpinion" component={AddOpinion} />
            <Route path="/addEvaluation" component={AddAdvice} />
            <Route path="/addEvaluationType" component={addEvaluationType} />
        </Route>
        <Route path="/" component={Login}></Route>
        <Route path="/registered" component={Registered}></Route>
    </Router>
), document.getElementById("main"))

