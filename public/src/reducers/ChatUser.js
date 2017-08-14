import { SET_CHAT_USERS } from '../actions/chat'
import { GET_PROFILE_SUCCESS } from '../actions/people'

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case SET_CHAT_USERS:
			return { ...state, ...action.users };

		case GET_PROFILE_SUCCESS:
			return { ...state, ...{ [action.profile.id]: action.profile}};

		default:
			return state;
	}
}
