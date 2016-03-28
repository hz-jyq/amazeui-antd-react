import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Slider,Input,Icon,Grid,Col,Form,Button}from 'amazeui-react';
export default class AmazeUi extends Component {
  render() {
      var onSelect = (index, direction) => {
          console.log('激活的幻灯片编号：', index, '，滚动方向：', direction);
      };
      var open =(e) => {
          window.location.href="/app/registered.ht  ml"
      }
      var login=(eve)=> {
        //  debugger;
          var  form=eve.currentTarget.form;
          window.location.href="/jsp/main.html"
      }
      var iconUser = <Icon icon="user" />;
      var iconPwd = <Icon icon="lock" />;
      return (
      <div>
          <Slider onSelect={onSelect}>
              <Slider.Item>
                  <img
                      src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/>
              </Slider.Item>
              <Slider.Item><img
                  src="http://s.amazeui.org/media/i/demos/bing-2.jpg"/></Slider.Item>
              <Slider.Item>
                  <img
                      src="http://s.amazeui.org/media/i/demos/bing-3.jpg"/></Slider.Item>
              <Slider.Item>
                  <img
                      src="http://s.amazeui.org/media/i/demos/bing-4.jpg"/></Slider.Item>
          </Slider>
          <Grid>
              <Col sm={8} smCentered>
                  <Form action="/app/jsp/main.html">
                      <fieldset className="am-form-set">
                          <Input addonBefore={iconUser} placeholder="用户名"  id="name"/>
                          <Input addonBefore={iconPwd} placeholder="密码" type="password" id="pwd" />
                      </fieldset>
                      <Input type="submit" value="提交" amStyle="primary" block onClick={login} />
                      <Button   amStyle="primary" block  onClick={open}>注册</Button>
                  </Form>
              </Col>
          </Grid>
      </div>
    );
  }
}
