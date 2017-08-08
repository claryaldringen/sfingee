
import React from 'react'

import UploadForm from '../components/UploadForm'

export default class UploadDialog extends React.Component {

	render() {

		if(!this.props.visibility) return null;

		return(
			<div className="modal fade in" style={{display: 'block',background: 'rgba(51, 51, 51, 0.5)'}}>
				<div className="modal-dialog" style={{width: 840}}>
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.props.hideUploadDialog}>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">Nahrávání obrázků</h4>
						</div>
						<div className="modal-body">
							<UploadForm/>
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		);
	}

}