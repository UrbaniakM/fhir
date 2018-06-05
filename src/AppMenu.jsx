import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import PatientsList from './Resources/PatientsList';
import Patient from './Resources/Patient';

export default class AppMenu extends Component {
	render() {
		return (
			<Router>
				<div className="App-content">
				    	<Route exact path="/" component={PatientsList} />
					<Route path="/patient/:id" component={Patient} />
				</div>
			</Router>
    	);
	}
}
