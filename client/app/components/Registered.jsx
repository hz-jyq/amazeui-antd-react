import React, {Component,propTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel}from 'amazeui-react';
import ValidationExample from './ValidationExample';
import Pwd from './Pwd';
import PwdRe from './PwdRe';
export default class Registered extends Component {

render() {
    return (
        <div className="registered">
        <Grid>
            <Col sm={8} smCentered>
                <Panel header="用户注册">
                <Form>
                    <fieldset className="am-form-set">
                          <ValidationExample/>
                          <Pwd/>
                          <PwdRe/>
                         <Input type="email" placeholder="邮箱" standalone />
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