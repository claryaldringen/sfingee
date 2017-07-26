
import { OPEN_CHAT, ADD_MESSAGE, SET_CHATS } from '../actions/chat'
import { OPEN_CHAT_DIALOG } from '../actions/dialogs'

// [od koho, id, cas, precteno, zprava]
let INITIAL_STATE = new Map();

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case OPEN_CHAT:
			return state;

		case OPEN_CHAT_DIALOG:

			let conversation = state.get(action.userId*1);
			conversation = conversation ? conversation : [];
			let newState = new Map();
			newState.set(action.userId*1, conversation);
			for (var [key, value] of state) {
				if(key == action.userId) continue;
				newState.set(key, value);
			}

			return newState;

		case ADD_MESSAGE:

			if(action.from == action.userId) {
				var id = action.to;
			} else {
				var id = action.from;
			}

			let conversation2 = state.get(id);
			if(!conversation2) {
				conversation2 = [[action.from, Date.now(), action.message]];
			} else {

				conversation2.push([action.from, Date.now(), action.message])
			}
			state.set(id, conversation2);

			return new Map(state);

		case SET_CHATS:

			const map = new Map();
			Object.keys(action.chats).forEach(key => {
				map.set(key*1, action.chats[key]);
			});
			return map;

		default:
			return state;
	}
}

