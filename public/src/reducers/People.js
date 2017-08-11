
import { GET_PEOPLE_SUCCESS, GET_PROFILE_SUCCESS } from '../actions/people'
import { DELETE_IMAGE, SET_AS_AVATAR } from "../actions/user";

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

		default:
			return state;
	}
}

