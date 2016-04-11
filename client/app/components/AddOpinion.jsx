import React, {Component} from 'react';
import Piece from './Piece';
import Logo from './Logo';
import Breadcrumb from './BreadcrumbCenter'
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel,FormGroup,UCheck,fieldset,ButtonToolbar,Selected}from 'amazeui-react';
import request  from 'superagent';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
export default class AddAdviceType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strStoreDate :window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization"),
      selectData:[],
      public:true,
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
  };
  //渲染之前
  componentDidMount() {
    this.loadCommentsFromServer(this);
  };
  onSubmit =(e)=>{
    var _this=this;
    var json={};
    json["name"]=this.refs.name.getValue()
    json["description"]=this.refs.description.getValue();
    json["reviewer_ids"]=this.refs.select.getValue().split(',');
    json["public"]=this.state.public;
    request.post('http://127.0.0.1:3000/suggestion_types').send({"suggestion_type":json}).set("Authorization",this.state.strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
      if (res.ok) {
      } else {
        alert('Oh no! error ' + res.text);
      }
    });
  };
  //公共
  public=(e)=>{
    var flag = (e.target.value == 'true');
    this.setState({
      public :flag
    });
  };
  render() {
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
              <Form horizontal onSubmit={this.onSubmit}>
                <Input type="textarea" label="类型名称：" labelClassName="am-u-sm-1"  wrapperClassName="am-u-sm-8" ref="name" id="name"  />
                <Input type="textarea" label="标题：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-8" ref="description" />
                <Input type="textarea" label="内容：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-8" ref="description" />
                <spn>  <Input type="submit" amStyle="primary" value="保存"  wrapperClassName="am-u-sm-offset-1 am-u-sm-1"  /></spn>
              </Form>
            </Col>
          </Grid>
        </div>
    );
  }
}
