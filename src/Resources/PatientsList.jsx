import React, { Component } from 'react';

import axios from 'axios';

import { withRouter } from "react-router-dom";

import './PatientsList.css';

class PatientsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			filterName: '',
			loaded: false
		}

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:8090/baseDstu3/Patient?_count=25&_elements=name,meta,id')
			.then(res => {
				console.log(res.data.entry);
				console.log(res.data.link[1]);
				this.setState({
					entries: res.data.entry,
					nextPage: res.data.link[1],
					loaded: true
				});
			});
	}

	componentWillUnmount(){
		// TODO: cancel requests
	}

	rowClick = (id) => {
        this.props.history.push('/patient/'+id);
	}

    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	renderMoreClick = () => {
		axios.get(this.state.nextPage.url)
		.then(res => {
			console.log(res.data.entry);
			console.log(res.data.link[1]);
			const entries = this.state.entries.slice();
			res.data.entry.map(entry => {
				entries.push(entry);
			});
			this.setState({
				entries,
				nextPage: res.data.link[1]
			});
		});
	}

	handleChange(event) {
		this.setState({filterName: event.target.value});
		console.log(event.target.value)
	  }
	
	render () {
		if(!this.state.loaded){
			return null;
		}
		console.log(this.state.entries)
		const patients = [];
		let entries = this.state.entries;
		if(this.state.filterName !== '')
		{
			let regEx = new RegExp(this.state.filterName);
			entries = this.state.entries.filter((entry) => {
				return (entry.resource.name[0].given.search(regEx) > -1);
			});
		}
		entries.map( (entry, i) => {
            let patientName = [];
            let familyName = [];
            if( entry.resource.name[0].given) {
                entry.resource.name[0].given.map( (el) => {
                    patientName.push( this.capitalizeFirstLetter(el.toLowerCase()) );
                });
            }
            if( entry.resource.name[0].family) {
                if(Array.isArray(entry.resource.name[0].family)){
                    entry.resource.name[0].family.map( (el) => {
                        familyName.push( this.capitalizeFirstLetter(el.toLowerCase()) );
                    });
                }
                else {
                    familyName.push( this.capitalizeFirstLetter(entry.resource.name[0].family.toLowerCase()) );
                }
            }
            patientName = patientName.join(' ');
            familyName = familyName.join(' ');
			patients.push(
				<tr key={i} onClick={() => { this.rowClick(entry.resource.id)} }>
                    <td className="id-cell">{entry.resource.id}</td>	
					<td>
						{patientName}
					</td>
                    <td>
                        {familyName}
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
		let button = null;
		if(this.state.nextPage){
			button = <button key={this.state.nextPage} onClick={() => this.renderMoreClick()} >More...</button>;
		}
		return (
			<div id="Patients-list">
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>Name: <input type="text" name="name" value={this.state.filterName} onChange={this.handleChange} /></th>
                            <th>Family name</th>
							<th>Last updated</th>
						</tr>
					</thead>
					<tbody>
						{patients}
					</tbody>
				</table>
				{button}
			</div>
		);
	}
}

export default withRouter(PatientsList);

