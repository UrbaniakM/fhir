import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Icon from 'react-icons-kit';
import { user } from 'react-icons-kit/icomoon';

import PatientsList from './Resources/PatientsList';
import Patient from './Resources/Patient';

export default class AppMenu extends Component {
	render() {
		return (
			<Router>
				<div className="App-menu">
				    	<Route exact path="/" component={PatientsList} />
					<Route path="/patient/:id" component={Patient} />
				</div>
			</Router>
    	);
	}
}
