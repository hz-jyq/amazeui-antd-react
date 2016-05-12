import React, { Component, PropTypes } from 'react'
import { Modal, Form, Input, RadioGroup, Radio, Select, Button } from 'antd'


class SuggestionTypeModal extends Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    return (
      <Modal visible={this.props.visible}>
        <Form
          horizontal
          form={this.props.form}
        >
          <Form.Item {...formItemLayout} label="名称：&nbsp;&nbsp;">
            <Input type="text" placeholder="请输入名称" />
          </Form.Item>

          <Form.Item {...formItemLayout} label="描述：&nbsp;&nbsp;">
            <Input type="textarea" placeholder="请输入描述" />
          </Form.Item>

          <Form.Item {...formItemLayout} label="公开：&nbsp;&nbsp;">
            <Radio.Group defaultValue="1">
              <Radio value="1">是</Radio>
              <Radio value="0">否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

SuggestionTypeModal.propTypes = {
  form: PropTypes.object.isRequired
}

export default Form.create()(SuggestionTypeModal)
