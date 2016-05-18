import React, {Component} from 'react';
import NavIndex from '../NavIndex'
import {Slider,Input,Icon,Grid,Col,Form,Button,Panel,FormGroup,UCheck,fieldset,ButtonToolbar,Selected}from 'amazeui-react';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import request  from 'superagent';
export default class AdviceTypeView extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            data: {"reviewers":[{name: "Babel"},{name: "111"}]}
        }
    };
    loadCommentsFromServer =function(e) {
        var  strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
        request.get(`/api/suggestion_types/${this.props.location.query.id}`).set("Authorization", strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
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
        <NavIndex/>
        <Grid>
            <Col sm={11}>
                 <Form horizontal>
                  <Input type="textarea" label="类型名称：" labelClassName="am-u-sm-1"  wrapperClassName="am-u-sm-11" value={this.state.data.name}   ref="field" />
                   <Input type="textarea" label="描述：" labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-11"  value={this.state.data.description}  ref="field" />
                  <div>
                      <Input  label="审批人列"  type="textarea"  labelClassName="am-u-sm-1" wrapperClassName="am-u-sm-11"   id="reviewList" onChange={this.onchange} readOnly value={this.state.data.reviewers.map(((item)=>{return item.name}))} ></Input>
                      <label  className="am-u-sm-1 am-form-label">是否公开：</label>
                      <Input type="radio" name="doc-radio-2" label="是"  inline checked={this.state.data.public} readOnly value="true" />:<Input type="radio" name="doc-radio-2" label="否" inline readOnly value="false" checked={!this.state.data.public}/>
                  </div>
                     <Link  to='/AdviceTypeCenter'>   <Input type="submit" amStyle="primary" value="返回" wrapperClassName="am-u-sm-offset-1 am-u-sm-1"  /></Link>
                </Form>
            </Col>
        </Grid>
    </div>
    );
  }
}
