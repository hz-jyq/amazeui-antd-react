import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class AwardTypesPage extends Component {
  render() {
    return (
      <h1>AWARD TYPES PAGE</h1>
    )
  }
}

AwardTypesPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(/* state */) {
  return {
  }
}

export default connect(mapStateToProps)(AwardTypesPage)
