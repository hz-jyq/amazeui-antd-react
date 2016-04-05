import React, {Component} from 'react';
import Piece from './Piece';
import Logo from './Logo';
import Breadcrumb from './BreadcrumbCenter'
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel,FormGroup,UCheck,fieldset,ButtonToolbar,Selected}from 'amazeui-react';
import request  from 'superagent';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
export default class AddAdvice extends Component {
    render() {
     var strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
     var  onclick =function(e){
        var text=e.target.form.getElementsByTagName("textarea");
        var json={};
        for(var i=0;i<text.length;i++){
             json[text[i].id]=text[i].value
        }
         request.post('http://127.0.0.1:3000/suggestion_types').send({"suggestion_type":json}).set("Authorization",strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
             if (res.ok) {
             } else {
                 alert('Oh no! error ' + res.text);
             }
         });
      };
      var options = [
          {value: 'ccp', label: 'ccp'},
          {value: 'jyq', label: 'jyq'}
      ];
      var props = {
          data: options,
          onChange: function(value) {
          },
          multiple: true,
          maxHeight: 150,
          searchBox: true
      };
      var myFilter = function(filterText, option) {
          return (option.value === "one");
      };
    return (
    <div  >
        <Breadcrumb/>
        <Grid>
            <Col sm={11}>
                 <Form horizontal>
                  <Input type="textarea" label="类型名称：" labelClassName="am-u-sm-1"  wrapperClassName="am-u-sm-8" id="name" />
                   <Input type="textarea" label="描述：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-8" id="description" />
                  <div>
                   <label  className="am-u-sm-1 am-form-label">评审人：</label> <Selected {...props} onChange={onchange} optionFilter={myFilter}  />
                    <Input  label="选中列表："  type="textarea"  labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-8" ></Input>
                      <label  className="am-u-sm-1 am-form-label">是否公开：</label>
                    <Input type="radio" name="doc-radio-2" label="是"  inline  />
                    <Input type="radio" name="doc-radio-2" label="否" inline />
                  </div>
                   <Input type="submit" amStyle="primary" value="保存"  onClick={onclick} wrapperClassName="am-u-sm-offset-1 am-u-sm-1"  />
                </Form>
            </Col>
        </Grid>
    </div>
    );
  }
}
