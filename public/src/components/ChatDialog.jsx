
import React from 'react'
import { findDOMNode } from 'react-dom'
import { emojify } from 'react-emoji'

import Users from '../containers/ChatUsersContainer'

export default class ChatDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {message: ''};
		this.writting = null;
		this.startTime = 0;
		this.totalTime = 0;
	}

	send(event) {
		event.preventDefault();
		event.stopPropagation();
		if(this.state.message.replace(/\s/g,'')) {
			if(this.writting) {
				this.totalTime += (Date.now() - this.startTime);
				this.startTime = 0;
				clearTimeout(this.writting);
			}
			this.totalTime += this.state.message.replace(/\s+/g,' ').split(' ').length*333;
			this.props.send(this.props.user.id, this.props.userId, this.state.message, this.totalTime);
			this.props.chatMessage({from: this.props.user.id, to: this.props.userId, msg: this.state.message}, this.props.user.id);
			this.setState({message: ''});
			this.totalTime = 0;
		}
	}

	handleChange(event) {
		this.setState({message: event.target.value});
	}

	handleKeyDown(event) {

		if(!this.startTime) {
			this.startTime = Date.now();
		}

		if(event.key == 'Enter') {
			this.send(event);
			return;
		}

		if(this.writting) {
			clearTimeout(this.writting);
		} else {
			this.props.send(this.props.user.id, this.props.userId, '{{WRITE_START}}');
		}

		this.writting = setTimeout(() => {
			this.writting = null;
			this.totalTime += 1500;
			this.startTime = 0;
			this.props.send(this.props.user.id, this.props.userId, '{{WRITE_STOP}}');
		}, 1500);

	}

	handleKeyUp(event) {
	}

	scrollToBottom() {
		const elem = findDOMNode(this.refs.main);

		if (elem) {
			elem.scrollTop = elem.scrollHeight;
		}
	}

	showProfile() {
		this.props.showProfile(this.props.titleId);
	}

	openChat(id) {
		if(id != this.props.userId) {
			this.props.openChat(id);
			let chat = this.props.chats.get(id);
			let lastMessage = chat[chat.length-1];
			if(lastMessage && lastMessage[2] != '{{READED}}') {
				this.props.send(this.props.user.id, id, '{{READED}}');
				this.props.chatMessage({from: this.props.user.id, to: id, msg: '{{READED}}'}, this.props.user.id);
			}
		}
	}

	endChat(id, event) {
		event.stopPropagation();
		event.preventDefault();
		this.props.send(this.props.user.id, id, '{{CHAT_END}}');
		this.props.chatEnd(this.props.user.id, id);
	}

	componentDidMount() {
		if(this.props.user.id == null) {
			this.props.getUser();
		}

		if(this.props.visibility) {
			this.scrollToBottom();
		}
	}

	componentDidUpdate() {
		if(this.props.visibility) {
			this.scrollToBottom();
		}
	}

	render() {
		if(!this.props.visibility) return null;

		var lastMessage = {message: null, from: null};

		let messages = this.props.conversation.map( (message, index) => {

			lastMessage = {from: message[0], message: message[2]};

			if(message[2] == '{{CHAT_END}}') {
				return(
					<div className="row" key={'message_' + index}>
						<div className="col-sm-12" style={{textAlign: 'center', color: 'blue'}}>
							Konec placeného chatu
						</div>
					</div>
				);
			}

			if(message[2].indexOf('{{') == 0) return null;

			let align = message[0] == this.props.userId ? '' : 'col-sm-offset-6';

			let bcgColor = message[0] == this.props.userId ? '#CCCCCC' : '#337ab7';
			let color = message[0] == this.props.userId ? '#333333' : '#FFFFFF';

			return(
				<div className="row" key={'message_' + index}>
					<div className={'col-sm-6 ' + align} >
						<div style={{backgroundColor: bcgColor, color: color, borderRadius: 8, padding: 8, margin: 8}}>
						{emojify(message[2])}
						</div>
					</div>
				</div>
			);
		});

		let readed = null;
		if(lastMessage.message == '{{READED}}' && lastMessage.from*1 == this.props.userId*1) {
			readed = <div className="col-md-12" style={{textAlign: 'right'}}><span style={{color: '#AAA', fontSize: 10}}>Přečteno</span></div>
		} else if(lastMessage.message == '{{WRITE_START}}' && lastMessage.from == this.props.userId) {
			readed = <div className="col-md-12" style={{textAlign: 'left'}}><span style={{color: '#AAA', fontSize: 10}}>Píše...</span></div>
		}

		let lock = null;
		let user = this.props.users[0];
		if(user.locked) {
			lock =
				<div className="col-md-12" style={{color: 'blue', textAlign: 'center'}}>
					<h4>Počkejte až {user.name} odpoví nebo nebo napište další zprávu za 100 kreditů.</h4>
				</div>
		}

		return(
			<div className="modal fade in" style={{display: 'block',background: 'rgba(51, 51, 51, 0.5)'}}>
				<div className="modal-dialog" style={{width: '70%'}}>
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.props.hideChatDialog}>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title" onClick={this.showProfile.bind(this)}><a style={{cursor: 'pointer'}}>{this.props.title}</a></h4>
						</div>
						<div className="modal-body">
							<div className="row">
								<Users users={this.props.users} userId={this.props.user.id} openChat={this.openChat.bind(this)} endChat={this.endChat.bind(this)}/>
								<div className="col-md-9">
									<div style={{height: 540, overflowY: 'auto', overflowX: 'hidden'}} ref="main" >
										{messages}
										{readed}
										{lock}
									</div>
									<div className="col-md-9">
										<textarea value={this.state.message} onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} onKeyUp={this.handleKeyUp.bind(this)} className="form-control input-lg" rows="1" style={{resize: 'none'}} />
									</div>
									<div className="col-md-3">
										<button className="btn btn-success btn-lg" onClick={this.send.bind(this)}>Odeslat</button>
									</div>
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