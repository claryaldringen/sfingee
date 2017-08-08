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
		man: state.filter.man,
		woman: state.filter.woman,
		slider: {start: state.filter.minage, end: state.filter.maxage},
		people: state.people
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(People);
