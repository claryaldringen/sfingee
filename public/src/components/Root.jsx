
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App';
import HomePage from '../containers/HomePageContainer';
import PeoplePage from '../containers/PeopleContainer';
import Renew from '../containers/RenewContainer'
import Profile from '../containers/ProfileContainer'
import NotFound from './NotFound'

export default class Root extends React.Component {

	render() {

		const { store, history } = this.props;

		return(
			<Provider store={store}>
				<Router history={history}>
					<Route path="/app" component={App}>
						<Route path="people" component={PeoplePage}/>
						<Route path="profile/:userId" component={Profile} />
					</Route>
					<Route path="/renewpassword/:hash" component={Renew} />
					<Route path="/" component={HomePage} />
					<Route path="*" component={NotFound} />
				</Router>
			</Provider>
		);
	}
}