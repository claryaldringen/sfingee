
import axios from 'axios';
import { getPeopleSuccess } from '../actions/people';
import { addLimit } from '../actions/filter';

export function getAge(birthdate) {
	return Math.floor((Date.now() - (new Date(birthdate)).getTime())/(31556926*1000));
}

export function loadUsers(query, dispatch) {
	axios.get('/api/users/', {params: query}).then((result) => {

		if (result.status !== 200) {

		}

		if(result.data.error) {
			if (result.data.error.code == 'NOT_AUTHORIZED') {
				window.location.href = '/';
			}
		}

		if(result.data.length > 20) {
			result.data.splice(-1, 1);
			dispatch(addLimit());
		}

		dispatch(getPeopleSuccess(result.data))
	})
}