
import {
	SHOW_SIGNUP_DIALOG,
	HIDE_SIGNUP_DIALOG,
	SHOW_FORGOTTEN_PASSWORD_DIALOG,
	HIDE_FORGOTTEN_PASSWORD_DIALOG,
	TRANSFORM_FORGOTTEN_PASSWORD_DIALOG,
	OPEN_CHAT_DIALOG,
	HIDE_CHAT_DIALOG,
	OPEN_UPLOAD_DIALOG,
	HIDE_UPLOAD_DIALOG,
	SHOW_VIEWER,
	HIDE_VIEWER
} from '../actions/dialogs'

const INITIAL_STATE = {signUpDialog: false, forgottenEmail: null};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case SHOW_SIGNUP_DIALOG:
			return { ...state, signUpDialog: true};
		case HIDE_SIGNUP_DIALOG:
			return { ...state, signUpDialog: false};
		case SHOW_FORGOTTEN_PASSWORD_DIALOG:
			return { ...state, forgottenPasswordDialog: true};
		case HIDE_FORGOTTEN_PASSWORD_DIALOG:
			return { ...state, forgottenPasswordDialog: false};
		case TRANSFORM_FORGOTTEN_PASSWORD_DIALOG:
			return { ...state, forgottenEmail: action.email};
		case OPEN_CHAT_DIALOG:
			return { ...state, chatDialog: true};
		case HIDE_CHAT_DIALOG:
			return { ...state, chatDialog: false};
		case OPEN_UPLOAD_DIALOG:
			return { ...state, uploadDialog: true};
		case HIDE_UPLOAD_DIALOG:
			return { ...state, uploadDialog: false};
		case SHOW_VIEWER:
			return { ...state, viewer: true };
		case HIDE_VIEWER:
			return { ...state, viewer: false };
		default:
			return state;
	}
}

