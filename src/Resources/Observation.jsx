import React, { Component } from 'react';

import axios from 'axios';

class Observation extends Component {
    constructor(props){
        super(props);
        this.state = {
			loaded: false
		}
    }

    componentDidMount() {
        // TODO: "More..." button, on click display next events ?_count=xyz
		axios.get('http://localhost:8090/baseDstu3/Observation/' + this.props.match.params.id)
			.then(res => {
				console.log(res);
				this.setState({
                    display: res.data.code.coding.display,
                    effectiveDateTime: res.data.effectiveDateTime,
                    category: ' ',
                    value: res.data.valueQuantity.value + " " + res.data.valueQuantity.unit,
					loaded: true
				});
			});
    }
    
    render() {
        return (
            <div>
                <div>
                    {this.state.display}
                </div>
                <div>
                    {this.state.effectiveDateTime}
                </div>
                <div>
                    {this.state.category}
                </div>
                <div>
                    {this.state.value}
                </div>
            </div>
        );
    }
}

export default Observation;
