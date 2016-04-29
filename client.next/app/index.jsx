import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistroy } from 'react-router'

const containerNode = document.getElementById('container')
const routes = (
  <Route path="/">
    {/**/}
  </Route>
)

render(<Router routes={routes} history={browserHistroy} />, containerNode)
