import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Footer}from 'amazeui-react';
export default class FooterBuff extends Component {
  render() {
    return (
        <div>
            <Footer>
                <p>由
                    <a href="http://www.yunshipei.com/" title="诺亚方舟" target="_blank">诺亚方舟</a>提供技术支持
                </p>
                <p>CopyRight©2014 AllMobilize Inc.</p>
                <p>京ICP备13033158</p>
            </Footer>
        </div>
    )
  }
}
