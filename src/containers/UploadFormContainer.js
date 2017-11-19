import UploadForm from '../components/UploadForm'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
	progress: state.images.progress.reduce((sum, imageProgress) => sum += imageProgress, 0),
	total: state.images.total,
	userId: state.user.user.id
})

export default connect(mapStateToProps, null)(UploadForm)