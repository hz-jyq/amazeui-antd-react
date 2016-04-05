import React, {Component} from 'react';
import Piece from './Piece';
import Logo from './Logo';
import {Pagination}from 'amazeui-react';
export default class Pagtion extends Component {

  render() {
    var selectHandle = function(link, e) {
      e.preventDefault();
      console.log('你点击了：', link);
    };
    return (
      <div className="clear">
        <Pagination right  onSelect={selectHandle}>
          <Pagination.Item disabled href="#">&laquo;</Pagination.Item>
          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item href="#">2</Pagination.Item>
          <Pagination.Item href="#">3</Pagination.Item>
          <Pagination.Item href="#">4</Pagination.Item>
          <Pagination.Item href="#">5</Pagination.Item>
          <Pagination.Item href="#">&raquo;</Pagination.Item>
        </Pagination>
      </div>
    );
  }
}
