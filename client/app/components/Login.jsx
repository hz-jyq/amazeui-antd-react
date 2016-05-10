import React, {Component,propTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Slider,Input,Icon,Grid,Col,Form,Button,Modal,ModalTrigger}from 'amazeui-react';
import request  from 'superagent';

export default class  extends Component {
    constructor(props) {
        super(props);
        var  strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
        if(strStoreDate){this.props.history.replace('/login')}else{
        };
        this.state = {
            showModal: false,
            modal:"",
        }
    };
    close=()=> {
        this.setState({showModal: false});
    }
    open=(str)=> {
        this.setState({showModal:true,modal:str});
    };
    render() {
      var login=(eve)=> {
          var name=this.refs.name.getValue();
          var pwd=this.refs.pwd.getValue();
          var _this=this;
          request.post('/api/users/authenticate').type("json").send({user:{ name: name, password: pwd }}).end(function(err, res){
              if (res.ok) {
                  if (window.localStorage) {
                      localStorage.setItem("Authorization", "Bearer "+res.body.token
                      );
                  } else {
                      Cookie.write("Authorization", Bearer+"arrDisplay");
                  }
                  _this.props.history.replace('/login');
              } else {_this.open('Oh no! error ' + res.text)}
          });
          //存储身份验证
      }
      var iconUser = <Icon icon="user" />;
      var iconPwd = <Icon icon="lock" />;
        const modal = (<Modal type="alert" title="提示窗口">{this.state.modal}</Modal>);
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
                          <Input addonBefore={iconUser} placeholder="用户名"  ref="name" />
                          <Input addonBefore={iconPwd} placeholder="密码" type="password" ref="pwd" />
                         <Button   amStyle="primary" block  onClick={login}>登录</Button>
                          <p></p>
                      <Link to='/registered'> <Button   amStyle="primary" block >注册</Button></Link>
                  </Form>
              </Col>
          </Grid>
          <ModalTrigger
              modal={modal}
              show={this.state.showModal}
              onClose={this.close}/>
      </div>
    );
  }
}
