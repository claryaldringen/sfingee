
import Viewer from '../components/Viewer';
import { connect } from 'react-redux';

import { showViewer, hideViewer } from '../actions/dialogs'


const mapDispatchToProps = (dispatch) => {
	return {
		hideViewer() {
			dispatch(hideViewer());
		},
		showViewer(index) {
			dispatch(showViewer(index));
		}
	}
}


function mapStateToProps(state, ownProps) {
	return {
		visibility: state.dialogs.viewer,
		index: state.images.index
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
