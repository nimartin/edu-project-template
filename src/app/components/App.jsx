import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';

import ListNotes from './ListNotes';
import Note from './Note';
import AddNoteComponent from './AddNoteComponent';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);


export default class App extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <Provider store={store}>
                        <Router history={history}>
                            <Route path="/" component={ListNotes}>
                            </Route>
                            <Route path="/new" component={AddNoteComponent}>
                            </Route>
                             <Route path="/:id" component={Note}>
                            </Route>
                        </Router>
                    </Provider>
                </div>
            </div>
        );
    }
};
