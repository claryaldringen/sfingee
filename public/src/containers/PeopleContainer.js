import People from '../components/People';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {};
};

function mapStateToProps(state, ownProps) {

	return {
		people: state.people
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(People);
