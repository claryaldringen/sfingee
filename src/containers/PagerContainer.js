import Pager from '../components/Pager'
import { connect } from 'react-redux'

import { loadUsers } from '../tools/utils'
import { setLimit } from '../actions/filter'

const mapDispatchToProps = (dispatch) => {
	return {
		setLimit(limit) {
			dispatch(setLimit(limit))
		},
		load(query) {
			loadUsers(query, dispatch)
		}
	}
}

function mapStateToProps(state, ownProps) {

	return {
		man: state.filter.man,
		woman: state.filter.woman,
		slider: {start: state.filter.minage, end: state.filter.maxage},
		limit: state.filter.limit ? state.filter.limit : 0,
		hetero: state.filter.hetero,
		homo: state.filter.homo,
		bi: state.filter.bi,
		online: state.filter.online,
		maxLimit: state.filter.maxLimit ? state.filter.maxLimit : 0,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager)