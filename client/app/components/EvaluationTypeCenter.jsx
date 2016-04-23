import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Grid,Col}from 'amazeui-react';
import Breadcrumb from './BreadcrumbCenter';
import EvaluationTypeDataGrid from './EvaluationTypeDataGrid';
import ButtonBuff from './ButtonBuff';
import Pagtion from './Pagtion';
import Footer from './FooterBuff';
import HeadButton from './HeadButton';


export default class MyEvaluationCenter extends Component {

    render() {
        return (
            <div>
                <Breadcrumb/>
                <HeadButton router="addEvaluationType"/>
                <ButtonBuff/>
                <div>
                    <EvaluationTypeDataGrid/>
                    <Pagtion/>
                    <Footer/>
                </div>
            </div>
        )
    }
}
