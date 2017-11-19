

import {
	SHOW_VIEWER,
	OPEN_LOCK_DIALOG
} from '../actions/dialogs'
import {SET_PROGRESS, RESET_PROGRESS } from "../actions/user"

const INITIAL_STATE = {index: 0, progress: [], total: 0, lockIndex: 0}

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case SHOW_VIEWER:
			return { ...state, index: action.index }
		case SET_PROGRESS:
			let total = state.total
			if(state.progress[action.index] == null) {
				total += action.total
			}
			let progress = [ ...state.progress ]
			progress[action.index] = action.progress
			return { ...state, progress: progress, total: total}

		case RESET_PROGRESS:

			return { ...state, ...{progress: [], total: 0} }

		case OPEN_LOCK_DIALOG:

			return {  ...state, lockIndex: action.index}

		default:
			return state
	}
}