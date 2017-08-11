
import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { renderInput, renderSelect, renderDateField, renderTextArea } from './InputField';
import { getRelationship, getOrientation, getEyes, getHair, getHairLong, getExperience } from '../tools/codebook';

import ImageStrip from '../containers/ImageStripContainer'
import { updateUser, updateUserDone } from '../actions/user'
import validate from '../validators/ProfileValidator';

const { DOM: { input } } = React;

const saveProfile = (values, dispatch) => {
	return dispatch(updateUser(values)).then((result) => {
		dispatch(updateUserDone());
	});
};

class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		};
	}

	openChat() {
		this.props.openChat(this.props.params.userId);
	}

	updateDimensions() {
		this.setState({
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		});
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

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
		let experience = null;
		let orientation = null;
		let visage = null;
		let button = null;
		let name = null;
		let birthdate = null;
		let description = null;
		let chat = null;

		if(!this.props.write) {

			description = <tr><td colSpan="2"><p>{this.props.description}</p></td></tr>

			if (this.props.relationship) {
				relationship =
					<tr>
						<td><b>Vztah:</b></td>
						<td>{this.props.relationship}</td>
					</tr>
			}

			if (this.props.orientation) {
				orientation =
					<tr>
						<td><b>Orientace:</b></td>
						<td>{this.props.orientation}</td>
					</tr>
			}

			if (this.props.visage) {
				visage =
					<tr>
						<td><b>Vzhled:</b></td>
						<td>{this.props.visage}</td>
					</tr>
			}

			if (this.props.experience) {
				experience =
					<tr>
						<td><b>Sexuální zkušenosti:</b></td>
						<td>{this.props.experience}</td>
					</tr>
			}

			chat =
				<button className="btn btn-success btn-lg" style={{float: 'right'}} onClick={this.openChat.bind(this)}>
					<img src="/img/chat.png" width={24} height={24}/>
					&nbsp;
					Chat
				</button>

		} else {

			let options1 = getRelationship()[this.props.sex].map( (item, i) => {
				return({id: i, value: item ? item : ''});
			});

			relationship =
				<tr>
					<td>
						<Field name="relationship" options={options1} component={renderSelect} label="Vztah"/>
					</td>
				</tr>

			let options2 = getOrientation()[this.props.sex].map( (item, i) => {
				return({id: i, value: item ? item : ''});
			});

			orientation =
				<tr>
					<td>
						<Field name="orientation" options={options2} component={renderSelect} label="Orientace"/>
					</td>
				</tr>

			let options3 = getEyes().map( (item, i) => {
				return({id: i, value: item ? item : ''});
			});

			let options4 = getHair().map( (item, i) => {
				return({id: i, value: item ? item : ''});
			});

			let options5 = getHairLong().map( (item, i) => {
				return({id: i, value: item ? item : ''});
			});

			visage = [];
			visage.push(
				<tr key="tr1">
					<td>
						<Field name="tall" type="number" component={renderInput} label="Výška (cm)"/>
					</td>
				</tr>
			);
			visage.push(
				<tr key="tr2">
					<td>
						<Field name="weight" type="number" component={renderInput} label="Váha (kg)"/>
					</td>
				</tr>
			);
			visage.push(
				<tr key="tr3">
					<td>
						<Field name="eyes" options={options3} component={renderSelect} label="Barva očí"/>
					</td>
				</tr>
			);
			visage.push(
				<tr key="tr4">
					<td>
						<Field name="hair" options={options4} component={renderSelect} label="Barva vlasů"/>
					</td>
				</tr>
			);
			visage.push(
				<tr key="tr5">
					<td>
						<Field name="hairLong" options={options5} component={renderSelect} label="Délka vlasů"/>
					</td>
				</tr>
			);

			let options6 = getExperience().map( (item, i) => {
				return({id: i, value: item ? item : ''});
			});

			experience =
				<tr>
					<td>
						<Field name="experience" options={options6} component={renderSelect} label="Sexuální zkušenosti"/>
					</td>
				</tr>

			let inner = null;
			if(!this.props.loading) {
				inner = <button className="btn btn-success btn-lg">Uložit</button>
			} else {
				inner = <div className="alert alert-success">Ukládám...</div>
			}

			button =
				<tr>
					<td>
						<div className="form-group">
							<div className="col-sm-12 text-center">
								{inner}
							</div>
						</div>
					</td>
				</tr>

			name =
				<tr>
					<td>
						<Field name="name" type="text" component={renderInput} label="Jméno"/>
					</td>
				</tr>

			birthdate =
				<tr>
					<td>
						<div className="form-group">
							<div className="col-sm-12">
								<Field name="day" type="day" component={renderDateField} label="Den"/>
								<Field name="month" type="month" component={renderDateField} label="Měsíc"/>
								<Field name="year" type="year" component={renderDateField} label="Rok"/>
							</div>
						</div>
					</td>
				</tr>

			description =
				<tr>
					<td colSpan="2">
						<Field name="description" component={renderTextArea} label="Tvůj popis" />
					</td>
				</tr>

		}


		return(
				<div className="row" style={{background: '#FFFFFF', boxShadow: '4px 4px 8px #EEE', minHeight: this.state.height}}>
					<div className="col-md-12">
						<form onSubmit={this.props.handleSubmit(saveProfile)} className="form-horizontal">
							{chat}
							<h1>
								<div style={{backgroundColor: online, border: 'solid 1px ' + bOnline, width: 16, height: 16, borderRadius: 8, float: 'left', margin: 12}} title={title}/>
								{this.props.name}, {this.props.age}
							</h1>
							<ImageStrip write={this.props.write} userIndex={this.props.userIndex} />
							<h2>Osobní údaje</h2>
							<table className="col-md-8">
								<tbody>
									{name}
									{birthdate}
									{description}
									{orientation}
									{relationship}
									{visage}
									{experience}
									{button}
								</tbody>
							</table>
						</form>
					</div>
				</div>
		);
	}

}

export default reduxForm({form: 'Profile', enableReinitialize : true, validate})(Profile);