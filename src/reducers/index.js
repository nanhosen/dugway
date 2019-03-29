import { combineReducers } from 'redux'
import wimsDataReducer from './wimsDataReducer'

const rootReducer = combineReducers({
	wimsData: wimsDataReducer
})

export default rootReducer

