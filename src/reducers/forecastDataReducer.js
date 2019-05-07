import { FORECAST_DATA } from '../actions/types'

export default function(state = {}, action){
	switch(action.type) {
		case FORECAST_DATA:
			let forecastData = action.payload
			// console.log('forecastData', forecastData)
			return { ...forecastData }
		default:
			return state
	}
}