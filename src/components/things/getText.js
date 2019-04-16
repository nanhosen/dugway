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
		precautions: 'No precautions needed',
		level: 'Low',
		cardColor: 'bg-success text-white',
		layerColor: '#28a645'
	},
	2: {
		precautions: 'Extra water and fire tools needed',
		level: 'Moderate',
		cardColor: 'bg-warning',
		layerColor: '#f7ff07'
	},
	3: {
		precautions: 'Extra water and fire tools needed',
		level: 'High',
		cardColor: 'bg-warning',
		layerColor: '#ff7e07'
	},
	4: {
		precautions: 'Extra water and fire tools needed',
		level: 'Very High',
		cardColor: 'bg-warning',
		layerColor: '#bd2130'
	},
	5: {
		precautions: 'Extra water and fire tools needed',
		level: 'Extreme',
		cardColor: 'bg-warning',
		layerColor: '#9221bd'
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

