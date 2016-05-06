import React from 'react'
import { Form, FormGroup, FormControl, Col, Button } from 'react-bootstrap'


export default function SignInForm() {
  return (
    <Form horizontal>
      <FormGroup controlId="formUsername">
        <Col sm={12}>
          <FormControl type="text" placeholder="您的名称" />
        </Col>
      </FormGroup>

      <FormGroup controlId="formPassword">
        <Col sm={12}>
          <FormControl type="password" placeholder="您的密码" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col sm={12}>
          <Button className="btn-primary btn-block" type="submit">
            登录
          </Button>
        </Col>
      </FormGroup>
    </Form>
  )
}
