import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,placeholder,Input}from 'amazeui-react';
import request  from 'superagent';

export default class PwdRe extends Component {
    state = {value: ''};
    validate=(eve) =>{
        var pwd=this.props.data
        var pwder= this.state.value;
        var length= this.state.value.length;
        if (pwd===pwder && length < 10 && length > 4) {
            return 'success';
        } else {
            return 'error';
        }
    }
    handleChange=()=> {
        this.setState({
            value: this.refs.field.getValue()
        });
    }
    render() {
        return (
            <div>
                <Input
                    value={this.state.value}  placeholder="重复密码"   type="password" validation={this.validate()} hasFeedback ref="field" onChange={this.handleChange} /></div>
        );
    }
}