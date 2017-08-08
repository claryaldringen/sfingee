
import React from 'react'

import Card from '../containers/CardContainer'
import { getAuthHash } from '../tools/auth'

export default class People extends React.Component {

	load() {
		const query = {
			authhash: getAuthHash(),
			page: 0,
			man: this.props.man,
			woman: this.props.woman,
			minage: this.props.slider.start,
			maxage: this.props.slider.end,
		};

		this.props.load(query);
	}

	componentWillMount() {
		this.load()
	}

	render() {
		var cards = [];
		if(this.props.people) {
			cards = this.props.people.map((user, i) => {
				return <Card data={user} key={'uc_' + i}/>
			});
		}

		return(
			<div className="row" style={{background: '#FFFFFF', boxShadow: '4px 4px 8px #EEE'}}>
				{cards}
			</div>
		);
	}

}
