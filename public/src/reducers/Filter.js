
import { TOGGLE_MAN, TOGGLE_WOMAN, SET_AGE,SET_FILTER } from '../actions/filter'

const json = sessionStorage.getItem('filter');
const INITIAL_STATE = json ? JSON.parse(json) : {man: false, woman: true, minage: 18, maxage: 30};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case TOGGLE_MAN:
			return { ...state, man: !state.man};
		case TOGGLE_WOMAN:
			return { ...state, woman: !state.woman};
		case SET_AGE:
			return { ...state, minage: action.min, maxage: action.max};
		case SET_FILTER:
			return action.filter;
		default:
			return state;
	}
}
