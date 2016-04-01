import React, {Component,propTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Slider,Input,Icon,Grid,Col,Form,Button}from 'amazeui-react';
import request  from 'superagent';

export default class Login extends Component {
  render() {
      var login=(eve)=> {
         var  form=eve.currentTarget.form;
         var inputs=form.getElementsByTagName("input");
         var name=inputs.name.value;
          if(name===""){

          }
          request.post(' http://172.16.160.64:3000/users/authenticate').set('Content-Type', 'application/json').send({ user: { name: 'abc', password: 'def' } }).end(function(err, res){
              //debugger;
              if (res.ok) {alert('yay got ' + JSON.stringify(res.body)
              );
              } else {alert('Oh no! error ' + res.text);
              }
          });
          //存储身份验证
          var arrDisplay = [0, 1, 1, 1];
          if (window.localStorage) {
              localStorage.setItem("menuTitle", arrDisplay);
          } else {
              Cookie.write("menuTitle", arrDisplay);
          }
      }
    var  propTypes: {
          title: React.PropTypes.string.isRequired
      }
      var iconUser = <Icon icon="user" />;
      var iconPwd = <Icon icon="lock" />;
      return (
      <div>
          <Slider >
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
                  <Form>
                          <Input addonBefore={iconUser} placeholder="用户名"  id="name" />
                          <Input addonBefore={iconPwd} placeholder="密码" type="password" id="loginPwd" />
                      <Link to='/login'> <Button   amStyle="primary" block  onClick={login}>登录</Button></Link>
                     <p></p>
                      <Link to='/registered'> <Button   amStyle="primary" block >注册</Button></Link>
                  </Form>
              </Col>
          </Grid>
      </div>
    );
  }
}
