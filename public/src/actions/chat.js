
import axios from 'axios'
import { getAuthHash } from '../tools/auth'

export const OPEN_CHAT = 'OPEN_CHAT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const LOAD_CHATS = 'LOAD_CHATS';
export const SET_CHATS = 'SET_CHATS';
export const SET_CHAT_USERS = 'SET_CHAT_USERS';

export function openChat(userId) {
	return {type: OPEN_CHAT, userId: userId}
}

export function addMessage(from, to, message, userId) {
	return {type: ADD_MESSAGE, from: from, to: to, message: message, userId: userId}
}

export function loadChats() {

	const request = axios.get('/api/chats/' + getAuthHash());

	return {type: LOAD_CHATS, payload: request}
}

export function setChats(chats) {
	return {type: SET_CHATS, chats: chats}
}

export function setChatUsers(users) {
	return {type: SET_CHAT_USERS, users: users};
}