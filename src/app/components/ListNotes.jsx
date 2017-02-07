import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware, Link } from 'react-router';
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
		
		console.log(event.target.getAttribute('data-id'));
		client.removeOne(event.target.getAttribute('data-id'));
	}

  
    render() {

    	return (
			<div>
				<h3 className="center">Notes</h3>
				<table>
				<thead>
				  <tr>
				      <th data-field="Title">Title</th>
				      <th data-field="Content">Content</th>
				  		<th data-field="Options">Options</th>
				  </tr>
				</thead>
			    {this.state.data.map((note, index) => (
			    	 <tbody key={note.id}>
			    	 	
						<tr>
						
							<td>{note.title}</td>
							<td>{note.content}</td>
							<td><Link to={ `/${note.id}` } ><i className="material-icons pointer" >input</i></Link><i data-id={note.id} onClick={this.removeNote} className="material-icons pointer" >delete</i></td>
						</tr>
			    	 </tbody>
			    ))}
				 </table>
			</div>
        )
    }
};