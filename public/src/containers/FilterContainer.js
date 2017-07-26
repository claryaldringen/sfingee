import Filter from '../components/Filter';
import { connect } from 'react-redux';
import axios from 'axios'
import { push } from 'react-router-redux'

import { toggleMan, toggleWoman, setAge, setFilter } from '../actions/filter'
import { getPeopleSuccess } from '../actions/people'

const mapDispatchToProps = (dispatch) => {
	return {
		toggleWoman() {
			dispatch(toggleWoman());
		},
		toggleMan() {
			dispatch(toggleMan());
		},
		sliderChange(value) {
			if(value.end < 100) {
				dispatch(setAge(value.start, value.end))
			}
		},
		load(query) {
			axios.get('/api/users/', {params: query}).then((result) => {

				if (result.status !== 200) {

				}

				if(result.data.error) {
					if (result.data.error.code == 'NOT_AUTHORIZED') {
						dispatch(push('/'));
					}
				}

				dispatch(getPeopleSuccess(result.data))
			})
		},
		setFilter(filter) {
			dispatch(setFilter(filter));
		}
	};
}

function mapStateToProps(state, ownProps) {

	return {
		man: state.filter.man,
		woman: state.filter.woman,
		slider: {start: state.filter.minage, end: state.filter.maxage}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
