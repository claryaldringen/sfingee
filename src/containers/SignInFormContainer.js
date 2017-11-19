import SignInForm from '../components/SignInForm'
import { connect } from 'react-redux'

import { showForgottenPasswordDialog } from '../actions/dialogs'

const mapDispatchToProps = (dispatch) => {
	return {
		showForgottenPasswordDialog() {
			dispatch(showForgottenPasswordDialog())
		}
	}
}

function mapStateToProps(state, ownProps) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
