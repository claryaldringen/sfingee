import { connect } from 'react-redux';

import ChatUsers from '../components/ChatUsers';
import { loadChats,setChats } from '../actions/chat';

const mapDispatchToProps = (dispatch) => {
	return {
		getConversations(ids) {
			dispatch(loadChats()).then((result) => {

				if (result.payload.response && result.payload.response.status !== 200) {
					return;
				}

				dispatch(setChats(result.payload.data));
			});
		}
	}
};

function mapStateToProps(state, ownProps) {
	return {
		loaded: state.user.loaded
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUsers);