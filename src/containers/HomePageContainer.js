import HomePage from '../components/HomePage'
import { connect } from 'react-redux'

import { showSignUpDialog } from '../actions/dialogs'

const mapDispatchToProps = (dispatch) => {
	return {
		showSignUpDialog() {
			dispatch(showSignUpDialog())
		}
	}
}


function mapStateToProps(state, ownProps) {

	return {
		initialValues: {sex: 0, day: 1, month: 1, year: 1999},
		loading: state.user.loading,
		email: state.user.email,
		registered: state.user.registered
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)