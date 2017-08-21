import ChatDialog from '../components/App';
import { connect } from 'react-redux';

import { addMessage, setPaymentReciever, removeLastMessage, setConversationLock } from '../actions/chat';
import { showPayDialog } from "../actions/dialogs";
import { setCredit} from "../actions/user"

const mapDispatchToProps = (dispatch) => {
	return {
		chatMessage(message, userId) {
			dispatch(addMessage(message.from, message.to, message.msg, userId));
		},
		showPayDialog() {
			dispatch(showPayDialog());
		},
		setCredit(credit) {
			dispatch(setCredit(credit));
		},
		setReciever(reciever, value) {
			dispatch(setPaymentReciever(reciever, value));
		},
		removeLastMessage(userId) {
			dispatch(removeLastMessage(userId, 2));
		},
		setLock(userId) {
			dispatch(setConversationLock(userId, true));
		}
	}
}


function mapStateToProps(state, ownProps) {

	let userId = null;
	for(let [id, messages] of state.chat) {
		if(!userId) {
			userId = id;
			break;
		}
	}

	return {
		chatVisibility: state.dialogs.chatDialog,
		userId: userId,
		user: state.user.user,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDialog);
