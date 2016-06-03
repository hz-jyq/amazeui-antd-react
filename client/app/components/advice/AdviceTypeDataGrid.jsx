import request  from 'superagent';
import TypeRow from './AdviceTypeRow';
import {Router, Route, IndexRoute, browserHistory,Link} from 'react-router';
import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,EventRow,EventsTable}from 'amazeui-react';
import {Loading} from '../common';

export default class AdviceTypeDataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadMsg:"正在加载..."
        }
    }
    loadCommentsFromServer=()=> {
      var _this=this
        request.get('/api/suggestion_types').type("json").set("Authorization",{strStoreDate}.strStoreDate).end(function (err, res) {
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
      let {loadState} = this.state;
        var _this=this;
        return (
            <div className="dataGrid">
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
