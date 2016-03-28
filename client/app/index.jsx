import './styles/site.sass';
import './lib';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ListWb from './components/ListWb';
import  AmazeUi from './components/AmazeUi'
import  Main from './components/Main'

ReactDOM.render(<Main />, document.getElementById('main'))
/*ReactDOM.render(<AmazeUi />, document.getElementById('amazeUi'));*/
/*ReactDOM.render(<Main />, document.getElementById('main'))*/

