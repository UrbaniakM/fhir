import React, { Component } from 'react';

class MedicationRequest extends Component {
    componentDidMount() {
        // TODO: "More..." button, on click display next events ?_count=xyz
		axios.get('http://localhost:8090/baseDstu3/MedicationRequest/' + this.props.match.params.id)
			.then(res => {
				console.log(res);
				this.setState({
                    medName: res.data.contained.code.coding.display,
                    usage: res.data.dosageInstruction.text,
					loaded: true
				});
			});
    }
    
    render() {
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
