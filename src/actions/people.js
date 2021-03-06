
export const GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'

export function getPeopleSuccess(people) {
	return {type: GET_PEOPLE_SUCCESS, people: people}
}

export function getProfileSuccess(profile) {

	profile.image = profile.images[0].name
	profile.extension = profile.images[0].extension

	return {type: GET_PROFILE_SUCCESS, profile: profile}
}
