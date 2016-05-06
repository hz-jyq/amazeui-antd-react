import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import NavBar from '../components/NavBar'


class App extends Component {
  componentWillMount() {
    // TODO
  }

  render() {
    return (
      <NavBar isAuthenticated={this.props.isAuthenticated} userName={this.props.userName} />
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accessToken: state.auth.accessToken,
    userName: state.auth.userName
  }
}

export default connect(mapStateToProps)(App)
