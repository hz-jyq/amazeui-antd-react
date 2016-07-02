import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,EventRow,EventsTableM}from 'amazeui-react';
import request  from 'superagent';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import {ButtonUpdate,ButtonDel,ButtonDetailed}  from  '../common/index';
export default  class AdviceTypeRow extends Component {
      onConfirm =(e)=>{
            var  strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
            var _this=this;
            request.delete(`/api/suggestion_types/${this.props.event.id}`).type('json').set("Authorization",strStoreDate).end(function (err, res) {
                if (res.ok) {
                    _this.props.handClick();
                } else {
                    alert('Oh no! error ' + res.text);
                }
            });
        }
    render() {
        var event = this.props.event;
        var modal = <Modal type="confirm" eventRow={event}>你，确定要删除这条记录吗？</Modal>;
        return (
            <tr>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>
                  <ButtonUpdate pathname="/AdviceTypeCenter/update" query={event.id}/>
                  <ButtonDel pathname="/AdviceTypeCenter" query={event.id}/>
                  <ButtonDetailed pathname="/AdviceTypeCenter/view" query={event.id}/>
                </td>
            </tr>
        );
    }}
