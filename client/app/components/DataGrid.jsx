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

    loadCommentsFromServer(e) {
        request.get('http://localhost:8080').set("Authorization", " Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsiJG9pZCI6IjU2ZmE2NjFmZDYxOTRjNWJkMGU1OTgyMyJ9fQ.qOnXRJtzRanMUCK7eOmkv1qPc9rl50oRFS3iXdCDKqo").set('Content-Type', 'application/json').end(function (err, res) {
            if (res.ok) {
                e.setState({
                    data: [{
                        "id": "24213414",
                        "title": "江湖民谣双专场",
                        "category": "小型现场",
                        "loc": "北京",
                        "begin": "2015-05-06 21:00:00",
                        "disabled": 1
                    }, {
                        "id": "24213108",
                        "title": "读火乐队 江湖专场演出",
                        "category": "小型现场",
                        "loc": "北京",
                        "begin": "2015-05-01 14:00:00"
                    }, {
                        "id": "24213010",
                        "title": "音乐学习公开课活动",
                        "category": "小型现场",
                        "loc": "北京",
                        "begin": "2015-04-28 10:00:00"
                    }, {
                        "id": "24211259",
                        "title": "邓丽君金曲盛燕专场演唱会",
                        "category": "演唱会",
                        "loc": "北京",
                        "begin": "2015-05-22 19:30:00"
                    }, {
                        "id": "24211196",
                        "title": "伍佰2015北京演唱会",
                        "category": "演唱会",
                        "loc": "北京",
                        "begin": "2015-06-20 19:30:00",
                        "highlight": 1
                    }]
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
        var modal = <Modal type="confirm">你，确定要删除这条记录吗？</Modal>;
        var ButtonManger = <ModalTrigger modal={modal}><Button>删除</Button></ModalTrigger>
        var ButtonUpdate = <Button>修改</Button>
        var ButtonDetailed = <Button>查看</Button>
        var EventRow = React.createClass({
            render: function () {
                var event = this.props.event;
                return (
                    <tr>
                        <td>{event.title}</td>
                        <td>{event.category}</td>
                        <td>{event.loc}</td>
                        <td>{event.begin}</td>
                        <td>{ButtonManger} {ButtonUpdate} {ButtonDetailed}</td>
                    </tr>
                );
            }
        });

        return (
            <div className="left dataGrid">
                <Table>
                    <thead>
                    <tr>
                        <th>名称</th>
                        <th>类型</th>
                        <th>地点</th>
                        <th>开始时间</th>
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
