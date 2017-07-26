
import { GET_PEOPLE_SUCCESS } from '../actions/people'

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case GET_PEOPLE_SUCCESS:
			return action.people;
		default:
			return state;
	}
}

