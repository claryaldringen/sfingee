import React from 'react'

import RenewPasswordForm from '../containers/RenewPasswordFormContainer'

export default class SignUpDialog extends React.Component {

	render() {
		if(!this.props.visibility) return null;

		if(this.props.email) {
			var content =
				<div style={{height: 100, textAlign: 'center'}}>
					<span>Pokyny k obnovení hesla byly odeslány na adresu {this.props.email}.</span>
					<br/>
					<button className="btn btn-info btn-lg col-sm-4" onClick={this.props.hideForgottenPasswordDialog}>Beru na vědomí</button>
				</div>
		} else {
			var content = <RenewPasswordForm/>
		}

		return(
			<div className="modal fade in" style={{display: 'block',background: 'rgba(51, 51, 51, 0.5)'}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.props.hideForgottenPasswordDialog}>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">Zapomenuté heslo</h4>
						</div>
						<div className="modal-body">
							{content}
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		);
	}

}