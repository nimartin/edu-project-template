import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);
import Client from './Client';
/*

Appel http vers /notes

unstate State {notes : []}
-> va appeler le render.

Dans render() : this.state.notes {note.title}
*/
export default class ListNotes extends Component {
    render() {
        return(
            <h1>
            
            </h1>
        );
    }
};