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
					const id = entry.resource.id;
					let category = 'no category';
					if(entry.resource.category){
						category = entry.resource.category[0].coding[0].code;;
					}
					let code = 'no code';
					if(entry.resource.code){
						code = entry.resource.code.coding[0].display;
					}
					const lastUpdated = entry.resource.meta.lastUpdated;
					entries.push({id, category, code, lastUpdated});
				});
				this.setState({
					entries,
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
            <tr key={entry.id} onClick={() => { this.rowClick(entry.id)} }>
                <td>{entry.id}</td>
                <td>{entry.category}</td>
                <td>{entry.code}</td>
                <td>{entry.lastUpdated}</td>
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

