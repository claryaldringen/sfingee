import { connect } from 'react-redux'

import ChatUsers from '../components/ChatUsers'
import { loadChats, setChats, setChatUsers } from '../actions/chat'
import { setChatOnlineDone } from "../actions/filter"

const mapDispatchToProps = (dispatch) => {
	return {
		getConversations(ids) {
			dispatch(loadChats()).then((result) => {

				if (result.payload.response && result.payload.response.status !== 200) {
					return
				}

				dispatch(setChats(result.payload.data))
			})
		},
		setOnline(value) {
			dispatch(loadChats(value)).then((result) => {

				if (result.payload.response && result.payload.response.status !== 200) {
					return
				}

				dispatch(setChatUsers(result.payload.data.users))
				dispatch(setChats(result.payload.data.chats))
				dispatch(setChatOnlineDone(value))
			})
		}
	}
}

function mapStateToProps(state, ownProps) {
	return {
		loaded: state.user.loaded,
		online: state.filter.chatOnline
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUsers)