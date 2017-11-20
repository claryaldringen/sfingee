
import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

export class MapContainer extends React.Component {

	render() {
		return (
			<div className="col-md-9 col-md-offset-1" style={{height: 180}}>
				<Map google={this.props.google} zoom={12} initialCenter={this.props.center}>
					<Marker position={this.props.center} />
				</Map>
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDUI3SkSegDQ7Ldm4HEzZCv3p41UgUxAJA'
})(MapContainer)