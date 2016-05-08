import React, { Component, PropTypes } from 'react'
import { Form, Input, Button } from 'antd'


class SignInForm extends Component {
  render() {
    const { getFieldProps } = this.props.form

    const nameProps = getFieldProps('name', {
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
      <Form horizontal form={this.props.form} onSubmit={(e) => { this.props.handleSubmit(e, this) }}>
        <Form.Item {...formItemLayout} label="帐号：&nbsp;&nbsp;">
          <Input {...nameProps} type="text" placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item {...formItemLayout} label="密码：&nbsp;&nbsp;">
          <Input {...passwordProps} type="password" placeholder="请输入密码" />
        </Form.Item>

        <Form.Item {...formItemLayout} label=" ">
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

export default Form.create()(SignInForm)
