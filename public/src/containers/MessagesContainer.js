
import Messages from '../components/Messages';
import { connect } from 'react-redux';

import { openChatDialog } from '../actions/dialogs'

const mapDispatchToProps = (dispatch) => {
	return {
		openChat(id) {
			dispatch(openChatDialog(id));
		}
	};
};

function mapStateToProps(state, ownProps) {

	let unread = 0;
	let userId = null;
	let max = 0;
	for(var [id, messages] of state.chat) {
		console.log(messages);
		let userUnread = 0;
		for(let i = messages.length-1; i > -1; i--) {
			if(state.user.user.id == messages[i][0] || messages[i][2] == '{{READED}}') {
				if(userUnread > max) {
					max = userUnread;
					userId = id;
				}
				break;
			}

			if(messages[i][2].indexOf('{{') === -1) {
				unread++;
				userUnread++;
			}
		}

		if(userUnread > max) {
			max = userUnread;
			userId = id;
		}
	}

	if(userId == null) userId = id;

	return {
		unread: unread,
		userId: userId,
		opener: state.user.user.id,
		chats: state.chat
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
