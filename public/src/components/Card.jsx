
import React from 'react'

import { getAge } from '../tools/utils';

export default class Card extends React.Component {

	openChat(event) {
		event.stopPropagation();
		this.props.openChat(this.props.data.id);
	}

	redirect() {
		this.props.openProfile(this.props.data.id);
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

		let price = Math.ceil(this.props.data.chatprice*1.15);

		return(
			<div className="col-lg-3" onClick={this.redirect.bind(this)} >
				<div className="col-sm-12" style={style}>
					<div style={{height: 180, overflow: 'hidden'}}>
						{online}
						<img src={'/uploads/' + this.props.data.email + '/' + this.props.data.image + '.' + this.props.data.extension} style={{width: '100%'}}/>
					</div>
					<h4 style={{paddingLeft: 12}}>
						{this.props.data.name.split(' ')[0]}, {getAge(this.props.data.birthdate)}
					</h4>
					<div className="row">
						<div className="col-md-6">
							<div style={{width: 32, height: 32, backgroundImage: 'url("/img/picture.png")', textAlign: 'center', paddingTop: 6, color: 'blue', margin: 'auto'}} >
								<span style={{background: 'white'}} title={(this.props.data.imgPayCnt+this.props.data.imgFreeCnt) + ' obrázků, z toho ' + this.props.data.imgPayCnt + ' zamčených'}>{this.props.data.imgPayCnt}/{this.props.data.imgFreeCnt}</span>
							</div>
						</div>
						<div className="col-md-6" style={{textAlign: 'right'}}>
							<div style={{width: 32, height: 32, backgroundImage: 'url("/img/speech-bubble.png")', textAlign: 'center', paddingTop: 6, color: 'blue', margin: 'auto'}} onClick={this.openChat.bind(this)} title={'Začít chat za ' + price + ' kreditů za hodinu'}>
								{price ? price : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
