import { combineReducers } from 'redux'
import wimsDataReducer from './wimsDataReducer'
import archiveDataReducer from './archiveDataReducer'
import obsDataReducer from './obsDataReducer'
import forecastDataReducer from './forecastDataReducer'
import nwsForecastReducer from './nwsForecastReducer'

const rootReducer = combineReducers({
	wimsData: wimsDataReducer, 
	archiveData: archiveDataReducer,
	obsData: obsDataReducer,
	forecastData: forecastDataReducer,
	nwsForecast: nwsForecastReducer
})

export default rootReducer

