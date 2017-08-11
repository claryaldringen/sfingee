
import axios from 'axios'
import { getAuthHash } from '../tools/auth'

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

export const SEND_FP_EMAIL = 'SEND_FP_EMAIL';
export const SEND_FP_FAILURE = 'SEND_FP_FAILURE';

export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_DONE = 'UPDATE_USER_DONE';

export const UPLOAD_IMAGES = 'UPLOAD_IMAGES';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const SET_AS_AVATAR = 'SET_AS_AVATAR';

export function signUpUser(formValues) {

	let data = new FormData();
	data.append('name', formValues.name);
	data.append('email', formValues.email);
	data.append('password', formValues.password);
	data.append('image', formValues.image[0]);
	data.append('day', formValues.day);
	data.append('month', formValues.month);
	data.append('year', formValues.year);
	data.append('sex', formValues.sex);

	const request = axios.post('/api/user', data);

	return {
		type: SIGNUP_USER,
		payload: request
	};
}

export function signUpUserSuccess() {
	return {type: SIGNUP_USER_SUCCESS};
}

export function signUpUserFailure() {
	return {type: SIGNUP_USER_FAILURE};
}

export function signInUser(formValues) {
	const request = axios.get('api/authhash/' + formValues.siemail.toLowerCase() + '/' + formValues.sipassword);
	return {
		type: SIGNIN_USER,
		payload: request
	}
}

export function signInUserSuccess() {
	return {type: SIGNIN_USER_SUCCESS};
}

export function signInUserFailure() {
	return {type: SIGNIN_USER_FAILURE};
}

export function sendEmail(formValues) {

	const request = axios.post('/api/forgottenPasswordEmail', {email: formValues.rpemail});

	return {
		type: SEND_FP_EMAIL,
		payload: request
	};
}

export function sendFailure() {
	return {type: SEND_FP_FAILURE};
}

export function setNewPassword(formValues) {

	const request = axios.put('/api/user', {hash: formValues.hash, password: formValues.password1});

	return {
		type: SEND_FP_EMAIL,
		payload: request
	};

}

export function getUser() {

	const request = axios.get('/api/user/' + getAuthHash());

	return {
		type: GET_USER,
		payload: request
	}
}

export function setUser(user) {
	return {type: SET_USER, user: user};
}

export function uploadImages(formValues) {

	const uploaders = formValues.image.map( (image,i) => {
		const data = new FormData();
		data.append('authhash', getAuthHash());
		data.append('index', i);
		data.append('count', formValues.image.length);
		data.append('photos', image);
		return axios.post('/api/images', data, {headers: { "X-Requested-With": "XMLHttpRequest" }});
	});


	return {
		type: UPLOAD_IMAGES,
		payload: axios.all(uploaders)
	};
}

export function deleteImage(index, userId, imageId, isAvatar) {

	axios.delete('/api/image/' + getAuthHash() + '/' + imageId + '/' + isAvatar);

	return({type: DELETE_IMAGE, index: index, userId: userId})
}

export function setAsAvatar(index, userId, image, imageId) {

	axios.put('/api/image/avatar/' + getAuthHash() + '/' + imageId);

	return {type: SET_AS_AVATAR, index: index, userId: userId, imageId: imageId, image: image}
}

export function updateUser(formValues) {

	formValues.authhash = getAuthHash();

	return {type: UPDATE_USER, payload: axios.put('/api/user', formValues)}
}

export function updateUserDone() {
	return {type: UPDATE_USER_DONE}
}
