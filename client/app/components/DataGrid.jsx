import request  from 'superagent';
import TypeRow from './TypeRow';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,EventRow,EventsTable}from 'amazeui-react';

export default class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    loadCommentsFromServer=()=> {
        var _this=this;
        debugger;
        window.req(str).get('http://127.0.0.1:3000/suggestion_types').end(function (err, res) {
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
                        <th>类型名称</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(function (event) {
                        return (<TypeRow key={event.id}  method={this} handClick={_this.loadCommentsFromServer} event={event}/>);
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
