import ImageStrip from '../components/ImageStrip';
import { connect } from 'react-redux';

import { openUploadDialog, hideUploadDialog, showViewer } from '../actions/dialogs';
import { deleteImage, setAsAvatar } from '../actions/user';

const mapDispatchToProps = (dispatch) => {
	return {
		openUploadDialog() {
			dispatch(openUploadDialog());
		},
		hideUploadDialog() {
			dispatch(hideUploadDialog());
		},
		showViewer(index) {
			dispatch(showViewer(index))
		},
		delete(index, userId, imageId, isAvatar) {
			dispatch(deleteImage(index, userId, imageId, isAvatar));
		},
		setAsAvatar(index, userId, image, imageId) {
			dispatch(setAsAvatar(index, userId, image, imageId));
		}
	}
}


function mapStateToProps(state, ownProps) {

	const user = state.people[ownProps.userIndex];

	console.log(user.images);

	return {
		userId: user.id,
		email: user.email,
		images: user.images,
		cnt: user.images.length,
		avatar: user.images[0].id
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageStrip);