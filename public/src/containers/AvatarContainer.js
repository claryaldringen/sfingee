

import Avatar from '../components/Avatar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

const mapDispatchToProps = (dispatch) => {
	return {}
}

function mapStateToProps(state, ownProps) {
	return {
		credits: 0,
		name: state.user.user.name,
		email: state.user.user.email,
		image: state.user.user.avatar,
		id: state.user.user.id
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
