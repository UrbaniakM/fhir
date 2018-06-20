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
                    display: res.data.code.coding[0].display,
                    effectiveDateTime: res.data.effectiveDateTime,
                    category: res.data.category[0].coding[0].code,
                    value: res.data.valueQuantity.value + " " + res.data.valueQuantity.unit,
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
                    {this.state.display}
                </div>
                <div>
                    {new Intl.DateTimeFormat('en-GB', { 
    						year: 'numeric', 
    						month: 'long', 
    						day: '2-digit' 
					}).format(new Date(this.state.effectiveDateTime))}
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
