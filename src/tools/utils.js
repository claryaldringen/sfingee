
import { get } from 'axios'
import { getPeopleSuccess } from '../actions/people'
import { addLimit } from '../actions/filter'

export function getAge(birthdate) {
	return Math.floor((Date.now() - (new Date(birthdate)).getTime())/(31556926*1000))
}

export function loadUsers(query, dispatch) {
	get('/api/users/', {params: query}).then((result) => {

		if (result.status !== 200) {

		}

		if(result.data.error) {
			if (result.data.error.code == 'NOT_AUTHORIZED') {
				window.location.href = '/'
			}
		}

		if(result.data.length > 20) {
			result.data.splice(-1, 1)
			dispatch(addLimit())
		}

		dispatch(getPeopleSuccess(result.data))
	})
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371 // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1)  // deg2rad below
	var dLon = deg2rad(lon2-lon1)
	var a =
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon/2) * Math.sin(dLon/2)

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
	var d = R * c // Distance in km
	return d
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}