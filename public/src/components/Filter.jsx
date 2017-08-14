import React from 'react'
import { RangeSlider }  from 'reactrangeslider';

import { getAuthHash } from '../tools/auth'

export default class Filter extends React.Component {

	load() {
		const query = {
			authhash: getAuthHash(),
			man: this.props.man,
			woman: this.props.woman,
			minage: this.props.slider.start,
			maxage: this.props.slider.end,
			hetero: this.props.hetero,
			homo: this.props.homo,
			bi: this.props.bi,
			online: this.props.online,
			limit: this.props.limit
		};

		sessionStorage.setItem('filter', JSON.stringify({
			man: this.props.man,
			woman: this.props.woman,
			minage: this.props.slider.start,
			maxage: this.props.slider.end,
			hetero: this.props.hetero,
			homo: this.props.homo,
			bi: this.props.bi,
			online: this.props.online,
		}));

		this.props.load(query);
	}

	render() {

		return(
			<div>
				<div className="col-md-12">
					<h3>Zobrazit</h3>
				</div>
				<div className="form-group">
					<div className="col-md-6">
					<label style={{fontSize: 18, fontWeight: 'normal'}}>
						<input type="checkbox" style={{width: 18, height: 18}} checked={this.props.man} onChange={this.props.toggleMan}/>
						&nbsp;
						Muže
					</label>
					</div>
					<div className="col-md-6">
						<label style={{fontSize: 18, fontWeight: 'normal'}}>
							<input type="checkbox" style={{width: 18, height: 18}} checked={this.props.woman} onChange={this.props.toggleWoman} />
							&nbsp;
							Ženy
						</label>
					</div>
					<div className="col-md-12">
						<h4>Od {this.props.slider.start} do {this.props.slider.end} let</h4>
					</div>
					<div className="col-md-12">
						<RangeSlider min={18} max={101} value={this.props.slider} step={1} onChange={this.props.sliderChange}/>
					</div>
					<div className="col-md-12">
						<h4>kteří jsou</h4>
					</div>
					<div className="col-md-12">
						<label style={{fontSize: 18, fontWeight: 'normal'}}>
							<input type="checkbox" style={{width: 18, height: 18}} checked={this.props.hetero} onChange={this.props.heteroChange} />
							&nbsp;
							Heterosexuální
						</label>
						<br/>
						<label style={{fontSize: 18, fontWeight: 'normal'}}>
							<input type="checkbox" style={{width: 18, height: 18}} checked={this.props.homo} onChange={this.props.homoChange} />
							&nbsp;
							Homosexuální
						</label>
						<br/>
						<label style={{fontSize: 18, fontWeight: 'normal'}}>
							<input type="checkbox" style={{width: 18, height: 18}} checked={this.props.bi} onChange={this.props.biChange} />
							&nbsp;
							Bisexuální
						</label>
						<br/>
						<label style={{fontSize: 18, fontWeight: 'normal'}}>
							<input type="checkbox" style={{width: 18, height: 18}} checked={this.props.online} onChange={this.props.onlineChange} />
							&nbsp;
							Online
						</label>
					</div>
					<div className="col-md-12" style={{textAlign: 'center'}}>
						<br />
						<button className="btn btn-primary btn-lg" onClick={this.load.bind(this)}>OK</button>
					</div>
				</div>
			</div>
		);
	}
}
