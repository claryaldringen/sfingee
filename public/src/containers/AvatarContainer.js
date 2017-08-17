
import { connect } from 'react-redux';

import Avatar from '../components/Avatar';
import { showPayDialog } from "../actions/dialogs"

const mapDispatchToProps = (dispatch) => {
	return {
		showPayDialog() {
			dispatch(showPayDialog());
		}
	}
}

function mapStateToProps(state, ownProps) {
	return {
		credits: state.user.user.credits,
		name: state.user.user.name,
		email: state.user.user.email,
		image: state.user.user.avatar,
		id: state.user.user.id
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
