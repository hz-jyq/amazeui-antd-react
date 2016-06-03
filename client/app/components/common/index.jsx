import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,EventRow,EventsTable}from 'amazeui-react';
/*
     弹出框
*/
close=()=> {
    this.setState({showModal: false});
}
open=(str)=> {
    this.setState({showModal:true,modal:str});
};
export class Alert extends Component {
    render() {
        const modal = (<Modal type="alert" title="提示窗口">{this.state.modal}</Modal>);
        return (
              <ModalTrigger  modal={modal}   show={this.state.howModal}  onClose={this.cloes}/>
        );
    }
}

/*
    loading 加载动画
*/
export class Loading extends Component {
    render() {
        return (
            <div className={'data-load data-load-' + this.props.loadState}>
                <div className="msg">{this.props.loadMsg}</div>
            </div>
        );
    }
}
