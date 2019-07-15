import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { HashRouter as Router } from 'react-router-dom' 

import { makeReq, getArchive } from './actions' 
import './index.css';
import App from './App';
import rootReducer from './reducers'
import * as serviceWorker from './serviceWorker';

// console.log(makeReq, 'makereq')
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
// const store = createStoreWithMiddleware(reducers)
const loggerMiddleware = createLogger()

const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));
// store.dispatch(makeReq())
// store.dispatch(getArchive())

ReactDOM.render(
	<Provider store ={store}>
		<Router>
			<App />
		</Router>	
	</Provider>, 
	document.getElementById('root')
);

serviceWorker.unregister();
