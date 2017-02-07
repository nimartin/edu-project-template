import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware, Link } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

export default class Header extends Component {
  render() {
    return (
    	<div >
			<nav>
			<div className="nav-wrapper">
			  <a href="#" className="brand-logo">Logo</a>
			  <ul id="nav-mobile" className="right hide-on-med-and-down">
			    <li><a href="sass.html">Sass</a></li>
			    <li><a href="badges.html">Components</a></li>
			    <li><a href="collapsible.html">JavaScript</a></li>
			  </ul>

			</div>
			</nav>
			<Link to="/new" className="btn-floating btn-large halfway-fab waves-effect waves-light teal"  ><i className="material-icons">add</i></Link>
	    </div>
    );
  }
}