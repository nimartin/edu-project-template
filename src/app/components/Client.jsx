import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);



class Client {
    findAll(callback){
		fetch("/notes")
		  .then(function (response) {
		  	return response.json()
		  })
		  .then(callback);
    }
    findOneById(callback,id){
		fetch("/notes/"+id)
		  .then(function (response) {
		  	return response.json()
		  })
		  .then(callback);
    }

    createOne(note){
    	fetch('/notes', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    title: note.title,
		    content: note.content,
		  })
		})
    }
 }

const client = new Client();
export default client;