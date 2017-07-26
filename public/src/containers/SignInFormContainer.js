import SignInForm from '../components/SignInForm';
import { connect } from 'react-redux';

import { showSignUpDialog, showForgottenPasswordDialog } from '../actions/dialogs'

const mapDispatchToProps = (dispatch) => {
	return {
		showSignUpDialog() {
			dispatch(showSignUpDialog());
		},
		showForgottenPasswordDialog() {
			dispatch(showForgottenPasswordDialog())
		}
	}
}

function mapStateToProps(state, ownProps) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
