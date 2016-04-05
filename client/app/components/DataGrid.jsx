import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,EventRow,EventsTable}from 'amazeui-react';
import request  from 'superagent';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';

export default class DataGrid extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    loadCommentsFromServer =function(e) {
        var  strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
        request.get('http://127.0.0.1:3000/suggestion_types').set("Authorization", strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
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
        var  strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
        var ButtonUpdate = <Button>修改</Button>
        var ButtonDetailed = <Button>查看</Button>
        var EventRow = React.createClass({
            onConfirm (e){
                var id =this.props.event.id;
                request.delete('http://127.0.0.1:3000/suggestion_types/'+id).set('Content-Type', 'application/json').set("Authorization",strStoreDate).end(function (err, res) {
                    if (res.ok) {
                        debugger;
                        this.loadCommentsFromServer(this);
                    } else {
                        alert('Oh no! error ' + res.text);
                    }
                });
            },
            render: function () {
                var event = this.props.event;
                var modal = <Modal type="confirm" eventRow={this}>你，确定要删除这条记录吗？</Modal>;
                var ButtonDel = <ModalTrigger modal={modal}  onConfirm={this.onConfirm}><Button >删除</Button></ModalTrigger>
                return (
                    <tr>
                        <td>{event.id}</td>
                        <td>{event.name}</td>
                        <td>{event.description}</td>
                        <td>{ButtonDel} {ButtonUpdate} {ButtonDetailed}</td>
                    </tr>
                );
            }
        });
        return (
            <div className="left dataGrid">
                <Table>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>类型名称</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(function (event) {
                        return (<EventRow key={event.id} event={event}/>);
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
