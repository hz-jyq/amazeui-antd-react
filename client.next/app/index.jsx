import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import * as reducers from 'ducks'
import App from 'containers/App'
import HomePage from 'containers/HomePage'
import PublicPage from 'containers/SuggestionManagement/PublicPage'
import SubmitterPage from 'containers/SuggestionManagement/SubmitterPage'
import ReviewerPage from 'containers/SuggestionManagement/ReviewerPage'
import PresenterPage from 'containers/SuggestionManagement/PresenterPage'
import SuggestionTypesPage from 'containers/SuggestionManagementAdminArea/SuggestionTypesPage'
import AwardTypesPage from 'containers/SuggestionManagementAdminArea/AwardTypesPage'

import 'antd/style/index.less'


const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer }), {},
  applyMiddleware(createLogger())
)

const history = syncHistoryWithStore(browserHistory, store)
const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/suggestions/identifier=none" />

    <Route component={HomePage}>
      <Route path="/suggestions/identifier=none" component={PublicPage} />
      <Route path="/suggestions/identifier=submitter" component={SubmitterPage} />
      <Route path="/suggestions/identifier=reviewer" component={ReviewerPage} />
      <Route path="/awards/identifier=presenter" component={PresenterPage} />
      <Route path="/suggestion-types" component={SuggestionTypesPage} />
      <Route path="/award-types" component={AwardTypesPage} />
    </Route>
  </Route>
)

const mountDOM = document.getElementById('mountDOM')
render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), mountDOM)
