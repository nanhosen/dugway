import { OBS_DATA } from '../actions/types'

export default function(state = {}, action){
	switch(action.type) {
		case OBS_DATA:
			let archiveData = action.payload
			// console.log('archiveData', archiveData)
			return { ...archiveData }
		default:
			return state
	}
}