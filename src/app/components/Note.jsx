import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';
const store = configure();
const history = syncHistoryWithStore(browserHistory, store);
const Timestamp = require('react-timestamp');

import client from './Client';

export default class Note extends Component {
	constructor(props) {
      super(props);
		
	  this.state = {
	     data: {}
	  }

	  this.removeNote = this.removeNote.bind(this);
	}

	removeNote(){
		var id = this.props.params.id;
		client.removeOne(id);
	    browserHistory.push('/');
	}

	componentDidMount() {
		var that = this;
		console.log(this.props.params.id);
		client.findOneById(this.props.params.id,function (json){
			that.setState({
				data: json
			});
		});
	}

  
    render() {
    	return (
    			<div>
    				<h3 className="center">A Note</h3>
					<div className="card white ">
						<div className="card-content ">
						  <span className="card-title darken-1">{this.state.data.title} -  <Timestamp time={this.state.data.date} format='date'/> </span>
						  <p>{this.state.data.content}</p>
						</div>
						<div className="card-action">
							<button className="waves-effect waves-light btn red darken-2" onClick={this.removeNote}>Delete</button>
						</div>
					</div>
				</div>
            
        	
        )
    }
};