import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SignInContainer from 'containers/SignInContainer'


class App extends Component {
  ComponentDidMount() {
    //
  }

  render() {
    let contentDiv = null
    if (this.props.isAuthenticated) {
      contentDiv = (
        <p>HOME PAGE</p>
      )
    } else {
      contentDiv = (
        <SignInContainer />
      )
    }

    return (
      <div>
        {contentDiv}
      </div>
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App)
