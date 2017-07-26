import SignUpDialog from '../components/SignUpDialog';
import { connect } from 'react-redux';

import { hideSignUpDialog } from '../actions/dialogs'


const mapDispatchToProps = (dispatch) => {
	return {
		hideSignUpDialog() {
			dispatch(hideSignUpDialog())
		}
	}
}


function mapStateToProps(state, ownProps) {
	return {
		visibility: state.dialogs.signUpDialog
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpDialog);
