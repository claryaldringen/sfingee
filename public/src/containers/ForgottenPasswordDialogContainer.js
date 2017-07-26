import ForgottenPasswordDialog from '../components/ForgottenPasswordDialog';
import { connect } from 'react-redux';

import { hideForgottenPasswordDialog } from '../actions/dialogs'


const mapDispatchToProps = (dispatch) => {
	return {
		hideForgottenPasswordDialog() {
			dispatch(hideForgottenPasswordDialog())
		}
	}
}


function mapStateToProps(state, ownProps) {
	return {
		email: state.dialogs.forgottenEmail,
		visibility: state.dialogs.forgottenPasswordDialog
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPasswordDialog);