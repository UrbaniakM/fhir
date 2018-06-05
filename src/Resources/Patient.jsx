import React, { Component } from 'react';

import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

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
					loaded: true
				});
			});
	}

	componentWillUnmount(){
		// TODO: cancel requests
	}

    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
                <FontAwesomeIcon icon="bed" />
			</div>
		);
	}
}

export default Patient;
