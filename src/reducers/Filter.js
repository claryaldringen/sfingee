
import { TOGGLE_MAN, TOGGLE_WOMAN, SET_AGE,SET_FILTER, ADD_LIMIT, SET_LIMIT, TOGGLE_HETERO, TOGGLE_HOMO, TOGGLE_BI, TOGGLE_ONLINE, SET_CHAT_ONLINE_DONE } from '../actions/filter'

const json = sessionStorage.getItem('filter')
const INITIAL_STATE = json ? { ...JSON.parse(json), ...{limit: 0, maxLimit: 0}}  : {man: false, woman: true, minage: 18, maxage: 30, limit: 0, maxLimit: 0, hetero: true, homo: false, bi: false, online: false}

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case TOGGLE_MAN:
			return { ...state, man: !state.man}
		case TOGGLE_WOMAN:
			return { ...state, woman: !state.woman}
		case SET_AGE:
			return { ...state, minage: action.min, maxage: action.max}
		case SET_FILTER:
			return action.filter
		case ADD_LIMIT:
			return  { ...state, maxLimit: state.limit == state.maxLimit ? state.maxLimit + 20 : state.maxLimit}
		case SET_LIMIT:
			return { ...state, limit: action.limit}
		case TOGGLE_HETERO:
			return { ...state, hetero: !state.hetero}
		case TOGGLE_HOMO:
			return { ...state, homo: !state.homo}
		case TOGGLE_BI:
			return { ...state, bi: !state.bi}
		case TOGGLE_ONLINE:
			return { ...state, online: !state.online}
		case SET_CHAT_ONLINE_DONE:
			return { ...state, chatOnline: action.value}
		default:
			return state
	}
}
