
const validate = values => {

	const errors = {}

	if(!values.password1) {
		errors.password1 = 'Vyplň prosím nové heslo.'
	}

	if(values.password1 != values.password2) {
		errors.password2 = 'Hesla se neshodují.'
	}

	return errors
}

export default validate

