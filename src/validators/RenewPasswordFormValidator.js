
const validate = values => {

	const errors = {}

	if (!values.rpemail) {
		errors.rpemail = 'Vyplň prosím svůj email.'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.rpemail)) {
		errors.rpemail = 'Email nemá správný formát.'
	}

	return errors
}

export default validate
