// export function getText(avgJolInd){
// 	// const sum = biArray.reduce(function (accumulator, currentValue){
// 	//   return parseInt(accumulator) + parseInt(currentValue);
// 	// });
// 	// const average = sum / biArray.length;
// 	// console.log(biVal, 'biVal')
// 	// if( biVal < 10 ){
// 	// 	var precautions = 'No precautions needed'
// 	// 	var level = 'Low'
// 	// 	var cardColor = 'bg-success text-white'
// 	// 	var layerColor = '#ffc107'
// 	// 	// console.log('less 25')
// 	// }
// 	// else if( biVal < 33 && biVal >= 10 ){
// 	// 	var precautions = 'Extra water and fire tools needed'
// 	// 	var level = 'Moderate'
// 	// 	var cardColor = 'bg-warning'
// 	// 	var layerColor = '#28a645'
// 	// 	// console.log('less50')
// 	// }
// 	// else if( biVal >= 30 ){
// 	// 	var precautions = 'hide yo kids, hide yo wife, and hide yo husband'
// 	// 	var level = 'Extreme'
// 	// 	var cardColor = 'bg-danger text-white'
// 	// 	var layerColor = '#dc3545'
// 	// 	// console.log('great50')

// 	// }
// 	// else {
// 	// 	var precautions = 'something weird happened'
// 	// 	var level = 'NAL'
// 	// 	var cardColor = 'bg-danger text-white'
// 	// 	var layerColor = '#afb4ba'
// 	// 	// console.log('weirdl')

// 	// }
// 	var getInfo = jolSwitch(Math.round(avgJolInd))
// 	// return { precautions, level, cardColor, layerColor }


// }
// var getText = avgInd => {
// 	var wholeNum = Math.round(avgInd)
// 	var getInfo = jolSwitch(avgInd)
// 	console.log(getInfo)
// 	return getInfo


export function getText(avgJolInd){
	return jolSwitch(Math.round(avgJolInd))
}

var jolSwitch = avg => ({
	1: {
		precautions: 'All operations are GO with routine and standard operating precautions or restrictions. Excellent time for prescribed burns, such as the burning of tumbleweed along fence lines.',
		level: 'Low',
		cardColor: '#bee1b8',
		textColor: 'white',
		layerColor: 'rgba(191,226,186,0.8)'	
	},
	2: {
		precautions: 'All operations are GO with routine and standard operating precautions or restrictions. Excellent time for prescribed burns, such as the burning of tumbleweed along fence lines.',
		level: 'Low',
		cardColor: '#bee1b8',
		layerColor: 'rgba(191,226,186,0.8)'
	},
	3: {
		precautions: 'No restrictions within cleared areas or recently burned over areas where fuels have been either removed or not completely reestablished enough to carry fire. In all other areas, firebreaks and greenstrips must be in place and maintained to an effective and acceptable standard to contain a wildfire within that fire management area for which they were designed. All flammable vegetation in the area of activity is of low value and vulnerability. If operations are to be scheduled without fuelbreaks in place, it is strongly recommended that prior to start of a test or training exercise that a standby dozer or grader as a fireline building asset be prepositioned nearby.',
		level: 'Moderate',
		cardColor: '#f7f77a',
		layerColor: 'rgba(240, 240, 105, 0.8)'
	},
	4: {
		precautions: 'Restrict the use of any heat producing ordnance such as rockets, tracer, HE rounds, and blowing in place operations where vegetation functions as fuel. No restrictions within cleared areas or recently burned over areas where fuels have been either removed or not completely reestablished enough to carry fire. In all other areas, firebreaks and greenstrips must be in place and maintained to an effective standard to contain wildfire if started. If military activities must take place (and they can be), clearance must be obtained from a joint review of the safety training plan by the Fire Department, NRO, and Operations. This joint review will present a Go or NO-GO.',
		level: 'High',
		cardColor: '#f8be8a',
		layerColor: 'rgba(248, 190, 138, 0.7)'
	},
	5: {
		precautions: 'Use extreme caution and allow only essential and high cost military activities to continue under this Extreme rating. No military activity (testing or training) shall take place that uses heat producing ordnance until the FDA color code is yellow or lower. Exceptions: restrict training to the following ranges: Mustang Village Small Arms Range, Stark Road Rifle Range and Shoot House, and OP1 Thumb; restrict testing to non-combustible improved surfaces: APG, West Vertical, Tower Grid, etc. Commanding Officer approval as a GO decision is essential prior to any training or testing that uses heat producing ordnance (outside of accepted areas). This will be done after the Commanding Officer reviews the joint recommendation by the Fire Department, Natural Resources and an Operations GO decision.',
		level: 'Extreme',
		cardColor: '#db707c',
		layerColor: 'rgba(204, 98, 109, 0.7)'
	},
})[avg]

// jolSwitch = (avg) => ({
//   "border": "Border Collies are good boys and girls.",
//   "pitbull": "Pit Bulls are good boys and girls.",
//   "german": "German Shepherds are good boys and girls."
// })[breed]

// var getText = avgInd => ({
// 	// var wholeNum = Math.round(avgInd)
// 	var getInfo = jolSwitch(avgInd)
// 	return getInfo	
// })

// var getText = avgInd => {
// 	var wholeNum = Math.round(avgInd)
// 	var getInfo = jolSwitch(avgInd)
// 	console.log(getInfo)
// 	return getInfo
// }

