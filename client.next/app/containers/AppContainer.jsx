import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Col, Panel } from 'react-bootstrap'

import GlobalNavBar from '../components/GlobalNavBar'
import SignInForm from '../components/SignInForm'


class App extends Component {
  componentWillMount() {
    if (this.props.accessToken !== '') {
      // TODO
    }
  }

  render() {
    let contentDiv = ''
    if (this.props.isAuthenticated) {
      contentDiv = (
        <Jumbotron>
          <h1>您好，有什么需要帮助的吗？</h1>
        </Jumbotron>
      )
    } else {
      if (this.props.accessToken === '') {
        contentDiv = (
          <Col sm={4} smOffset={4}>
            <Panel>
              <SignInForm />
            </Panel>
          </Col>
        )
      } else {
        // TODO
      }
    }

    return (
      <div>
        <GlobalNavBar
          isAuthenticated={this.props.isAuthenticated}
          userName={this.props.userName}
        />

        <div className="container">
          {contentDiv}
        </div>
      </div>
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
