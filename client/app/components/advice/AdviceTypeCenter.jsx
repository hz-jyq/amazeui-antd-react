import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Grid,Col}from 'amazeui-react';
import NavIndex from '../NavIndex';
import AdviceTypeDataGrid from './AdviceTypeDataGrid';
import ButtonBuff from '../ButtonBuff';
import Pagtion from '../Pagtion';
import Footer from '../FooterBuff';
import HeadButton from '../HeadButton';


export default class AdviceTypeCenter extends Component {

    render() {
        return (
            <div>
                <NavIndex/>
                <HeadButton router="/AdviceTypeAdd" />
                <br></br>
                <ButtonBuff/>
                <AdviceTypeDataGrid/>
                <Pagtion/>
                <Footer/>
                </div>
        )
    }
}
