
export const TOGGLE_MAN = 'TOGGLE_MAN';
export const TOGGLE_WOMAN = 'TOGGLE_WOMAN';
export const SET_AGE = 'SET_AGE';
export const SET_FILTER = 'SET_FILTER';
export const ADD_LIMIT = 'ADD_LIMIT';
export const SET_LIMIT = 'SET_LIMIT';

export function toggleMan() {
	return {type: TOGGLE_MAN}
}

export function toggleWoman() {
	return {type: TOGGLE_WOMAN}
}

export function setAge(min, max) {
	return {type: SET_AGE, min: min, max: max}
}

export function setFilter(filter) {
	return {type: SET_FILTER, filter: filter}
}

export function addLimit() {
	return {type: ADD_LIMIT};
}

export function setLimit(limit) {
	return {type: SET_LIMIT, limit: limit}
}
