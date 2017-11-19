
import React from 'react'

export function renderInput({ input, label, type, meta: { touched, error, warning } }) {
	return(
		<div className="form-group form-group-lg row">
			<label htmlFor={'input' + input.name} className="col-sm-5 control-label">{label}:</label>
			<div className="col-sm-7">
				<input {...input} placeholder={label} type={type} className="form-control input-lg" id={'input' + input.name} />
				{touched && ((error && <div className="alert alert-danger">{error}</div>) || (warning && <div className="alert alert-warning">{warning}</div>))}
			</div>
		</div>)
}

export function renderSelect({ input, label, options, meta: { touched, error, warning } }) {

	const htmlOptions = options.map( (option, i) => {
		return(<option key={input.name + '_' + i} value={option.id}>{option.value}</option>)
	})

	return(
		<div className="form-group">
			<label htmlFor={'input' + input.name} className="col-sm-5 control-label">{label}:</label>
			<div className="col-sm-7">
				<select id={'input' + input.name} {...input} className="form-control input-lg">
					{htmlOptions}
				</select>
			</div>
		</div>
	)
}

export function renderDateField({input, label, type, meta: {touched, error, warning} }) {

	let min = {day: 1, month: 1, year: 1900}[type]
	let max = {day: 32, month: 13, year: ((new Date(Date.now() - 17*31556926*1000)).getFullYear())}[type]
	let options = []
	for(let i = min; i < max; i++) {
		options.push(<option value={i} key={type + '_o_' + i}>{i}</option>)
	}

	return(
		<div className="col-sm-4">
			<div className="row">
				<label className="col-sm-3 control-label">{label ? label + ':' : null}</label>
				<div className="col-sm-8">
					<select {...input} className="form-control input-lg">{options}</select>
				</div>
			</div>
			{touched && ((error && <div className="alert alert-danger">{error}</div>) || (warning && <div className="alert alert-warning">{warning}</div>))}
		</div>)
}

export function renderTextArea({input, label, meta: {touched, error, warning} }) {
	return(
		<div className="form-group">
			<div className="col-sm-12">
				<label className="control-label">{label}:</label>
				<textarea className="form-control input-lg" {...input} />
			</div>
			{touched && ((error && <div className="alert alert-danger">{error}</div>) || (warning && <div className="alert alert-warning">{warning}</div>))}
		</div>
	)
}

