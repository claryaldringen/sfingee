
import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';

import ImageStrip from '../containers/ImageStripContainer'

const { DOM: { input } } = React;

export default class Profile extends React.Component {

	componentWillMount() {
		this.props.load(this.props.params.userId);
	}

	render() {

		let online = '#999999';
		let bOnline = '#666666';
		let title = 'Offline';
		if(this.props.lastActivity > Date.now() - 600000) {
			online = '#00FF00';
			bOnline = '#00BB00';
			title = 'Online';
		}

		if(!this.props.name) {
			return <div>Loading...</div>
		}

		let relationship = null;
		if(this.props.relationship) {
			relationship =
				<tr>
					<td><b>Vztah:</b></td>
					<td>{this.props.relationship}</td>
				</tr>
		}

		let orientation = null;
		if(this.props.orientation) {
			orientation =
				<tr>
					<td><b>Orientace:</b></td>
					<td>{this.props.orientation}</td>
				</tr>
		}

		let visage = null;
		if(this.props.visage) {
			visage =
				<tr>
					<td><b>Vzhled:</b></td>
					<td>{this.props.visage}</td>
				</tr>
		}

		let experience = null;
		if(this.props.experience) {
			experience =
				<tr>
					<td><b>Sexuální zkušenosti:</b></td>
					<td>{this.props.experience}</td>
				</tr>
		}

		console.log(this.props.images);

		return(
				<div className="row" style={{background: '#FFFFFF', boxShadow: '4px 4px 8px #EEE'}}>
					<h1>
						<div style={{backgroundColor: online, border: 'solid 1px ' + bOnline, width: 16, height: 16, borderRadius: 8, float: 'left', margin: 12}} title={title}/>
						{this.props.name}, {this.props.age}
					</h1>
					<ImageStrip write={this.props.write} userIndex={this.props.userIndex} />
					<h2>Osobní údaje</h2>
					<table>
						<tbody>
							<tr>
								<td colSpan="2"><p>{this.props.description}</p></td>
							</tr>
							{orientation}
							{relationship}
							{visage}
							{experience}
						</tbody>
					</table>
				</div>
		);
	}

}