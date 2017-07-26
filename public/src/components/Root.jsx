
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App';
import HomePage from './HomePage';
import PeoplePage from '../containers/PeopleContainer';
import Renew from '../containers/RenewContainer'

export default class Root extends React.Component {

	render() {

		const { store, history } = this.props;

		return(
			<Provider store={store}>
				<Router history={history}>
					<Route path="/app" component={App}>
						<Route path="people" component={PeoplePage}/>
					</Route>
					<Route path="/renewpassword/:hash" component={Renew} />
					<Route path="/" component={HomePage} />
				</Router>
			</Provider>
		);
	}
}