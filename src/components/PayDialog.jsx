
import React from 'react'

export default class PayDialog extends React.Component {

	render() {
		if(!this.props.visibility) return null

		return(
			<div className="modal fade in" style={{display: 'block',background: 'rgba(51, 51, 51, 0.5)'}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.props.hidePayDialog}>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">Koupit kredity</h4>
						</div>
						<div className="modal-body">
							<h1>Je nám líto, platební brána bude implementována během několika následujících dní.</h1>
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		)
	}

}