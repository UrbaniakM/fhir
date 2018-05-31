import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Icon from 'react-icons-kit';
import { user } from 'react-icons-kit/icomoon';

import Patient from './Resources/Patient';

export default class AppMenu extends Component {
	render() {
		return (
			<Router>
				<div className="App-menu">
				    <Link to="/patient"><Icon size={20} icon={user} /> Patient</Link>

				    {/* <Route exact path="/" component={Home} /> */}
				    <Route exact path="/patient" component={Patient} />
				</div>
			</Router>
    	);
	}
}
