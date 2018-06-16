import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import PatientsList from './Resources/PatientsList';
import Patient from './Resources/Patient';
import MedicationRequest from './Resources/MedicationRequest';
import Observation from './Resources/Observation'

export default class AppMenu extends Component {
	render() {
		return (
			<Router>
				<div className="App-content">
				    	<Route exact path="/" component={PatientsList} />
						<Route path='/observation/:id' component={Observation} />
						<Route path='/medicationrequest/:id' component={MedicationRequest} />
					<Route path="/patient/:id" component={Patient} />
				</div>
			</Router>
    	);
	}
}
