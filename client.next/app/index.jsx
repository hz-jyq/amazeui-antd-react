import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import * as reducers from 'ducks'
import App from 'containers/App'
import HomePage from 'containers/HomePage'

import 'antd/style/index.less'


const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer }), {},
  applyMiddleware(createLogger())
)

const history = syncHistoryWithStore(browserHistory, store)
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
  </Route>
)

const mountDOM = document.getElementById('mountDOM')
render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), mountDOM)
