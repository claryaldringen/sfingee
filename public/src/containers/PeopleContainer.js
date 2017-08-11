import People from '../components/People';
import { connect } from 'react-redux';

import { loadUsers } from '../tools/utils'

const mapDispatchToProps = (dispatch) => {
	return {
		load(query) {
			loadUsers(query, dispatch);
		}
	};
};

function mapStateToProps(state, ownProps) {

	return {
		people: state.people
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(People);
