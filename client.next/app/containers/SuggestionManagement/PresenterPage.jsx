import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class PresenterPage extends Component {
  render() {
    return (
      <h1>PRESENTER PAGE</h1>
    )
  }
}

PresenterPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(/* state */) {
  return {
    // ...
  }
}

export default connect(mapStateToProps)(PresenterPage)
