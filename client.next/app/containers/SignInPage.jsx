import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Spin, Row, Col, message } from 'antd'
import request from 'superagent'

import SignInForm from 'components/SignInForm'
import { requestToken, refreshToken } from 'ducks/auth'

import LogoImage from 'assets/images/logo.png'


class SignInPage extends Component {
  componentDidMount() {
    if (this.shouldRefreshToken()) {
      this.refreshToken()
    }
  }

  handleSignInFormSubmit(e, form) {
    e.preventDefault()

    form.validateFields((errors, values) => {
      if (!errors) {
        this.requestToken({ user: values })
      }
    })
  }

  shouldRefreshToken() {
    return !this.props.isAuthenticated && this.props.accessToken !== ''
  }

  refreshToken() {
    request.post('/api/users/re-authenticate').type('json')
      .set('AUTHORIZATION', `Bearer ${this.props.accessToken}`)
      .end((error, response) => {
        if (error) {
          localStorage.setItem('accessToken', '')
          this.props.dispatch(refreshToken(error))
        } else {
          localStorage.setItem('accessToken', response.body.accessToken)
          this.props.dispatch(refreshToken(response.body))
        }
      })
  }

  requestToken(credentials) {
    request.post('/api/users/authenticate').type('json')
      .send(credentials)
      .end((error, response) => {
        if (error) {
          if (response.body && response.body.error) { message.error(response.body.error) }
          localStorage.setItem('accessToken', '')
          this.props.dispatch(requestToken(error))
        } else {
          localStorage.setItem('accessToken', response.body.accessToken)
          this.props.dispatch(requestToken(response.body))
        }
      })
  }

  render() {
    if (this.props.isAuthenticated) {
      return null
    }

    if (this.shouldRefreshToken()) {
      return (
        <Row type="flex" justify="center" align="middle" style={{ marginTop: 60 }}>
          <Col span="4">
            <Spin size="large" />
          </Col>
        </Row>
      )
    }

    return (
      <Row type="flex" justify="center" align="middle" style={{ marginTop: 72 }}>
        <Col span="20" style={{ maxWidth: 480, background: '#FFFFFF' }}>
          <img
            src={LogoImage}
            role="presentation"
            style={{
              display: 'block',
              marginLeft: 'auto', marginRight: 'auto',
              marginTop: 36, marginBottom: 24,
              maxWidth: 240
            }}
          />

          <SignInForm
            handleSubmit={(e, form) => { this.handleSignInFormSubmit(e, form) }}
          />
        </Col>
      </Row>
    )
  }
}

SignInPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accessToken: state.auth.accessToken
  }
}

export default connect(mapStateToProps)(SignInPage)
