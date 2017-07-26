import SignUpForm from '../components/SignUpForm';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
	return {}
}


function mapStateToProps(state, ownProps) {

	return {
		initialValues: {day: 1, month: 1, year: 1999},
		loading: state.user.loading,
		email: state.user.email,
		registered: state.user.registered
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
