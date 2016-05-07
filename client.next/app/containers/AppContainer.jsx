import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'


class App extends Component {
  componentWillMount() {
    if (this.props.accessToken !== '') {
      // TODO
    }
  }

  render() {
    return (
      <Spin size="large" />
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
