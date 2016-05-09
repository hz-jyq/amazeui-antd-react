import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import request from 'superagent'

import SignInForm from 'components/SignInForm'
import { requestToken, refreshToken } from 'ducks/auth'


class SignIn extends Component {
  componentDidMount() {
    if (!this.shouldRefreshToken()) { return }

    request.post('/api/users/reauthenticate').type('json')
      .set('AUTHORIZATION', `Bearer ${this.props.accessToken}`)
      .end((error, response) => {
        if (error) {
          localStorage.setItem('accessToken', '')
          this.props.dispatch(refreshToken(error))
        } else {
          localStorage.setItem('accessToken', response.body.token)
          this.props.dispatch(refreshToken({ accessToken: response.body.token }))
        }
      })
  }

  shouldRefreshToken() {
    return this.props.accessToken !== ''
  }

  handleSignInFormSubmit(e, signInForm) {
    e.preventDefault()

    const form = signInForm.props.form
    form.validateFields((errors, values) => {
      if (!!errors) { return }

      request.post('/api/users/authenticate').type('json')
        .send({ user: values })
        .end((error, response) => {
          if (error) {
            localStorage.setItem('accessToken', '')
            this.props.dispatch(requestToken(error))
          } else {
            localStorage.setItem('accessToken', response.body.token)
            this.props.dispatch(requestToken({ accessToken: response.body.token }))
          }
        })
    })
  }

  render() {
    if (this.props.isAuthenticated) {
      return null
    }

    let contentDiv = null
    if (this.shouldRefreshToken()) {
      contentDiv = <Spin size="large" />
    } else {
      contentDiv = (
        <SignInForm
          handleSubmit={(e, signInForm) => { this.handleSignInFormSubmit(e, signInForm) }}
        />
      )
    }

    return (
      <div>
        {contentDiv}
      </div>
    )
  }
}

SignIn.propTypes = {
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

export default connect(mapStateToProps)(SignIn)
