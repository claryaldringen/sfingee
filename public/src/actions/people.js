
export const GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS';

export function getPeopleSuccess(people) {
	return {type: GET_PEOPLE_SUCCESS, people: people}
}