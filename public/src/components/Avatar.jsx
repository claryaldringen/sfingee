
import React from 'react'
import { Link } from 'react-router'

export default class Avatar extends React.Component {

	render() {
		return(
			<div style={{textAlign: 'center', borderBottom: 'solid 1px #EEE', padding: 24}}>
				<a href={'/app/profile/' + this.props.id}>
					<div style={{width: 128, height: 128, overflow: 'hidden', borderRadius: 16, margin: 'auto'}}>
						<img src={'/uploads/' + this.props.email + '/' + this.props.image} style={{minHeight: 128, width: '100%'}} />
					</div>
					<h4>{this.props.name}</h4>
				</a>
				<br />
				<img src="/img/coins.png" width="24" height="24" />
				&nbsp;&nbsp;
				{this.props.credits} kreditů
			</div>
		)
	}

}