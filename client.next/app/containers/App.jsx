import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SignIn from 'containers/SignIn'


class App extends Component {
  render() {
    let contentDiv = null
    if (this.props.isAuthenticated) {
      contentDiv = <p>HOME PAGE</p>
    } else {
      contentDiv = <SignIn />
    }

    return (
      <div>
        {contentDiv}
      </div>
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accessToken: state.auth.accessToken
  }
}

export default connect(mapStateToProps)(App)
