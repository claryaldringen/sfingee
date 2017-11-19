
const validate = values => {

	const errors = {}

	if(!values.image) {
		errors.image = 'Nahraj prosím svůj portrét.'
	}

	return errors
}

export default validate
