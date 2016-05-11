import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class PublicPage extends Component {
  render() {
    return (
      <h1>PUBLIC PAGE</h1>
    )
  }
}

PublicPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(/* state */) {
  return {
    // ...
  }
}

export default connect(mapStateToProps)(PublicPage)
