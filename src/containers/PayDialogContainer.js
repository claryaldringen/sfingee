
import PayDialog from '../components/PayDialog'
import { connect } from 'react-redux'

import { hidePayDialog } from '../actions/dialogs'


const mapDispatchToProps = (dispatch) => {
	return {
		hidePayDialog() {
			dispatch(hidePayDialog())
		}
	}
}


function mapStateToProps(state, ownProps) {

	return {
		visibility: state.dialogs.payDialog,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PayDialog)