import React from 'react'
import { RangeSlider }  from 'reactrangeslider';

import { getAuthHash } from '../tools/auth'

export default class Filter extends React.Component {

	load() {
		const query = {
			authhash: getAuthHash(),
			page: 0,
			man: this.props.man,
			woman: this.props.woman,
			minage: this.props.slider.start,
			maxage: this.props.slider.end,
		};

		sessionStorage.setItem('filter', JSON.stringify({
			man: this.props.man,
			woman: this.props.woman,
			minage: this.props.slider.start,
			maxage: this.props.slider.end
		}));

		this.props.load(query);
	}

	componentDidMount() {
		this.load()
	}

	render() {

		return(
			<div>
				<div className="col-md-12">
					<h2>Zobrazit</h2>
				</div>
				<div className="form-group">
					<div className="col-md-6">
					<label style={{fontSize: 24, fontWeight: 'normal'}}>
						<input type="checkbox" style={{width: 24, height: 24}} checked={this.props.man} onChange={this.props.toggleMan}/>
						&nbsp;
						Muže
					</label>
					</div>
					<div className="col-md-6">
						<label style={{fontSize: 24, fontWeight: 'normal'}}>
							<input type="checkbox" style={{width: 24, height: 24}} checked={this.props.woman} onChange={this.props.toggleWoman} />
							&nbsp;
							Ženy
						</label>
					</div>
					<div className="col-md-12">
						<h3>Od {this.props.slider.start} do {this.props.slider.end} let</h3>
					</div>
					<div className="col-md-12">
						<RangeSlider min={18} max={101} value={this.props.slider} step={1} onChange={this.props.sliderChange}/>
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
