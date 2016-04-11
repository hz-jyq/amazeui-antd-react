import request  from 'superagent';
import OpinionrRow from './OpinionrRow';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,EventRow,EventsTable}from 'amazeui-react';

export default class OpinionDataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    loadCommentsFromServer=()=> {
        var _this=this;
        var  strStoreDate = window.localStorage? localStorage.getItem("Authorization"): Cookie.read("Authorization");
        request.get('http://127.0.0.1:3000/suggestion_types').set("Authorization", strStoreDate).set('Content-Type', 'application/json').end(function (err, res) {
            if (res.ok) {
                _this.setState({
                    data: res.body
                })
            } else {
                alert('Oh no! error ' + res.text);
            }
        });
    }
    componentDidMount() {
        this.loadCommentsFromServer();
    }
    render() {
        var _this=this;
        return (
            <div className="left dataGrid"  >
                <Table hover striped>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>意见类型</th>
                        <th>标题</th>
                        <th>类型</th>
                        <th>创建时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(function (event) {
                        return (<OpinionrRow key={event.id}  method={this} handClick={_this.loadCommentsFromServer} event={event}/>);
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
