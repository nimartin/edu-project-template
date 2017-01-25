import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);

export default class Client extends Component{
    findAll(){
        fetch('/notes')
        .then(res => res.json())
        .then(json => dispatch({
            type: 'fetchData', 
            data: json
        }));
    }