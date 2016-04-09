import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,EventRow,EventsTable}from 'amazeui-react';
import request  from 'superagent';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
export default  class TypeRow extends Component {
      onConfirm =(e)=>{
            var  strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
            var _this=this;
            request.delete(`http://127.0.0.1:3000/suggestion_types/${this.props.event.id}`).set('Content-Type', 'application/json').set("Authorization",strStoreDate).end(function (err, res) {
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
        var ButtonUpdate=<Link  to={{ pathname: '/AdviceTypeCenter/update', query: { id: event.id } }}> <Button >修改</Button></Link>
        /*       var ButtonUpdate=<Link  to={`/AdviceTypeCenter/update/${event.id}`}> <Button >修改</Button></Link>*/
        var ButtonDetailed=<Link  to={{ pathname: '/AdviceTypeCenter/view', query: { id: event.id } }}> <Button >查看</Button></Link>
        var ButtonDel = <ModalTrigger modal={modal}  onConfirm={this.onConfirm}><Button >删除</Button></ModalTrigger>
        return (
            <tr>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{ButtonDel} {ButtonUpdate} {ButtonDetailed}</td>
            </tr>
        );
    }}


