
import Viewer from '../components/Viewer'
import { connect } from 'react-redux'

import { showViewer, hideViewer, showPayDialog } from '../actions/dialogs'
import { unlock, unlockFailed, unlockSuccess, setCredit } from '../actions/user'



const mapDispatchToProps = (dispatch) => {
	return {
		hideViewer() {
			dispatch(hideViewer())
		},
		showViewer(index) {
			dispatch(showViewer(index))
		},
		unlock(imageId) {
			dispatch(unlock(imageId)).then( (result) => {

				if (result.payload.response && result.payload.response.status !== 200) {
					dispatch(unlockFailed('Odemčení fotografie se nezdařilo kvůli technickému problému.'))
					return
				}

				if(result.payload.data.error) {
					if(result.payload.data.error.code == 'LOW_CREDIT') {
						dispatch(showPayDialog())
						return
					}
				}

				dispatch(setCredit(result.payload.data.credits))
				dispatch(unlockSuccess(imageId))
			})
		}
	}
}


function mapStateToProps(state, ownProps) {

	return {
		visibility: state.dialogs.viewer,
		index: state.images.index,
		unlocked: state.user.user.unlocked
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
