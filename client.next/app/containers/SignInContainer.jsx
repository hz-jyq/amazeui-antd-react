import React, { Component, PropTypes } from 'react'
import { Spin, Form, Input, Checkbox, Button } from 'antd'


class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return
      }

      console.log(values)
      this.setState({
        isLoading: true
      })
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spin size="large" />
      )
    }

    const { getFieldProps } = this.props.form

    const usernameProps = getFieldProps('username', {
      rules: [
        { required: true, message: '请输入用户名' }
      ]
    })

    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, message: '请输入密码' }
      ]
    })

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    return (
      <Form horizontal form={this.props.form} onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Item {...formItemLayout} label="帐号：&nbsp;&nbsp;">
          <Input {...usernameProps} type="text" placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item {...formItemLayout} label="密码：&nbsp;&nbsp;">
          <Input {...passwordProps} type="password" placeholder="请输入密码" />
        </Form.Item>

        <Form.Item {...formItemLayout} label=" ">
          <Checkbox defaultChecked={false} disabled />记住我
        </Form.Item>

        <Form.Item {...formItemLayout} label=" ">
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

SignInForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  form: PropTypes.object
}

export default Form.create()(SignInForm)
