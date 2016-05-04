import React, {Component} from 'react';
import Breadcrumb from './BreadcrumbCenter'
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel,FormGroup,UCheck,fieldset,ButtonToolbar,Selected}from 'amazeui-react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import request  from 'superagent';
export default class ViewAdvice extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            data: {"reviewers":[{name: "Babel"},{name: "111"}]}
        }
    };
    loadCommentsFromServer =function(e) {
        var  strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
        request.get(`http://127.0.0.1:3000/suggestion_types/${this.props.location.query.id}`).set("Authorization", strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
            if (res.ok) {
                e.setState({
                    data: res.body
                })
            } else {
                alert('Oh no! error ' + res.text);
            }
        });
    }
    componentDidMount() {
        this.loadCommentsFromServer(this);
    }
  render() {
      return (
    <div  >
        <Breadcrumb/>
        <Grid>
            <Col sm={11}>
                 <Form horizontal>
                  <Input type="textarea" label="类型名称：" labelClassName="am-u-sm-1"  wrapperClassName="am-u-sm-8" value={this.state.data.name}   ref="field" />
                   <Input type="textarea" label="描述：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-8"  value={this.state.data.description}  ref="field" />
                  <div>
                      <Input  label="审批人列"  type="textarea"  labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-8"   id="reviewList" onChange={this.onchange} readOnly value={this.state.data.reviewers.map(((item)=>{return item.name}))} ></Input>
                      <label  className="am-u-sm-1 am-form-label">是否公开：</label>
                      <Input type="radio" name="doc-radio-2" label="是"  inline checked={this.state.data.public} readOnly value="true" />:<Input type="radio" name="doc-radio-2" label="否" inline readOnly value="false" checked={!this.state.data.public}/>
                  </div>
                     <Link  to='/AdviceTypeCenter'> <Button amStyle="primary">返回</Button></Link>
                </Form>
            </Col>
        </Grid>
    </div>
    );
  }
}
