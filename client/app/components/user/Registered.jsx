import React, {Component,propTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel}from 'amazeui-react';
import ValidationExample from './ValidationExample';
import Pwd from './Pwd';
import PwdRe from './PwdRe';
export default class Registered extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        }
    }
    onSubmit=(e)=>{
        if (true) { return; }
    }
render() {
    var _this=this
    var onChildChanged=(item)=>{
        _this.setState({
            data: item
        })}
    return (
        <div className="registered">
        <Grid>
            <Col sm={8} smCentered>
                <Panel header="用户注册">
                <Form onSubmit={false}>
                    <fieldset className="am-form-set">
                          <ValidationExample/>
                          <Pwd  callbackParent={onChildChanged}/>
                          <PwdRe  data={this.state.data} ref="pwder"/>
                         <Input type="email" placeholder="邮箱" standalone  />
                      </fieldset>
                     <Input type="submit" value="提交" amStyle="primary" block />
                    <Link to='/'> <Button   amStyle="primary" block  >返回</Button></Link>
                   </Form>
                </Panel>
            </Col>
        </Grid>
       </div>
    )
}}