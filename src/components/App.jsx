
import React from 'react'
import io from 'socket.io-client'

import Filter from '../containers/FilterContainer'
import ChatDialog from '../containers/ChatDialogContainer'
import Messages from '../containers/MessagesContainer'
import Avatar from '../containers/AvatarContainer'
import PayDialog from '../containers/PayDialogContainer'
import { put } from 'axios'

import { getAuthHash } from "../tools/auth"

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.socket = io()
		this.socket.on('chat message', (msg) => {
			let message = JSON.parse(msg)
			if(message.from == this.props.user.id || message.to == this.props.user.id) {
				this.props.chatMessage(message, this.props.user.id)
				if(message.from == this.props.userId && this.props.chatVisibility && message.msg.indexOf('{{') == -1) {
					this.send(this.props.user.id, message.from, '{{READED}}')
					this.props.chatMessage({from: this.props.user.id, to: message.from, msg: '{{READED}}'}, this.props.user.id)
				} else if(message.msg == '{{ERROR}}' && message.error.code == 'LOW_CREDIT') {
					this.props.removeLastMessage(message.from)
					this.props.showPayDialog()
				} else if(message.msg == '{{CREDIT}}') {
					this.props.setCredit(message.credit)
					this.props.setReciever(message.reciever, true)
				} else if(message.msg == '{{LOCKED}}') {
					this.props.setLock(message.to)
				}
			}
		})
	}

	send(from, to, message, time = 0) {
		this.socket.emit('chat message', JSON.stringify({
			from: from,
			to: to,
			msg: message,
			time: time
		}))
	}

	componentDidMount() {
		this.socket.emit('fuck', JSON.stringify({authhash: getAuthHash()}))
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				put('/api/user', {authhash: getAuthHash(), latitude: position.coords.latitude, longitude: position.coords.longitude})
			})
		}
	}

	render() {
		return(
			<div style={{background: '#f7f7f7'}}>
				<div className="container">
					<div className="col-md-3">
						<Avatar />
						<Filter/>
						<Messages send={this.send.bind(this)} />
					</div>
					<div className="col-sm-9">
					{this.props.children}
					</div>
				</div>
				<ChatDialog send={this.send.bind(this)} />
				<PayDialog />
			</div>
		)
	}
}
