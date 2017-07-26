
import React from 'react';

export function renderInput({ input, label, type, meta: { touched, error, warning } }) {
	return(
		<div className="form-group">
			<label className="col-sm-3 control-label">{label}:</label>
			<div className="col-sm-9">
				<input {...input} placeholder={label} type={type} className="form-control input-lg"/>
				{touched && ((error && <div className="alert alert-danger">{error}</div>) || (warning && <div className="alert alert-warning">{warning}</div>))}
			</div>
		</div>);
}
