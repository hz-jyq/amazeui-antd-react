import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Grid,Col}from 'amazeui-react';
import Breadcrumb from './BreadcrumbCenter';
import DataGrid from './DataGrid';
import ButtonBuff from './ButtonBuff';
import Pagtion from './Pagtion';
import Footer from './FooterBuff';
import HeadButton from './HeadButton';


export default class Center extends Component {

  render() {
    return (
         <div className="center">
            <Breadcrumb/>
            <HeadButton/>
             <ButtonBuff/>
             <div>
            <DataGrid/>
             <Pagtion/>
             <Footer/>
             </div>
        </div>
    )
  }
}
