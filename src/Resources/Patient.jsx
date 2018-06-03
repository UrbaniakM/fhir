import React, { Component } from 'react';

import axios from 'axios';

class Patient extends Component {
	constructor(props){
		super(props)
		// TODO
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		axios.get('http://fhirtest.uhn.ca/baseDstu2/Patient/' + this.props.match.params.id)
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

	render() {
		if(!this.state.loaded){
			return null;
		}
		return (
			<div>

			</div>
		);
	}
}

export default Patient;
