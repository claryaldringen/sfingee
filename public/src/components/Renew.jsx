
import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux'

import { signInUserFailure, setNewPassword } from '../actions/user'
import { renderInput } from './InputField';
import validate from '../validators/RenewValidator';

const validateAndSignInUser = (values, dispatch) => {
	return dispatch(setNewPassword(values))
		.then((result) => {

			// Note: Error's "data" is in result.payload.response.data (inside "response")
			// success's "data" is in result.payload.data
			if (result.payload.response && result.payload.response.status !== 200) {
				dispatch(signInUserFailure(result.payload.response.data));
				throw new SubmissionError(result.payload.response.data);
			}

			dispatch(push('/'));
		});
};

class Renew extends React.Component {

	render() {
		return(
			<div style={{background: '#f7f7f7'}}>
				<form onSubmit={this.props.handleSubmit(validateAndSignInUser)} className="form-horizontal">
					<Field name="password1" type="password" component={renderInput} label="Nové heslo"/>
					<Field name="password2" type="password" component={renderInput} label="Heslo znovu"/>
					<button className="btn btn-success btn-lg">Změnit heslo</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({form: 'Renew', validate})(Renew);