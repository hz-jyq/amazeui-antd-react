import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,placeholder,Input}from 'amazeui-react';
import request  from 'superagent';

export default class Pwd extends Component {
    state = {value: ''};
    validate=() =>{
        var length = this.state.value.length;
        if (length < 10 && length > 4) {
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
                    value={this.state.value}  placeholder="密码"  type="password" validation={this.validate()} hasFeedback ref="field"  id="pwd" onChange={this.handleChange} /></div>
        );
    }
}