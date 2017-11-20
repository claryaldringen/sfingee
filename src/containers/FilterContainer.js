import Filter from '../components/Filter'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { toggleMan, toggleWoman, setAge, setFilter, toggleHetero, toggleHomo, toggleBi, toggleOnline } from '../actions/filter'
import { loadUsers } from '../tools/utils'

const mapDispatchToProps = (dispatch) => {
	return {
		toggleWoman() {
			dispatch(toggleWoman())
		},
		toggleMan() {
			dispatch(toggleMan())
		},
		sliderChange(value) {
			if(value.end < 100) {
				dispatch(setAge(value.start, value.end))
			}
		},
		load(query) {
			dispatch(push('/app/people'))
			loadUsers(query, dispatch)
		},
		setFilter(filter) {
			dispatch(setFilter(filter))
		},
		toggleHetero() {
			dispatch(toggleHetero())
		},
		toggleHomo() {
			dispatch(toggleHomo())
		},
		toggleBi() {
			dispatch(toggleBi())
		},
		toggleOnline() {
			dispatch(toggleOnline())
		},
		toggleVisible() {
			dispatch(push('/app/people'))
		}
	}
}

function mapStateToProps(state, ownProps) {

	return {
		man: state.filter.man,
		woman: state.filter.woman,
		slider: {start: state.filter.minage, end: state.filter.maxage},
		hetero: state.filter.hetero,
		homo: state.filter.homo,
		bi: state.filter.bi,
		online: state.filter.online,
		visible: true, //state.routing.locationBeforeTransitions.pathname == '/app/people',
		limit: state.filter.limit
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
