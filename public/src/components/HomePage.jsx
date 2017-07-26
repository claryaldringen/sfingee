
import React from 'react'
import { Link } from 'react-router'

import SignInForm from '../containers/SignInFormContainer'
import SignUpDialog from '../containers/SignUpDialogContainer'
import ForgottenPasswordDialog from '../containers/ForgottenPasswordDialogContainer'

export default class HomePage extends React.Component {

	render() {
		return(
			<div>
				<div className="jumbotron">
					<SignInForm/>
				</div>
				<div className="container">
					<SignUpDialog/>
					<ForgottenPasswordDialog/>
				</div>
			</div>

		);
	}

}
