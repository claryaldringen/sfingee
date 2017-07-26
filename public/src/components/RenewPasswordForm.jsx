
import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux'

const { DOM: { input } } = React;

import { renderInput } from './InputField';
import validate from '../validators/RenewPasswordFormValidator';
import { sendEmail, sendFailure } from '../actions/user'
import { transformForgottenPasswordDialog } from '../actions/dialogs'

const validateAndSend = (values, dispatch) => {
	return dispatch(sendEmail(values))
		.then((result) => {

			// Note: Error's "data" is in result.payload.response.data (inside "response")
			// success's "data" is in result.payload.data
			if (result.payload.response && result.payload.response.status !== 200) {
				dispatch(sendFailure());
				throw new SubmissionError(result.payload.response.data);
			}

			if(result.payload.data.error) {
				if(result.payload.data.error.code == 'EMAIL_NOT_FOUND') {
					dispatch(sendFailure());
					throw new SubmissionError({rpemail: 'Tento email nebyl nalezen.'});
				}
			}

			dispatch(transformForgottenPasswordDialog(values.rpemail));
		});
};


class RenewPasswordForm extends React.Component{

	render() {

		return (
			<div className="container">
				<form onSubmit={this.props.handleSubmit(validateAndSend)}>
					<div className="form-group">
						<Field name="rpemail" type="email" component={renderInput} label="Tvůj email"/>
						<div className="form-group row col-sm-12">
							<button className="btn btn-success btn-lg col-sm-4">Odeslat pokyny k obnovení hesla na email</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({form: 'RenewPasswordForm', validate})(RenewPasswordForm);

