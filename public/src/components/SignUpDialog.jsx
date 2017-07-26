
import React from 'react'

import SignUpForm from '../containers/SignUpFormContainer'

export default class SignUpDialog extends React.Component {

	render() {
		if(!this.props.visibility) return null;

		return(
			<div className="modal fade in" style={{display: 'block',background: 'rgba(51, 51, 51, 0.5)'}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.props.hideSignUpDialog}>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">Registrace</h4>
						</div>
						<div className="modal-body">
							<SignUpForm />
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		);
	}

}