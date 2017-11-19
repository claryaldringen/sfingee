import RenewPasswordForm from '../components/RenewPasswordForm'
import { connect } from 'react-redux'

import { showSignUpDialog, showForgottenPasswordDialog } from '../actions/dialogs'

const mapDispatchToProps = (dispatch) => {
	return {}
}

function mapStateToProps(state, ownProps) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RenewPasswordForm)