import React, {Component} from 'react';
import NavIndex from '../NavIndex'
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel,FormGroup,UCheck,fieldset,ButtonToolbar,Selected,Modal,ModalTrigger}from 'amazeui-react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import request  from 'superagent';
export default class AdviceTypeUpdate extends Component {
    //构造
    constructor(prop) {
        super(prop);
        this.state = {
            name: "",
            description:"",
            selectData: [],
            public:true,
            reviewers:[]
        };
        this.getName=this.getName.bind(this);
    };
    //类型名字
    getName(e) {
        this.setState({
            name :e.target.value
        });
    }
    //描述
    description=(e)=>{
        this.setState({
            description :e.target.value
        });
    };
    //公共
    public=(e)=>{
        var flag = (e.target.value == 'true');
        this.setState({
            public :flag
        });
    };
    //提交
    onSubmit=(e)=>{
        var _this=this;
        var json={};
       json["name"]=this.refs.name.getValue()
        json["description"]=this.refs.description.getValue();
        json["reviewer_ids"]=this.refs.select.getValue().split(',');
        json["public"]=this.state.public;
        request.put(`/api/suggestion_types/${this.props.location.query.id}`).send({"suggestion_type":json}).set("Authorization",{strStoreDate}.strStoreDate).type("json").end(function (err, res) {
            if (res.ok) {
                _this.props.history.replace('/AdviceTypeCenter');
            } else {
                alert('Oh no! error ' + res.text);
            }
        });
    }
    //初始化
    loadCommentsFromServer =function(e) {
        request.get(`/api/suggestion_types/${this.props.location.query.id}`).set("Authorization",{strStoreDate}.strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
            if (res.ok) {
                e.refs.select.state.value =res.body.reviewers.map(((item)=>{return item.id})).join(",");
                e.setState({
                    name: res.body.name,
                    description:res.body.description,
                    public:res.body.public,
                    reviewers:res.body.reviewers
                })
            } else {
                alert('Oh no! error ' + res.text);
            }
        });
        request.get(`/api/users`).set("Authorization", {strStoreDate}.strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
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
    render() {
      var props = {
          name:"selected",
          onChange: function(value) {
              document.querySelectorAll("#reviewList")[0].value=value;
          },
          data:this.state.selectData,
          multiple: true,
          maxHeight: 150,
          searchBox: true
      };

        const Jyq = (
            <Modal title="Amaze UI Modal">
                通过ModalTrigger的props打开Modal
            </Modal>);
      return (
    <div  >
        <NavIndex/>
        <Grid>
            <Col sm={11}>
                 <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                  <Input type="textarea" label="类型名称：" labelClassName="am-u-sm-1"  wrapperClassName="am-u-sm-11" value={this.state.name}   ref="name" onChange={this.getName} id="name"/>
                   <Input type="textarea" label="描述：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-11"  value={this.state.description}  ref="description" onChange={this.description} id="description"/>
                  <div>
                      <label  className="am-u-sm-1 am-form-label">评审人：</label> <Selected {...props}   ref="select"   />
                      <Input  label="选中列表："  type="textarea"  labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-11"  readOnly  value={this.state.reviewers.map(((item)=>{return item.id}))}   id="reviewList" ></Input>
                      <label  className="am-u-sm-1 am-form-label">是否公开：</label>
                     <Input type="radio" name="doc-radio-2" label="是"  inline checked={this.state.public} ref="public" onChange={this.public} value="true" />:<Input type="radio" name="doc-radio-2" label="否"  rel="public"  inline onChange={this.public} value="false" checked={!this.state.public}/>
                  </div>
                   <Input type="submit" amStyle="primary" value="修改" wrapperClassName="am-u-sm-offset-1 am-u-sm-1"  />
                </Form>
            </Col>
        </Grid>
        <div>
        </div>
    </div>

    );
  }
}
