import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware, Link } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import update from 'react-addons-update'; 

import configure from './store';

const store = configure();

const Timestamp = require('react-timestamp');


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
	this.removeNote = this.removeNote.bind(this);
	}

	componentDidMount() {
		var that = this;
		client.findAll(function (json){
			that.setState({
				data: json
			});
		});
	}

	removeNote(event){
		this.setState({
		  data: update(this.state.data, {$splice: [[event.target.getAttribute('data-index'), 1]]})
		})
		client.removeOne(event.target.getAttribute('data-id'));
	}

  
    render() {

    	return (
			<div className="row">
				<h3 className="center">Notes</h3>
				{this.state.data.map((note, index) => (
					<div className="col s6">
					    <div className="card white ">
								<div className="card-content ">
								  <span className="card-title darken-1">{note.title} -  <Timestamp time={this.state.date} format='date'/>  </span>
								</div>
								<div className="card-action">
									<button className="waves-effect waves-light btn red darken-2 " data-id={note.id} data-index={index} onClick={this.removeNote}>Delete</button>
									<Link to={ `/${note.id}` } className="waves-effect waves-light btn pull-right"  >... See more</Link>
								</div>
							</div>
						</div>
					</div>
			    ))}
			</div>	
        )
    }
	};