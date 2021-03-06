
import React from 'react'
import SpeechBubblePng from '../img/speech-bubble.png'

export default class Messages extends React.Component {

	openChat() {
		this.props.openChat(this.props.opener, this.props.userId)
		let chat = this.props.chats.get(this.props.userId)
		if(chat) {
			let lastMessage = chat[chat.length - 1]
			if (lastMessage && lastMessage[2] != '{{READED}}') {
				this.props.send(this.props.opener, this.props.userId, '{{READED}}')
			}
		}
	}

	render() {

		let unread = null
		if(this.props.unread) {
			unread = <div style={{backgroundColor: '#FF0000', color: '#FFFFFF', width: 32, height: 32, borderRadius: 16, paddingTop: 6, textAlign: 'center',position: 'absolute',right: 0, bottom: 8,fontWeight: 'bold' }}>{this.props.unread}</div>
			let title = ' nových zpráv'
			if(this.props.unread == 1) {
				title = ' nová zpráva '
			} else if(this.props.unread < 5) {
				title = ' nové zprávy'
			}
			document.title = this.props.unread + title + " - Sfingee.com"
		} else {
			document.title = 'Sfingee.com'
		}

		return(
			<div className="col-md-12" onClick={this.openChat.bind(this)} style={{cursor: 'pointer'}}>
				<img src={SpeechBubblePng} style={{float: 'left', marginRight: 8}} />
				<h3 style={{marginTop: 4}}>Zprávy</h3>
				{unread}
			</div>
		)
	}
}