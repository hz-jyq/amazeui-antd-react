import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class SubmitterPage extends Component {
  render() {
    return (
      <h1>SUBMITTER PAGE</h1>
    )
  }
}

SubmitterPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(/* state */) {
  return {
  }
}

export default connect(mapStateToProps)(SubmitterPage)
