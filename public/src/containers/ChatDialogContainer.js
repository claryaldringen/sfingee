import ChatDialog from '../components/ChatDialog';
import { connect } from 'react-redux';

import { hideChatDialog,openChatDialog } from '../actions/dialogs'
import { getUser, setUser } from '../actions/user'
import { addMessage, loadChats, setChats } from '../actions/chat'


const mapDispatchToProps = (dispatch) => {
	return {
		hideChatDialog() {
			dispatch(hideChatDialog())
		},
		chatMessage(message, userId) {
			dispatch(addMessage(message.from, message.to, message.msg, userId));
		},
		getUser() {
			return dispatch(getUser()).then((result) => {

				if (result.payload.response && result.payload.response.status !== 200) {
					return;
				}

				dispatch(setUser(result.payload.data));
				dispatch(loadChats()).then((result) => {

					if (result.payload.response && result.payload.response.status !== 200) {
						return;
					}

					dispatch(setChats(result.payload.data));
				});
			});
		},
		openChat(id) {
			dispatch(openChatDialog(id));
		}
	}
}


function mapStateToProps(state, ownProps) {

	let users = [];
	for(let key of state.chat.keys()) {
		for(let i = 0; i < state.people.length; i++) {
			let user = state.people[i];
			if(user.id == key) {
				users.push(
					{id: user.id, image: '/uploads/' + user.email + '/' + user.image + '.' + user.extension, name: user.name, lastActivity: user.lastActivity, unread: 0}
					);
				break;
			}
		}

	}

	let userId = null;
	let conversation = null;
	for(let [id, messages] of state.chat) {
		if(!userId) {
			userId = id;
			conversation = messages;
			continue;
		}

		let unread = 0;
		for(let i = messages.length-1; i > -1; i--) {
			if((messages[i][2] == '{{READED}}' && messages[i][0] != state.user.user.id) || messages[i][0] == state.user.user.id) break;
			if(messages[i][2].indexOf('{{') !== -1) continue;
			unread++;
		}

		if(unread) {
			for(let i = 0; i < users.length; i++) {
				if(users[i].id == id) {
					users[i].unread = unread;
					break;
				}
			}
		}

	}

	return {
		users: users,
		visibility: state.dialogs.chatDialog,
		conversation: conversation,
		userId: userId,
		user: state.user.user,
		chats: state.chat
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDialog);