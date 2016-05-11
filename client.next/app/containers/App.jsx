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
          {this.props.children}
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
  children: PropTypes.node.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App)
