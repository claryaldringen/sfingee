
import React from 'react';

export default class NotFound extends React.Component{

	componentWillMount() {
		window.location.replace('/');
	}

}