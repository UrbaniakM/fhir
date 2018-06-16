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
		axios.get('http://localhost:8090/baseDstu3/Observation/' + this.props.match.params.id + '?_count=25')
			.then(res => {
				console.log(res);
				this.setState({
					patient: res.data.entry[0].resource,
                    resources: res.data.entry.slice(1),
					loaded: true,
                    resourcesList: ' '
				});
			});
    }
    
    render(){
        return null;
    }
}

export default Observation;
