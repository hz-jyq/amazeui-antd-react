import React, {Component} from 'react';
import NavIndex from '../NavIndex'
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel,FormGroup,UCheck,fieldset,ButtonToolbar,Selected,ModalTrigger,Modal}from 'amazeui-react';
import request  from 'superagent';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import Rating,{PercentageSymbol} from 'react-rating';
export default class AdviceTypeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData:[],
            public:true,
            showModal: false,
            modal:"",
        }
    }
    loadCommentsFromServer =function(e) {
        request.get(`/api/users`).set("Authorization", {strStoreDate}.strStoreDate).type("json").end(function (err, res) {
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
    //
    close=()=> {
        this.setState({showModal: false});
    }
    open=(str)=> {
        this.setState({showModal:true,modal:str});
    };
    onSubmit =(e)=>{
        var _this=this;
        var json={};
        json["name"]=this.refs.name.getValue()
        json["description"]=this.refs.description.getValue();
        json["reviewer_ids"]=this.refs.select.getValue().split(',');
        json["public"]=this.state.public;
        request.post('/api/suggestion_types').send({"suggestion_type":json}).set("Authorization",{strStoreDate}.strStoreDate).type("json").end(function (err, res) {
            if (res.ok) {
                {_this.open('保存成功')}
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
        const modal = (<Modal type="alert" title="提示窗口">{this.state.modal}</Modal>);
        return (
    <div  >
      <NavIndex/>
        <Grid>
                 <Form horizontal onSubmit={this.onSubmit}>
                  <Input type="textarea" label="类型名称：" labelClassName="am-u-sm-1"  wrapperClassName="am-u-sm-11" ref="name" id="name"  />
                   <Input type="textarea" label="描述：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-11" ref="description" />
                   <label  className="am-u-sm-1 am-form-label">评审人：</label> <Selected {...props}   id="review"  data={this.state.selectData}   ref="select" />
                    <Input  label="选中列表："  type="textarea"  labelClassName="am-u-sm-1"  readOnly wrapperClassName="am-u-sm-11" id="reviewList"   ></Input>
                    <label  className="am-u-sm-1 am-form-label">是否公开：</label>
                    <Input type="radio" name="doc-radio-2" label="是"  inline checked={this.state.public} ref="public" onChange={this.public} value="true" />:<Input type="radio" name="doc-radio-2" label="否"  rel="public"  inline onChange={this.public} value="false" checked={!this.state.public}/>
                    <Input type="submit" amStyle="primary" value="保存"  wrapperClassName="am-u-sm-offset-1 am-u-sm-1"  />
                </Form>
        </Grid>
        <ModalTrigger
            modal={modal}
            show={this.state.showModal}
            onClose={this.close}/>
    </div>
    );
  }
}
