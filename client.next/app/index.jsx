import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

const containerNode = document.getElementById('container')
const routes = (
  <Route path="/">
    {/**/}
  </Route>
)

render(<Router routes={routes} history={browserHistory} />, containerNode)
