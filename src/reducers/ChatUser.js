import { SET_CHAT_USERS, SET_PAYMENT_RECIEVER, SET_CONVERSATION_LOCK } from '../actions/chat'
import { GET_PROFILE_SUCCESS } from '../actions/people'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case SET_CHAT_USERS:
			return { ...state, ...action.users }

		case GET_PROFILE_SUCCESS:
			return { ...state, ...{ [action.profile.id]: action.profile}}

		case SET_PAYMENT_RECIEVER:

			let user1 = state[action.userId]
			user1.reciever = action.value
			return { ...state, ...{ [action.userId]: user1}}

		case SET_CONVERSATION_LOCK:

			let user2 = state[action.userId]
			if(user2) {
				user2.locked = action.value
				return {...state, ...{[action.userId]: user2}}
			}
			return state

		default:
			return state
	}
}
