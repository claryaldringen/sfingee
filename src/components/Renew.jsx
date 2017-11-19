
import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { signInUserFailure, setNewPassword } from '../actions/user'
import { renderInput } from './InputField'
import validate from '../validators/RenewValidator'

const validateAndSignInUser = (values, dispatch) => {
	return dispatch(setNewPassword(values))
		.then((result) => {

			// Note: Error's "data" is in result.payload.response.data (inside "response")
			// success's "data" is in result.payload.data
			if (result.payload.response && result.payload.response.status !== 200) {
				dispatch(signInUserFailure(result.payload.response.data))
				throw new SubmissionError(result.payload.response.data)
			}

			window.location.href = '/'
		})
}

class Renew extends React.Component {

	render() {
		return(
			<div>
				<nav className="navbar navbar-inverse" style={{margin: 0, borderRadius: 0}}>
					<div className="container">
						<div className="navbar-header">
							<a className="navbar-brand" href="/">
								<span style={{fontSize: 48, color: '#FFF'}}>Sfingee</span>.com
							</a>
						</div>
					</div>
				</nav>
				<div className="container" style={{fontSize: 24}}>
					<div className="row">
						<div className="col-md-8 col-md-offset-2">
							<br />
							<form onSubmit={this.props.handleSubmit(validateAndSignInUser)} className="form-horizontal">
								<Field name="password1" type="password" component={renderInput} label="Nové heslo"/>
								<Field name="password2" type="password" component={renderInput} label="Heslo znovu"/>
								<button className="btn btn-success btn-lg col-md-offset-4 col-md-4">Změnit heslo</button>
							</form>
						</div>
					</div>
				</div>
				<footer className="footer navbar-inverse" style={{position: 'absolute', bottom: 0, left: 0, width: '100%', padding: 12, margin: 0, borderRadius: 0, color: '#FFF'}}>
					<div className="container">
						<div className="col-md-6">
							<a href="/termsofuse">Všeobecné podmínky užívání</a>
							<br/><br/>
							<a href="/privacypolicy">Ochrana soukromí</a>
						</div>
						<div className="col-md-6">
							Provozovatel: <br />
							Martin Zaražil <br />
							IČ: 74901231 <br />
							<a href="mailto:info@sfingee.com">info@sfingee.com</a>
						</div>
					</div>
				</footer>
			</div>
		)
	}
}

export default reduxForm({form: 'Renew', validate})(Renew)