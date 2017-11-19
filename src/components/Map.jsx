
import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

export class MapContainer extends React.Component {

	render() {
		return (
			<Map google={this.props.google} zoom={12} initialCenter={this.props.center} style={{height: 250}} className="col-md-11">
				<Marker position={this.props.center} />
			</Map>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDUI3SkSegDQ7Ldm4HEzZCv3p41UgUxAJA'
})(MapContainer)