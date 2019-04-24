import { ARCHIVE_DATA } from '../actions/types'

export default function(state = {}, action){
	switch(action.type) {
		case ARCHIVE_DATA:
			let archiveData = action.payload
			// console.log('archiveData', archiveData)
			return { ...archiveData }
		default:
			return state
	}
}