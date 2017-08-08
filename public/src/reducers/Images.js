

import {
	SHOW_VIEWER,
} from '../actions/dialogs'

const INITIAL_STATE = {index: 0};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case SHOW_VIEWER:
			return { ...state, index: action.index };
		default:
			return state;
	}
}