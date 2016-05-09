import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import GlobalNavBar from 'containers/GlobalNavBar'
import SignInPage from 'containers/SignInPage'


class App extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          <GlobalNavBar />
          <p>HOME PAGE</p>
        </div>
      )
    }

    return (
      <div>
        <GlobalNavBar />
        <SignInPage />
      </div>
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accessToken: state.auth.accessToken,
    userName: state.auth.userName
  }
}

export default connect(mapStateToProps)(App)
