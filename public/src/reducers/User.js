
import { SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, SET_USER } from '../actions/user'
import { SET_CHATS } from '../actions/chat'

const INITIAL_STATE = {error:null, email: null, registered: false, loading: false, user: {}};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case SIGNUP_USER:
			return { ...state, email: action.payload.config.data.get('email'), loading: true};
		case SIGNUP_USER_SUCCESS:
			return { ...state, registered: true, loading: false};
		case  SIGNUP_USER_FAILURE:
			return { ...state, registered: false, loading: false};
		case SET_USER:
			return { ...state, user: action.user};
		default:
			return state;
	}
}
