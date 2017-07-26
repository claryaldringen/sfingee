
import Card from '../components/Card';
import { connect } from 'react-redux';

import { openChatDialog } from '../actions/dialogs'

const mapDispatchToProps = (dispatch) => {
	return {
		openChat(id) {
			dispatch(openChatDialog(id));
		}
	};
}

function mapStateToProps(state, ownProps) {

	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
