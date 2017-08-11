const validate = values => {

	const errors = {};

	if(!values.name) {
		errors.name = 'Vyplň prosím své jméno.'
	} else if (values.name.length < 2) {
		errors.name = 'Jméno musí být dlouhé mezi 2 a 64 znaky.'
	}

	let feb = 28;
	if(!(values.year%4)  && (values.year%100 || !(values.year%400))) feb++;
	let months = [0,31,feb,31,30,31,30,31,31,30,31,30,31];
	if(values.day*1 > months[values.month]) {
		errors.day = ['','Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Ćervenec', 'Srpen', 'Září', 'Ŕíjen', 'Listopad', 'Prosinec'][values.month] +
			' roku ' + values.year + ' měl pouze ' + months[values.month] + ' dní.'
	}

	return errors;
};

export default validate;
