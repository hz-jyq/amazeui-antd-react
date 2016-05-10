import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class SuggestionTypesPage extends Component {
  render() {
    return (
      <h1>SUGGESTION TYPES PAGE</h1>
    )
  }
}

SuggestionTypesPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(/* state */) {
  return {
  }
}

export default connect(mapStateToProps)(SuggestionTypesPage)
