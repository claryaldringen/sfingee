
import Card from '../components/Card'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { openChatDialog } from '../actions/dialogs'

const mapDispatchToProps = (dispatch) => {
	return {
		openChat(id) {
			dispatch(openChatDialog(id))
		},
		openProfile(id) {
			dispatch(push('/app/profile/' + id))
		}

	}
}

function mapStateToProps(state, ownProps) {

	return {
		latitude: state.user.user.latitude,
		longitude: state.user.user.longitude
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
