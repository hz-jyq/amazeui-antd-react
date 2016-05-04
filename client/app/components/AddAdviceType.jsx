import React, {Component} from 'react';
import Breadcrumb from './BreadcrumbCenter'
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel,FormGroup,UCheck,fieldset,ButtonToolbar,Selected}from 'amazeui-react';
import request  from 'superagent';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import Rating,{PercentageSymbol} from 'react-rating';
export default class AddAdvice extends Component {
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
        debugger;
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
    _iconNode=(icon)=>{
        // If it is already a React Element just return it.
        if (React.isValidElement(icon)) {
            return icon;
        }
        // If it is an object, try to use it as a CSS style object.
        if (typeof icon === 'object' && icon !== null) {
            return <div style={icon}/>;
        }
        // If it is a string, use it as class names.
        if (Object.prototype.toString.call(icon) === '[object String]') {
            return <div className={icon}/>;
        }
    }
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
        var style = {
            display: 'inline-block',
            borderRadius: '50%',
            border: '5px double white',
            width: 30,
            height: 30,
            backgroundColor: '#ccc',
        };
        var style1 = {
            display: 'inline-block',
            borderRadius: '50%',
            border: '5px double white',
            width: 30,
            height: 30,
            backgroundColor: 'red'
        };
    var  empty= 'fa fa-star-o fa-2x',full='fa fa-star fa-2x'
       var handClick=function(e){
           alert(e)
       }
        var Rat=<Rating initialRate={5} empty={style} full={style1}   rel="rat" onClick={handClick}></Rating>
        return (
    <div  >
      <Breadcrumb/>
        <Grid>
            <Col sm={11}>
                 <Form horizontal onSubmit={this.onSubmit}>
                  <Input type="textarea" label="类型名称：" labelClassName="am-u-sm-1"  wrapperClassName="am-u-sm-8" ref="name" id="name"  />
                   <Input type="textarea" label="描述：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-8" ref="description" />
                  <div>
                   <label  className="am-u-sm-1 am-form-label">评审人：</label> <Selected {...props}  id="review"    data={this.state.selectData}   ref="select" />
                    <Input  label="选中列表："  type="textarea"  labelClassName="am-u-sm-1"  readOnly wrapperClassName="am-u-sm-8" id="reviewList"   ></Input>
                      <label  className="am-u-sm-1 am-form-label">是否公开：</label>
                      <Input type="radio" name="doc-radio-2" label="是"  inline checked={this.state.public} ref="public" onChange={this.public} value="true" />:<Input type="radio" name="doc-radio-2" label="否"  rel="public"  inline onChange={this.public} value="false" checked={!this.state.public}/>
                  </div>
                    <Input type="submit" amStyle="primary" value="保存"  wrapperClassName="am-u-sm-offset-1 am-u-sm-1"  />
                </Form>
            </Col>
        </Grid>
    </div>
    );
  }
}
