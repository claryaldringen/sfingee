
const validate = values => {

	const errors = {}

	if (!values.siemail) {
		errors.siemail = 'Vyplň prosím svůj email.'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.siemail)) {
		errors.siemail = 'Email nemá správný formát.'
	}

	if(!values.sipassword) {
		errors.sipassword = 'Vyplň prosím své heslo.'
	}

	return errors
}

export default validate
