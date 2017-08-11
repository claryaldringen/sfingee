
import React from 'react'

export default class ChatUsers extends React.Component {

	render() {

		let users = this.props.users.map( (user, index) => {

			let online = null;
			if(user.lastActivity > Date.now() - 600000) {
				online = <div style={{backgroundColor: '#00FF00', border: 'solid 1px #00BB00', width: 12, height: 12, borderRadius: 6, display: 'inline-block'}} title="Online"/>
			}

			let unread = null;
			if(user.unread) {
				unread = <div style={{backgroundColor: '#FF0000', color: '#FFFFFF', width: 24, height: 24, borderRadius: 12, paddingTop: 2, textAlign: 'center',position: 'absolute',left: 56, bottom: 0 }}>{user.unread}</div>
			}

			return(
				<div key={'user_' + index} style={{height: 64, margin: 8, cursor: 'pointer', position: 'relative'}} onClick={this.props.openChat.bind(this, user.id)}>
					<div style={{width: 64, height: 64, borderRadius: 32, overflow: 'hidden', float: 'left'}}>
						<img src={'/uploads/' + user.email + '/' + user.image + '.' + user.extension} width="96"/>
						{unread}
					</div>
					<span style={{fontSize: 18, marginLeft: 8, fontWeight: 'bold'}}>
						{user.name}
						&nbsp;&nbsp;
						{online}
					</span>
				</div>
			);
		});

		return(
			<div className="col-md-3" style={{borderRight: 'solid 1px #e5e5e5', height: 680}}>
				{users}
			</div>);
	}

}