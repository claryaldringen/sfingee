
import { SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, SET_USER,SET_AS_AVATAR, UPDATE_USER, UPDATE_USER_DONE, UNLOCK_SUCCESS, SET_CREDIT } from '../actions/user'

const INITIAL_STATE = {error:null, email: null, registered: false, loading: false, user: {}};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case SIGNUP_USER:
			return { ...state, email: action.payload.config.data.get('email'), loading: true };
		case SIGNUP_USER_SUCCESS:
			return { ...state, registered: true, loading: false };
		case  SIGNUP_USER_FAILURE:
			return { ...state, registered: false, loading: false };
		case SET_USER:
			return { ...state, user: action.user };
		case SET_AS_AVATAR:
			let user = state.user;
			user.avatar = action.image;
			return { ...state, user: user };
		case UPDATE_USER:
			return { ...state, loading: true };
		case UPDATE_USER_DONE:
			return { ...state, loading: false };
		case UNLOCK_SUCCESS:
			let user1 = state.user;
			user1.unlocked = [ ...user1.unlocked, action.imageId ];
			return{ ...state, user: user1 };
		case SET_CREDIT:
			return { ...state, user: { ...state.user, credits: action.credit } };
		default:
			return state;
	}
}
