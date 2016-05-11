import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class ReviewerPage extends Component {
  render() {
    return (
      <h1>REVIEWER PAGE</h1>
    )
  }
}

ReviewerPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(/* state */) {
  return {
    // ...
  }
}

export default connect(mapStateToProps)(ReviewerPage)
