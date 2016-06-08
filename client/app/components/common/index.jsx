import React, {Component} from 'react';
import {Table,Button,Icon,ModalTrigger,Modal,EventRow,EventsTable}from 'amazeui-react';
import {Link}from 'react-router';
/*
     弹出框
*/

export class Alert extends Component {
  close=()=> {
      this.setState({showModal: false});
  }
  open=(str)=> {
      this.setState({showModal:true,modal:str});
  };
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

/*
    修改按钮
*/
export class ButtonUpdate extends Component {
    render() {
        const {pathname,query,type}=this.props;

        return (
              <Link to={{pathname: pathname, query:{id:query}}}><Button><Icon icon="edit"/>修改</Button></Link>
        );
    }
}
/*
删除按钮
*/
export class ButtonDel extends Component {
    render() {
        const {pathname,query}=this.props;
        return (
              <Link to={{pathname: pathname, query:{id:query}}}><Button><Icon icon="trash"/>删除</Button></Link>
        );
    }
}
/*
查看按钮
*/
export class ButtonDetailed extends Component {
    render() {
        const {pathname,query}=this.props;
        return (
              <Link to={{pathname: pathname, query:{id:query}}}><Button><Icon icon="search-minus"/>查看</Button></Link>
        );
    }
}
