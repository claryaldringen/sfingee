
import React from 'react'

import Card from '../containers/CardContainer'
import Pager from "../containers/PagerContainer"

export default class People extends React.Component {

	render() {
		var cards = []
		if(this.props.people) {
			cards = this.props.people.map((user, i) => {
				return <Card data={user} key={'uc_' + i}/>
			})
		}

		return(
			<div className="row" style={{background: '#FFFFFF', boxShadow: '4px 4px 8px #EEE'}}>
				{cards}
				<Pager />
			</div>
		)
	}

}
