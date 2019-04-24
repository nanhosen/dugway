import { combineReducers } from 'redux'
import wimsDataReducer from './wimsDataReducer'
import archiveDataReducer from './archiveDataReducer'
import obsDataReducer from './obsDataReducer'

const rootReducer = combineReducers({
	wimsData: wimsDataReducer, 
	archiveData: archiveDataReducer,
	obsData: obsDataReducer
})

export default rootReducer

