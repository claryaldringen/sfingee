
import { GET_PEOPLE_SUCCESS, GET_PROFILE_SUCCESS } from '../actions/people'
import { DELETE_IMAGE, SET_AS_AVATAR, SET_IMAGES, SET_LOCK_DONE } from "../actions/user";
import { SET_CONVERSATION_LOCK} from "../actions/chat";

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case GET_PEOPLE_SUCCESS:
			return action.people;

		case GET_PROFILE_SUCCESS:
			let changed = false;
			let newState = state.map( (item, index) => {
				if(item.id == action.profile.id) {
					changed = true;
					return action.profile;
				}
				return item;
			});
			if(!changed) newState.push(action.profile);
			return newState;

		case DELETE_IMAGE:
			return state.map( (item, index) => {
				if(item.id == action.userId) {
					item.images.splice(action.index, 1);
				}
				return item;
			});

		case SET_AS_AVATAR:
			return state.map( (item, index) => {
				if(item.id == action.userId) {
					item.images[0].avatar = 0;
					let avatar = item.images.splice(action.index, 1)[0];
					avatar.avatar = 1;
					item.images.unshift(avatar);
					item.avatar = avatar.name + '.' + avatar.extension;
				}
				return item;
			});

		case SET_IMAGES:
			return state.map( (item, index) => {
				if(item.id == action.userId) {
					item.images = action.images;
				}
				return item;
			});

		case SET_LOCK_DONE:
			return state.map( (item, index) => {
				if(item.id == action.userId) {
					item.images = [ ...item.images ];
					item.images[action.index].brutto = action.credits;
					item.images = item.images.sort((a, b) => { return a.brutto - b.brutto});
				}
				return item;
			});

		case SET_CONVERSATION_LOCK:
			state.map( (user) => {
				if(user.id == action.userId) {
					user.locked = action.value;
				}
				return user;
			});

		default:
			return state;
	}
}

