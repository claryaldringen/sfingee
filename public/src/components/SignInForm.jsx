
import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux'

const { DOM: { input } } = React;

import { renderInput } from './InputField';
import validate from '../validators/SignInFormValidator';
import { signInUser, signInUserFailure } from '../actions/user'
import { setAuthHash } from '../tools/auth'

const validateAndSignUpUser = (values, dispatch) => {
	return dispatch(signInUser(values))
		.then((result) => {

			// Note: Error's "data" is in result.payload.response.data (inside "response")
			// success's "data" is in result.payload.data
			if (result.payload.response && result.payload.response.status !== 200) {
				dispatch(signInUserFailure(result.payload.response.data));
				throw new SubmissionError(result.payload.response.data);
			}

			if(result.payload.data.error) {
				if(result.payload.data.error.code == 'EMAIL_NOT_FOUND') {
					dispatch(signInUserFailure());
					throw new SubmissionError({siemail: 'Tento email nebyl nalezen.'});
				}
			}

			if(result.payload.data.error) {
				if(result.payload.data.error.code == 'BAD_PASSWORD') {
					dispatch(signInUserFailure());
					throw new SubmissionError({sipassword: 'Toto heslo není správné.'});
				}
			}

			setAuthHash(result.payload.data.authhash);
			dispatch(push('/app/people'));
		});
};


class LoginForm extends React.Component{

	render() {

		return (
			<div className="container">
				<form onSubmit={this.props.handleSubmit(validateAndSignUpUser)}>
						<Field name="siemail" type="email" component={renderInput} label="Tvůj email"/>
						<Field name="sipassword" type="password" component={renderInput} label="Tvé heslo"/>
						<div className="form-group row col-sm-12">
							<button className="btn btn-success btn-lg col-sm-offset-2 col-sm-4">Přihlásit se</button>
							<div className="col-sm-6">
								<a onClick={this.props.showForgottenPasswordDialog} style={{fontSize: 18, cursor: 'pointer', color: '#5cb85c'}}>
									Zapomněli jste heslo?
								</a>
							</div>
						</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({form: 'LoginForm', validate})(LoginForm);
