import Pager from '../components/Pager';
import { connect } from 'react-redux';

import { loadUsers } from '../tools/utils';
import { setLimit } from '../actions/filter';

const mapDispatchToProps = (dispatch) => {
	return {
		setLimit(limit) {
			console.log(limit);
			dispatch(setLimit(limit));
		},
		load(query) {
			loadUsers(query, dispatch);
		}
	};
};

function mapStateToProps(state, ownProps) {

	console.log(state.filter);

	return {
		man: state.filter.man,
		woman: state.filter.woman,
		slider: {start: state.filter.minage, end: state.filter.maxage},
		limit: state.filter.limit ? state.filter.limit : 0,
		maxLimit: state.filter.maxLimit ? state.filter.maxLimit : 0,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager);