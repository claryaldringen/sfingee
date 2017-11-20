
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import promise from 'redux-promise'

import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import BootstrapTheme from 'bootstrap/dist/css/bootstrap-theme.css'

import Root from './components/Root'
import dialogs from './reducers/Dialogs'
import user from './reducers/User'
import people from './reducers/People'
import filter from './reducers/Filter'
import chat from './reducers/Chat'
import images from './reducers/Images'
import chatUser from './reducers/ChatUser'

const history = createHistory()

const createStoreWithMiddleware = applyMiddleware(routerMiddleware(history), promise)(createStore)


const reducer = combineReducers({
	dialogs: dialogs,
	user: user,
	people: people,
	filter: filter,
	routing: routerReducer,
	form: formReducer,
	chat: chat,
	images: images,
	chatUser: chatUser
})

const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(<Root store={store} history={history} />, document.getElementById('root'))