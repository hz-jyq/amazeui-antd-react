import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Grid,Col,Panel}from 'amazeui-react';
import Breadcrumb from './BreadcrumbCenter';
import DataGrid from './DataGrid';
import ButtonBuff from './ButtonBuff';
import Pagtion from './Pagtion';
import Footer from './FooterBuff';
import HeadButton from './HeadButton';


export default class AdviceTypeCenter extends Component {

  render() {
    return (
         <div className="center" >
                <Breadcrumb/>
                <HeadButton router="addAdviceType"/>
               <ButtonBuff/>
                <DataGrid/>
                <Pagtion/>
                <Footer/>
        </div>
    )
  }
}
