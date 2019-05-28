import { NWS_FCST } from '../actions/types'

export default function(state = {}, action){
	switch(action.type) {
		case NWS_FCST:
			let nwsForecast = action.payload
			// console.log('forecastData', forecastData)
			return nwsForecast 
		default:
			return state
	}
}