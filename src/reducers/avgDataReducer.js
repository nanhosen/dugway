import { AVG_DATA } from '../actions/types'

export default function(state = {}, action){
	switch(action.type) {
		case AVG_DATA:
			let averageData = action.payload
			// console.log('archiveData', archiveData)
			return { ...averageData }
		default:
			return state
	}
}