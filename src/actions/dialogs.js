
export const SHOW_SIGNUP_DIALOG = 'SHOW_SIGNUP_DIALOG'
export const HIDE_SIGNUP_DIALOG = 'HIDE_SIGNUP_DIALOG'
export const SHOW_FORGOTTEN_PASSWORD_DIALOG = 'SHOW_FORGOTTEN_PASSWORD_DIALOG'
export const HIDE_FORGOTTEN_PASSWORD_DIALOG = 'HIDE_FORGOTTEN_PASSWORD_DIALOG'
export const TRANSFORM_FORGOTTEN_PASSWORD_DIALOG = 'TRANSFORM_FORGOTTEN_PASSWORD_DIALOG'
export const OPEN_CHAT_DIALOG = 'OPEN_CHAT_DIALOG'
export const HIDE_CHAT_DIALOG = 'HIDE_CHAT_DIALOG'
export const OPEN_UPLOAD_DIALOG = 'OPEN_UPLOAD_DIALOG'
export const HIDE_UPLOAD_DIALOG = 'HIDE_UPLOAD_DIALOG'
export const SHOW_VIEWER = 'SHOW_VIEWER'
export const HIDE_VIEWER = 'HIDE_VIEWER'
export const OPEN_LOCK_DIALOG = 'OPEN_LOCK_DIALOG'
export const HIDE_LOCK_DIALOG = 'HIDE_LOCK_DIALOG'
export const SHOW_PAY_DIALOG = 'SHOW_PAY_DIALOG'
export const HIDE_PAY_DIALOG = 'HIDE_PAY_DIALOG'

export function showSignUpDialog() {
	return {type: SHOW_SIGNUP_DIALOG}
}

export function hideSignUpDialog() {
	return {type: HIDE_SIGNUP_DIALOG}
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

export function openUploadDialog(userId) {
	return {type: OPEN_UPLOAD_DIALOG}
}

export function hideUploadDialog() {
	return {type: HIDE_UPLOAD_DIALOG}
}

export function showViewer(index) {
	return {type: SHOW_VIEWER, index: index}
}

export function hideViewer() {
	return {type: HIDE_VIEWER}
}

export function openLockDialog(index) {
	return {type: OPEN_LOCK_DIALOG, index: index}
}

export function hideLockDialog() {
	return {type: HIDE_LOCK_DIALOG}
}

export function showPayDialog() {
	return {type: SHOW_PAY_DIALOG}
}

export function hidePayDialog() {
	return {type: HIDE_PAY_DIALOG}
}

