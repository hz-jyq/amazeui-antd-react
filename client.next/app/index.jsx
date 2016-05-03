import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import * as reducers from './reducers'


const store = createStore(combineReducers(Object.assign({}, reducers, { routing: routerReducer })))
const history = syncHistoryWithStore(browserHistory, store)
const containerNode = document.getElementById('container')

ReactDOM.render((
  <Provider store={store}>
    <Router history={history} />
  </Provider>
), containerNode)
