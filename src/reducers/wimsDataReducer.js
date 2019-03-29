import { WIMS_DATA } from '../actions/types'

export default function(state = {}, action){
	switch(action.type) {
		case WIMS_DATA:
			let wimsData = action.payload
			console.log('wimsData', wimsData)
			return { ...wimsData }
		default:
			return state
	}
}