
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import App from '../containers/AppContainer'
import HomePage from '../containers/HomePageContainer'
import Renew from '../containers/RenewContainer'
import NotFound from './NotFound'

export default class Root extends React.Component {

	render() {

		const { store, history } = this.props

		return(
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div>
						<Switch>
							<Route path="/app" component={App} />
							<Route path="/" component={HomePage} />
						</Switch>
					</div>
				</ConnectedRouter>
			</Provider>
		)
	}
}