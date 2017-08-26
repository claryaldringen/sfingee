
import React from 'react'

export default class ChatUsers extends React.Component {

	setOnline(value, event) {
		event.stopPropagation();
		this.props.setOnline(value);
	}

	render() {

		let users = this.props.users.map( (user, index) => {

			let online = null;
			if(user.lastActivity > Date.now() - 300000) {
				online = <div style={{backgroundColor: '#00FF00', border: 'solid 1px #00BB00', width: 12, height: 12, borderRadius: 6, display: 'inline-block'}} title="Online"/>
			}

			let unread = null;
			if(user.unread) {
				unread = <div style={{backgroundColor: '#FF0000', color: '#FFFFFF', width: 24, height: 24, borderRadius: 12, paddingTop: 2, textAlign: 'center',position: 'absolute',left: 56, bottom: 0 }}>{user.unread}</div>
			}

			let chatEnd = null;
			if(user.reciever) {
				chatEnd =
					<button className="btn btn-danger" style={{float: 'right', fontWeight: 'bold'}} onClick={this.props.endChat.bind(this, user.id)} title="Ukončit placený chat">
						X
					</button>
			}

			let price = Math.ceil(user.chatprice*1.15);

			return(
				<div key={'user_' + index} style={{height: 64, margin: 8, cursor: 'pointer', position: 'relative'}} onClick={this.props.openChat.bind(this, user.id)}>
					{chatEnd}
					<div style={{width: 64, height: 64, borderRadius: 32, overflow: 'hidden', float: 'left'}}>
						<img src={'/uploads/' + user.email + '/' + user.image + '.' + user.extension} width="96"/>
						{unread}
					</div>
					<span style={{fontSize: 18, marginLeft: 8, fontWeight: 'bold'}}>
						{user.name}
						&nbsp;&nbsp;
						{online}
					</span>
					<br />
					<span style={{color: 'blue', marginLeft: 8}}>
						{price ? price + ' kr/hod' : null}
					</span>
				</div>
			);
		});

		return(
			<div className="col-md-3" style={{borderRight: 'solid 1px #e5e5e5', height: 580}}>
				<div className="row" style={{textAlign: 'center', fontSize: 18, borderBottom: '1px solid #e5e5e5', paddingBottom: 16}}>
					<div className="col-sm-6">
						<span onClick={this.setOnline.bind(this, true)} className={'label label-' + (this.props.online ? 'info' : 'default')} style={{cursor: 'pointer'}}>
							Online
						</span>
					</div>
					<div className="col-sm-6">
						<span onClick={this.setOnline.bind(this, false)} className={'label label-' + (this.props.online ? 'default' : 'info')} style={{cursor: 'pointer'}}>
							Všichni
						</span>
					</div>
				</div>
				{users}
			</div>);
	}

}