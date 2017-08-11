
import { TOGGLE_MAN, TOGGLE_WOMAN, SET_AGE,SET_FILTER, ADD_LIMIT, SET_LIMIT } from '../actions/filter'

const json = sessionStorage.getItem('filter');
const INITIAL_STATE = json ? { ...JSON.parse(json), ...{limit: 0, maxLimit: 0}}  : {man: false, woman: true, minage: 18, maxage: 30, limit: 0, maxLimit: 0};

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
		case ADD_LIMIT:
			return  { ...state, maxLimit: state.limit == state.maxLimit ? state.maxLimit + 20 : state.maxLimit};
		case SET_LIMIT:
			return { ...state, limit: action.limit};
		default:
			return state;
	}
}
