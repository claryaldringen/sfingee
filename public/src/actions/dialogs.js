
export const SHOW_SIGNUP_DIALOG = 'SHOW_SIGNUP_DIALOG';
export const HIDE_SIGNUP_DIALOG = 'HIDE_SIGNUP_DIALOG';
export const SHOW_FORGOTTEN_PASSWORD_DIALOG = 'SHOW_FORGOTTEN_PASSWORD_DIALOG';
export const HIDE_FORGOTTEN_PASSWORD_DIALOG = 'HIDE_FORGOTTEN_PASSWORD_DIALOG';
export const TRANSFORM_FORGOTTEN_PASSWORD_DIALOG = 'TRANSFORM_FORGOTTEN_PASSWORD_DIALOG';
export const OPEN_CHAT_DIALOG = 'OPEN_CHAT_DIALOG';
export const HIDE_CHAT_DIALOG = 'HIDE_CHAT_DIALOG';

export function showSignUpDialog() {
	return {type: SHOW_SIGNUP_DIALOG};
}

export function hideSignUpDialog() {
	return {type: HIDE_SIGNUP_DIALOG};
}

export function showForgottenPasswordDialog() {
	return {type: SHOW_FORGOTTEN_PASSWORD_DIALOG}
}

export function hideForgottenPasswordDialog() {
	return {type: HIDE_FORGOTTEN_PASSWORD_DIALOG}
}

export function transformForgottenPasswordDialog(email) {
	return {type: TRANSFORM_FORGOTTEN_PASSWORD_DIALOG, email: email}
}

export function openChatDialog(userId) {
	return {type: OPEN_CHAT_DIALOG, userId: userId}
}

export function hideChatDialog() {
	return {type: HIDE_CHAT_DIALOG}
}


