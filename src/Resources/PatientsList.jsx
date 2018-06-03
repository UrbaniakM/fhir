import React, { Component } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import './PatientsList.css';

export default class PatientsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		axios.get('http://fhirtest.uhn.ca/baseDstu2/Patient')
			.then(res => {
				console.log(res);
				this.setState({
					entries: res.data.entry,
					loaded: true
				});
			});
	}

	componentWillUnmount(){
		// TODO: cancel requests
	}

	rowClick = (id) => {
		console.log(id);
		// TODO: push history
	}
	
	render () {
		if(!this.state.loaded){
			return null;
		}
		const patients = [];
		this.state.entries.map( (entry, i) => {
			patients.push(
				<tr key={i} onClick={() => { this.rowClick(entry.resource.id)} }>
				 <td><Link to={'/patient/'+entry.resource.id}>{entry.resource.id}</Link></td>	
					<td>
						{entry.resource.name[0].given}{' '}
						{entry.resource.name[0].family.join(' ')}
					</td>
					<td>{new Intl.DateTimeFormat('en-GB', { 
    						year: 'numeric', 
    						month: 'long', 
    						day: '2-digit' 
						}).format(new Date(entry.resource.meta.lastUpdated))}
					</td>
				</tr>
			);
		});
		return (
			<div id="Patients-list">
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>Name</th>
							<th>Last updated</th>
						</tr>
					</thead>
					<tbody>
						{patients}
					</tbody>
				</table>
			</div>
		);
	}
}

