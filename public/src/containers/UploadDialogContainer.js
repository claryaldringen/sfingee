import UploadDialog from '../components/UploadDialog';
import { connect } from 'react-redux';

import { hideUploadDialog } from '../actions/dialogs'


const mapDispatchToProps = (dispatch) => {
	return {
		hideUploadDialog() {
			dispatch(hideUploadDialog());
		}
	}
}


function mapStateToProps(state, ownProps) {

	return {
		visibility: state.dialogs.uploadDialog,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadDialog);
