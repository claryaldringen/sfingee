import LockDialog from '../components/LockDialog'
import { connect } from 'react-redux'

import { hideLockDialog } from '../actions/dialogs'
import { setLock, setLockDone } from "../actions/user"


const mapDispatchToProps = (dispatch) => {
	return {
		hideLockDialog() {
			dispatch(hideLockDialog())
		},
		setLock(index, imageId, credits) {
			dispatch(setLock(imageId, credits)).then((result) => {
				if (result.payload.response && result.payload.response.status !== 200) {

				}

				dispatch(setLockDone(result.payload.data.userId, index, credits))
				dispatch(hideLockDialog())
			})
		}
	}
}


function mapStateToProps(state, ownProps) {
	return {
		visibility: state.dialogs.lockDialog,
		image: ownProps.images[state.images.lockIndex],
		index: state.images.lockIndex
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LockDialog)