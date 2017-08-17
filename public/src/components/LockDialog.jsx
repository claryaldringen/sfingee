
import React from 'react';

export default class LockDialog extends React.Component {

	lock(event) {
		event.stopPropagation();
		event.preventDefault();
		this.props.setLock(this.props.index, this.props.image.id, this.refs.credits.value);
	}

	render() {

		if (!this.props.visibility) return null;

		return(
			<div className="modal fade in" style={{display: 'block',background: 'rgba(51, 51, 51, 0.5)'}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.props.hideLockDialog}>
								<span aria-hidden={true}>&times;</span>
							</button>
							<h4 className="modal-title">Uzamčení fotografie</h4>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-md-offset-2 col-md-8" style={{height: 280, overflow: 'hidden'}}>
									<img src={'/uploads/' + this.props.email + '/' + this.props.image.name + '.' + this.props.image.extension} style={{width: '100%', border: '1px solid #e5e5e5'}}/>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<p style={{fontSize: 18}}>
									Ostatní uživatelé si mohou odemknout tuto fotografii za níže uvedený počet kreditů. Pokud bude uvedený počet kreditů 0, fotografie bude zdarma přístupná všem.
									</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-offset-3 col-md-1">
									<img src="/img/coins.png" />
								</div>
								<div className="col-md-4">
									<input ref="credits" type="number" className="form-control input-lg" min="0" max="1000000"/>
								</div>
								<div className="col-md-1" style={{paddingTop: 8, fontSize: 18}} value={this.props.image.brutto}>
									kreditů
								</div>
							</div>
							<div className="row">
								<div className="col-md-offset-4 col-md-4">
									<br />
									<button className="btn btn-danger btn-lg" onClick={this.lock.bind(this)}>Zamknout</button>
								</div>
							</div>
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		);

	}
}