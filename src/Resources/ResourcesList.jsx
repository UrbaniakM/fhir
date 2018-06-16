import React, { Component } from 'react';

import axios from 'axios';

import { withRouter } from "react-router-dom";


class ResourcesList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		console.log('http://localhost:8090/baseDstu3/' + this.props.resourceType + '?patient=' + this.props.patient + this.props.query)
		axios.get('http://localhost:8090/baseDstu3/' + this.props.resourceType + '?patient=' + this.props.patient + this.props.query)
			.then(res => {
				console.log(res.data.entry);
				const entries = [];
				res.data.entry.map( (entry) => {
					//let 
				});
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
        this.props.history.push('/' + this.props.resourceType + '/'+id);
	}
	
	render () {
		if(!this.state.loaded){
			return null;
		}
        let resources = []
        this.state.entries.map( (entry) => {
            resources.push(
            <tr key={entry.resource.id} onClick={() => { this.rowClick(entry.resource.id)} }>
                <td>{entry.resource.id}</td>
                <td>{entry.resource.category[0].coding[0].code}</td>
                <td>{entry.resource.code.coding[0].display}</td>
                <td>{entry.resource.meta.lastUpdated}</td>
            </tr>
            );
            resources = resources.reverse();
        });
		return (
			<div id="Observations-list">
				<table>
					<thead>
						<tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th>Code</th>
                            <th>Date</th>
						</tr>
					</thead>
					<tbody>
                        {resources}
					</tbody>
				</table>
			</div>
		);
	}
}

export default withRouter(ResourcesList);

