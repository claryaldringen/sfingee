
import React from 'react';

import { getAuthHash } from '../tools/auth';

export default class Pager extends React.Component {

	handleClick(limit) {
		this.props.setLimit(limit);
		this.load(limit);
	}

	load(limit = null) {
		const query = {
			authhash: getAuthHash(),
			man: this.props.man,
			woman: this.props.woman,
			minage: this.props.slider.start,
			maxage: this.props.slider.end,
			limit: limit !== null ? limit : this.props.limit,
		};

		this.props.load(query);
	}

	componentWillMount() {
		this.load();
	}

	render() {

		let circles = [];

		let page = this.props.limit/20;
		let maxPage = Math.ceil(this.props.maxLimit/20);

		console.log(page);
		console.log(maxPage);
		if(page > 0) {
			circles.push(
				<div key={'page_prev'} style={{border: 'solid 1px', background: '#FFFFFF',borderColor: '#0000FF', padding: '10px 12px', margin: 4, borderRadius: 32, cursor: 'pointer', zIndex: 2, float: 'left', cursor: 'pointer'}} onClick={this.handleClick.bind(this, this.props.limit - 20)}>
					<img src="/img/left.png" width={16} height={16} style={{width: 16, height: 16}} />
				</div>
			);
			circles.push(
				<div key={'page_0'} style={{border: 'solid 1px', background: '#FFFFFF',borderColor: '#0000FF', padding: 12, margin: 4, borderRadius: 32, cursor: 'pointer', zIndex: 2, float: 'left', cursor: 'pointer'}} onClick={this.handleClick.bind(this, 0)}>
					<div style={{width: 16, height: 16, fontSize: 16, textAlign: 'center', color: '#0000FF'}}>
						1
					</div>
				</div>
			);
		}

		if(page > 3) {
			circles.push(
				<div key={'page_1'} style={{border: 'solid 1px', background: '#FFFFFF',borderColor: '#999', padding: 12, margin: 4, borderRadius: 32, cursor: 'pointer', zIndex: 2, float: 'left'}}>
					<div style={{width: 16, height: 16, fontSize: 16, textAlign: 'center', color: '#999'}}>
						...
					</div>
				</div>
			);
		}


		for(let i = page-1 > 0 ? page - 2 : page > 0 ? page-1 : page; i <= page+2 && i <= maxPage; i++) {
			let bColor = '#0000FF';
			let color = '#0000FF';
			let bcgColor = '#FFFFFF';
			let cursor = 'pointer';
			let click = this.handleClick;
			if(i == page) {
				color = '#FFFFFF';
				bcgColor = '#0000FF';
			}
			const style = {border: 'solid 1px', background: bcgColor,borderColor: bColor, padding: '12px 12px', margin: 4, borderRadius: 32, cursor: 'pointer', zIndex: 2, float: 'left', cursor: cursor};
			circles.push(
			<div key={'page_' + i} style={style} onClick={click ? click.bind(this, i * 20) : null}>
				<div style={{width: 16, height: 16, fontSize: 16, textAlign: 'center', color: color}}>
					{i+1}
				</div>
			</div>
			);
		}

		if(page < maxPage) {
			circles.push(
				<div key={'page_next'} style={{border: 'solid 1px', background: '#FFFFFF',borderColor: '#0000FF', padding: '10px 12px', margin: 4, borderRadius: 32, cursor: 'pointer', zIndex: 2, float: 'left', cursor: 'pointer'}} onClick={this.handleClick.bind(this, this.props.limit + 20)}>
					<img src="/img/right.png" width={16} height={16} style={{width: 16, height: 16}} />
				</div>
			);
		}

		return(
			<div className="col-md-12" style={{texAlign: 'center'}}>
				<div style={{height: 52, width: 480, margin: 'auto'}}>
					{circles}
				</div>
			</div>
		);
	}
}