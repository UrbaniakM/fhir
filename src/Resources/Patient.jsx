import React, { Component } from 'react';

import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import ResourcesList from './ResourcesList.jsx';

class Patient extends Component {
	constructor(props){
		super(props)
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
        // TODO: "More..." button, on click display next events ?_count=xyz
		axios.get('http://localhost:8090/baseDstu3/Patient/' + this.props.match.params.id + '/$everything?_count=25')
			.then(res => {
				console.log(res.data.entry[0]);
                console.log(res.data.entry.slice(1));
				this.setState({
					patient: res.data.entry[0].resource,
                    resources: res.data.entry.slice(1),
					loaded: true,
                    resourcesList: ' '
				});
			});
	}

	componentWillUnmount(){
		// TODO: cancel requests
	}

    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    renderResource = (option) => {
        let resources = ' ';
        if(option === 'observations'){
            resources = <ResourcesList patient={this.props.match.params.id} resourceType="Observation" query="&_sort=date&_count=50" />
        }
        else if(option === 'medicationrequests'){
            resources = <ResourcesList patient={this.props.match.params.id} resourceType="MedicationRequest" query="&_count=50" />
        }
        this.setState({
            resourcesList: resources
        });
    }

	render() {
		if(!this.state.loaded){
			return null;
		}
        let patientName = [];
        if( this.state.patient.name[0].given ) {
            this.state.patient.name[0].given.map( (el) => {
                patientName.push( this.capitalizeFirstLetter(el.toLowerCase()) );
            });
        }
        if( this.state.patient.name[0].family ) {
            if(Array.isArray(this.state.patient.name[0].family)){
                this.state.patient.name[0].family.family.map( (el) => {
                    patientName.push( this.capitalizeFirstLetter(el.toLowerCase()) );
                });
            }
            else {
                patientName.push( this.capitalizeFirstLetter(this.state.patient.name[0].family.toLowerCase()) );
            }
        }
        let birthDate = "";
        if( this.state.patient.birthDate ){
            birthDate = new Intl.DateTimeFormat('en-GB', { 
    						year: 'numeric', 
    						month: 'long', 
    						day: '2-digit' 
						}).format(new Date(this.state.patient.birthDate));
        }
        patientName = patientName.join(' ');
		return (
			<div key={this.state.patient.id} id="Patient">
                <div className="Header">
                    <div className="Birth-date">{birthDate}</div>
                    <div className="Patient-name">{patientName}</div>
                </div>
                <button onClick={() => this.renderResource('observations') }><FontAwesomeIcon icon="stethoscope"/> Observations</button>
                <button onClick={() => this.renderResource('graphs') }><FontAwesomeIcon icon="pills" /> Graphs</button>
                <button onClick={() => this.renderResource('medicationrequests') }><FontAwesomeIcon icon="file-alt" /> Medication Requests</button>
                <div className="Resources-list">
                    {this.state.resourcesList}
                </div>
			</div>
		);
	}
}

export default Patient;
