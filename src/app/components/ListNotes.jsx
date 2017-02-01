import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);
import client from './Client';
/*

Appel http vers /notes

unstate State {notes : []}
-> va appeler le render.

*/
export default class ListNotes extends Component {
	constructor(props) {
      super(props);
		
	  this.state = {
	     data: []
	  }
	}


	componentDidMount() {
		var that = this;
		client.findAll(function (json){
			that.setState({
				data: json
			});
		});
	}
  
    render() {

    	return (
    		<div>
                {this.state.data.map((note, index) => (
                	<div>
	                	<hr></hr>
				        <div>{note.title}</div>
				        <div>{note.content}</div>
	                	<hr></hr>
                	</div>
			    ))}
            </div>
        )
    }
};