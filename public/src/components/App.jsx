
import React from 'react'

import Filter from '../containers/FilterContainer'
import ChatDialog from '../containers/ChatDialogContainer'
import Messages from '../containers/MessagesContainer'

export default class App extends React.Component {

	render() {
		return(
			<div style={{background: '#f7f7f7'}}>
				<div className="container">
					<div className="col-md-3">
						<Filter/>
						<Messages />
					</div>
					<div className="col-sm-9">
					{this.props.children}
					</div>
				</div>
				<ChatDialog />
			</div>
		);
	}
}