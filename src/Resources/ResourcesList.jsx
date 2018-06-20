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
				this.setState({
					entries: res.data.entry,
					nextPage: res.data.link[1],
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
	
	renderMoreClick = () => {
		axios.get(this.state.nextPage.url)
		.then(res => {
			console.log(res.data.entry);
			console.log(res.data.link[1]);
			const entries = this.state.entries.slice();
			res.data.entry.map(entry => {
				entries.push(entry);
			});
			this.setState({
				entries,
				nextPage: res.data.link[1]
			});
		});
	}

	render () {
		if(!this.state.loaded){
			return null;
		}
        let resources = []
        this.state.entries.map( (entry) => {
			let category = 'no category';
			if(entry.resource.category){
				category = entry.resource.category[0].coding[0].code;;
			}
			let code = 'no code';
			if(entry.resource.code){
				code = entry.resource.code.coding[0].display;
			}
            resources.push(
            <tr key={entry.resource.id} onClick={() => { this.rowClick(entry.resource.id)} }>
                <td>{entry.resource.id}</td>
                <td>{category}</td>
                <td>{code}</td>
                <td>{new Intl.DateTimeFormat('en-GB', { 
    						year: 'numeric', 
    						month: 'long', 
    						day: '2-digit' 
					}).format(new Date(entry.resource.meta.lastUpdated))}
				</td>
            </tr>
            );
            resources = resources.reverse();
		});
		let button = null;
		if(this.state.nextPage){
			button = <button key={this.state.nextPage} onClick={() => this.renderMoreClick()} >More...</button>;
		}
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
				{button}
			</div>
		);
	}
}

export default withRouter(ResourcesList);

