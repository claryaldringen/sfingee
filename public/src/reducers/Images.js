

import {
	SHOW_VIEWER,
} from '../actions/dialogs'
import {SET_PROGRESS, RESET_PROGRESS } from "../actions/user";

const INITIAL_STATE = {index: 0, progress: [], total: 0};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case SHOW_VIEWER:
			return { ...state, index: action.index };
		case SET_PROGRESS:
			let total = state.total;
			if(state.progress[action.index] == null) {
				total += action.total
			}
			let progress = [ ...state.progress ];
			progress[action.index] = action.progress;
			return { ...state, progress: progress, total: total};

		case RESET_PROGRESS:

			return { ...state, ...{progress: [], total: 0} };

		default:
			return state;
	}
}