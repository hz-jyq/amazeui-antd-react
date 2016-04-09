import React, {Component} from 'react';
import Piece from './Piece';
import Logo from './Logo';
import Breadcrumb from './BreadcrumbCenter'
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel,FormGroup,UCheck,fieldset,ButtonToolbar,Selected}from 'amazeui-react';
import request  from 'superagent';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
export default class AddAdvice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strStoreDate :window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization"),
            selectData:[]
        }
    }
    loadCommentsFromServer =function(e) {
        request.get(`http://127.0.0.1:3000/users`).set("Authorization", this.state.strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
            if (res.ok) {
                var jsonarray=new Array();
                for(var i=0;i<res.body.length;i++){
                    var json={};
                    json["value"]= res.body[i].id;
                    json["label"]= res.body[i].name;
                    jsonarray.push(json);
                }
                e.setState({
                    selectData: jsonarray
                })
            } else {
                alert('Oh no! error ' + res.text);
            }
        });
    }
    //渲染之前
    componentDidMount() {
        this.loadCommentsFromServer(this);
    }
     onclick =(e)=>{
        var text=e.target.getElementsByTagName("textarea");
        var json={};
        for(var i=0;i<text.length;i++){
            json[text[i].id]=text[i].value
        }
        var inpt=e.target.getElementsByTagName("input");
        for(var i=0;i<inpt.length;i++) {
            if (inpt[i].type == 'radio') {
                if (inpt[i].checked) {
                    json["public"] = inpt[i].value
                }
            }
        }
        json["reviewer_ids"]=document.querySelectorAll("#reviewList")[0].value.split(',');
        request.post('http://127.0.0.1:3000/suggestion_types').send({"suggestion_type":json}).set("Authorization",this.state.strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
            if (res.ok) {
            } else {
                alert('Oh no! error ' + res.text);
            }
        });
    };
    render() {
      var _this=this;
      var props = {
          name: 'selected',
          onChange: function(value) {
                       document.querySelectorAll("#reviewList")[0].value=value;
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
                 <Form horizontal onSubmit={this.onclick}>
                  <Input type="textarea" label="类型名称：" labelClassName="am-u-sm-1"  wrapperClassName="am-u-sm-8" ref="name" id="name"  />
                   <Input type="textarea" label="描述：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-8" id="description" />
                  <div>
                   <label  className="am-u-sm-1 am-form-label">评审人：</label> <Selected {...props}  id="review"    data={this.state.selectData}   ref="review" />
                    <Input  label="选中列表："  type="textarea"  labelClassName="am-u-sm-1"  readOnly wrapperClassName="am-u-sm-8" id="reviewList"    ></Input>
                      <label  className="am-u-sm-1 am-form-label">是否公开：</label>
                    <Input type="radio" name="doc-radio-2" label="是"  value="0" inline  checked />
                    <Input type="radio" name="doc-radio-2" label="否" value="1" inline />
                  </div>
                   <Input type="submit" amStyle="primary" value="保存"  wrapperClassName="am-u-sm-offset-1 am-u-sm-1"  />
                </Form>
            </Col>
        </Grid>
    </div>
    );
  }
}
