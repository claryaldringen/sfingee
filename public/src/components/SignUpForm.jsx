
import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Dropzone from 'react-dropzone';
const { DOM: { input } } = React;

import { renderInput, renderSelect, renderDateField } from './InputField';

import validate from '../validators/SignUpFormValidator';
import { signUpUser, signUpUserSuccess, signUpUserFailure } from '../actions/user'

const validateAndSignUpUser = (values, dispatch) => {
	return dispatch(signUpUser(values))
		.then((result) => {

			// Note: Error's "data" is in result.payload.response.data (inside "response")
			// success's "data" is in result.payload.data
			if (result.payload.response && result.payload.response.status !== 200) {
				dispatch(signUpUserFailure(result.payload.response.data));
				throw new SubmissionError(result.payload.response.data);
			}

			if(result.payload.data.error) {
				if(result.payload.data.error.code == 'ER_DUP_ENTRY') {
					dispatch(signUpUserFailure());
					throw new SubmissionError({email: 'Tento email se již používá.'});
				}
			}

			dispatch(signUpUserSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
		});
};


class SignUpForm extends React.Component{

	renderDropzone({ input, meta: { touched, error, warning } }) {
		let img = null;
		if(input.value[0]) {
			img = <img src={input.value[0].preview} style={{width: 'auto', height: '100%'}}/>
		} else {
			img = <div style={{padding: 10}}>Klikni sem pro nahrání portrétu, popřípadě jej sem přetáhni.</div>
		}

		return(
			<div className="form-group">
				<div className="col-sm-12 text-center">
					<div style={{margin: 'auto', width: 200}}>
				<Dropzone {...{multiple: false, accept: 'image/*'}} onDrop={(f) => {return input.onChange(f)}}>
					<div style={{width: '100%', height: '100%', textAlign:'center'}}>{img}</div>
				</Dropzone>
					</div>
				{touched && ((error && <div className="alert alert-danger">{error}</div>) || (warning && <div className="alert alert-warning">{warning}</div>))}
				</div>
			</div>
		);
	}

	render() {

		let button = null;
		if(this.props.loading) {
			button = <button className="btn btn-success btn-lg" style={{opacity: 0.5}}><span className="glyphicon glyphicon-refresh spinning"></span> Probíhá registrace...</button>
		} else if(this.props.registered) {
			button = <div className="alert alert-success">Pokyny k dokončení registrace byly odeslány na email {this.props.email}</div>
		} else {
			button = <button className="btn btn-success btn-lg">Připojit se</button>
		}

		return (
				<form onSubmit={this.props.handleSubmit(validateAndSignUpUser)} className="form-horizontal">
					<Field name="name" type="text" component={renderInput} label="Tvé jméno"/>
					<Field name="email" type="email" component={renderInput} label="Tvůj email"/>
					<Field name="password" type="password" component={renderInput} label="Tvé heslo"/>
					<Field name="sex" options={[{id: 0, value: 'Muž'},{id: 1, value: 'Žena'}]} component={renderSelect} label="Pohlaví"/>
					<div className="form-group">
						<div className="col-sm-12">
							<Field name="day" type="day" component={renderDateField} label="Den"/>
							<Field name="month" type="month" component={renderDateField} label="Měsíc"/>
							<Field name="year" type="year" component={renderDateField} label="Rok"/>
						</div>
					</div>
					<Field name="image" component={this.renderDropzone} />
					<div className="form-group">
						<div className="col-sm-12 text-center">
						{button}
						</div>
					</div>
				</form>
		);
	}
}

export default reduxForm({form: 'LoginForm', validate})(SignUpForm);
