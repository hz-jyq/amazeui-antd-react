import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal}from 'amazeui-react';
import request  from 'superagent';

export default class DataGrid extends Component {
  render() {
    request.post('/api/pet').send({ name: 'Manny', species: 'cat' }).set('X-API-Key', 'foobar').set('Accept', 'application/json').end(function(err, res){
    if (res.ok) {alert('yay got ' + JSON.stringify(res.body));
    } else {alert('Oh no! error ' + res.text);
    }
  });
    var modal = <Modal type="confirm" title="Amaze UI">你，确定要删除这条记录吗？</Modal>;
    var  ButtonManger=<ModalTrigger modal={modal}><Button>删除</Button></ModalTrigger>
    return (
        <div className="left dataGrid">
        <Table bordered striped hover radius>
          <thead>
          <tr>
            <th>编号</th>
            <th>标题</th>
            <th>内容</th>
            <th>管理</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Amaze UI</td>
            <td>http://amazeui.org</td>
            <td>2012-10-01</td>
            <td>{ButtonManger} </td>
          </tr>
          <tr>
            <td>Amaze UI(Active)</td>
            <td>http://amazeui.org</td>
            <td>2012-10-01</td>
            <td>{ButtonManger}</td>
          </tr>
          <tr>
            <td>Amaze UI</td>
            <td>http://amazeui.org</td>
            <td>2012-10-01</td>
            <td>{ButtonManger}</td>
          </tr>
          </tbody>
        </Table>
        </div>
    );
  }
}
