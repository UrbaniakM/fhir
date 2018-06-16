import React, { Component } from 'react';

import axios from 'axios';

class MedicationRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
			loaded: false
		}
    }

    componentDidMount() {
        // TODO: "More..." button, on click display next events ?_count=xyz
		axios.get('http://localhost:8090/baseDstu3/MedicationRequest/' + this.props.match.params.id)
			.then(res => {
				console.log(res);
				this.setState({
                    medName: res.data.medicationCodeableConcept.text,
                    //usage: res.data.dosageInstruction.text,
					loaded: true
				});
			});
    }
    
    render() {
        if(!this.state.loaded){
			return null;
		}
        return (
            <div>
                <div>
                    {this.state.medName}
                </div>
                <div>
                    {this.state.usage}
                </div>
            </div>
        );
    }
}

export default MedicationRequest;
