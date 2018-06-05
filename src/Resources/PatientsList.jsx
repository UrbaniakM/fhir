import React, { Component } from 'react';

import axios from 'axios';

import { withRouter } from "react-router-dom";

import './PatientsList.css';

class PatientsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		axios.get('http://localhost:8090/baseDstu3/Patient?_count=25&_elements=name,meta,id')
			.then(res => {
                console.log(res.data.entry);
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
        this.props.history.push('/patient/'+id);
	}

    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
	
	render () {
		if(!this.state.loaded){
			return null;
		}
		const patients = [];
		this.state.entries.map( (entry, i) => {
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
		return (
			<div id="Patients-list">
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>Name</th>
                            <th>Family name</th>
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

export default withRouter(PatientsList);

