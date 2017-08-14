import UploadForm from '../components/UploadForm';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
	return {}
}


function mapStateToProps(state, ownProps) {

	let progress = 0;
	for(let i = 0; i < state.images.progress.length; i++) {
		progress += state.images.progress[i];
	}

	return {
		progress: progress,
		total: state.images.total,
		userId: state.user.user.id
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);