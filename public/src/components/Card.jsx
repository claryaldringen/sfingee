
import React from 'react'

import { getAge } from '../tools/utils';

export default class Card extends React.Component {

	openChat(id) {
		this.props.openChat(id);
	}

	redirect(id) {
		this.props.openProfile(id);
	}

	render() {

		let style = {
			border: 'solid 1px #EEE',
			padding: 0,
			marginTop: 12,
			marginBottom: 12,
			borderRadius: 8,
			overflow: 'hidden',
			boxShadow: '1px 1px 5px #EEE',
			cursor: 'pointer'
		};

		let online = null;
		if(this.props.data.lastActivity > Date.now() - 600000) {
			online = <div style={{backgroundColor: '#00FF00', border: 'solid 1px #00BB00', width: 16, height: 16, borderRadius: 8, position: 'absolute', right: 0, margin: 8}} title="Online"/>
		}

		return(
			<div className="col-lg-3" onClick={this.redirect.bind(this, this.props.data.id)}>
				<div className="col-sm-12" style={style}>
				<div style={{height: 260}}>
					{online}
					<img src={'/uploads/' + this.props.data.email + '/' + this.props.data.image + '.' + this.props.data.extension} style={{width: '100%'}}/>
				</div>
				<h3 style={{paddingLeft: 12}}>
					{this.props.data.name.split(' ')[0]}, {getAge(this.props.data.birthdate)}
					<img src="/img/speech-bubble.png" style={{float: 'right', marginRight: 12}} onClick={this.openChat.bind(this, this.props.data.id)} />
				</h3>
				</div>
			</div>
		);
	}

}
