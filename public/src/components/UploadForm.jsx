import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Dropzone from 'react-dropzone';

import validate from '../validators/SignUpFormValidator';
import { uploadImages } from '../actions/user'
import { hideUploadDialog } from "../actions/dialogs"

const { DOM: { input } } = React;

const validateAndUpload = (values, dispatch) => {
	return dispatch(uploadImages(values))
		.then((result) => {

			// Note: Error's "data" is in result.payload.response.data (inside "response")
			// success's "data" is in result.payload.data
			if (result.payload.response && result.payload.response.status !== 200) {
				throw new SubmissionError(result.payload.response.data);
			}

			dispatch(hideUploadDialog());
		});
};

class UploadForm extends React.Component{

	renderDropzone({ input, meta: { touched, error, warning } }) {
		let img = null;
		if(input.value[0]) {
			img = input.value.map( (image, i) => {

				let size = Math.floor(476/Math.ceil(Math.sqrt(input.value.length)));

				return (
					<div key={'preview_' + i} style={{width: size, height: size, float: 'left', overflow: 'hidden'}}>
						<img src={image.preview} style={{width: 'auto', height: '100%'}}/>
					</div>
				);
			});
		} else {
			img = <div style={{padding: 10}}>Klikni sem pro nahrání obrázků, popřípadě je sem přetáhni.</div>
		}

		let style = {width: 800, height: 480, borderWidth: 2, borderColor: 'rgb(102, 102, 102)', borderStyle: 'dashed', borderRadius: 5};

		return(
			<div className="form-group">
				<div className="col-sm-12 text-center">
					<div style={{margin: 'auto', width: 800, height: 480}}>
						<Dropzone {...{multiple: true, accept: 'image/*'}} onDrop={(f) => {return input.onChange(f)}} style={style}>
							<div style={{width: '100%', height: '100%', textAlign:'center'}}>{img}</div>
						</Dropzone>
					</div>
					{touched && ((error && <div className="alert alert-danger">{error}</div>) || (warning && <div className="alert alert-warning">{warning}</div>))}
				</div>
			</div>
		);
	}

	render() {
		return(
			<form onSubmit={this.props.handleSubmit(validateAndUpload)} className="form-horizontal">
				<Field name="image" component={this.renderDropzone} />
				<div className="form-group">
					<div className="col-sm-12 text-center">
						<button className="btn btn-success btn-lg">Nahrát</button>
					</div>
				</div>
			</form>
		);
	}

}

export default reduxForm({form: 'UploadForm', validate})(UploadForm);