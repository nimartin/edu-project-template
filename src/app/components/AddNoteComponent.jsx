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
export default class AddNoteCompenent extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      note: {
	      	title:"",
	      	content:""
	      }
	    };

	    this.handleInputChange = this.handleInputChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  handleInputChange(event) {
	    const name = event.target.name;
	    const value = event.target.value;
	    /*var tmp = {};
	    tmp.title = target.title;
	    tmp.content = target.title;*/
	    let a = {};
	    a[name] = value;
	    let newNote = Object.assign(this.state.note, a);
	    this.setState({note: newNote})
	    console.log(this.state);

	  }

	  handleSubmit(event){
		console.log("here");
	    client.createOne(this.state.note);
	    browserHistory.push('/');
	  }
  
    render() {
    	return (
    		<div className="container">
	    		<h3 className="center">Add a note</h3>
	    		<div className="card white">
	        	<form onSubmit={this.handleSubmit}>

		            <div className="card-content white-text">
		             <label>
			          Title:
			          <input name="title" type="text" value={this.state.note.title} onChange={this.handleInputChange} />
			        </label>
			        <br />
			        <label>
			          Content:
			          <input name="content" type="text" value={this.state.note.content}  onChange={this.handleInputChange} />
			        </label>
		            </div>
		            <div className="card-action">
			        	<input className="waves-effect waves-light btn red darken-2" type="submit" value="Submit" />
		            </div>
		        </form>
		        </div>
	      	</div>
        )
    }
};
