import Renew from '../components/Renew';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
	return {}
}


function mapStateToProps(state, ownProps) {

	return {
		initialValues: {hash: ownProps.params.hash},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Renew);
