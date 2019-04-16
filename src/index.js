import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import thunk from 'redux-thunk'

import { makeReq } from './actions' 
import './index.css';
import App from './App';
import rootReducer from './reducers'
import * as serviceWorker from './serviceWorker';

console.log(makeReq, 'makereq')
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
// const store = createStoreWithMiddleware(reducers)
const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(makeReq())

ReactDOM.render(
	<Provider store ={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);

serviceWorker.unregister();
