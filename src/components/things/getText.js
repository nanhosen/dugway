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
		cardColor: 'rgba(40,166,69,0.3)',
		textColor: 'white',
		layerColor: 'rgba(40,166,69,0.6)'	
	},
	2: {
		precautions: 'Extra water and fire tools needed',
		level: 'Moderate',
		cardColor: 'rgba(255,193,7,0.3)',
		layerColor: 'rgba(255,193,7,0.6)'
	},
	3: {
		precautions: 'Extra water and fire tools needed',
		level: 'High',
		cardColor: 'rgba(253,126,20,0.3)',
		layerColor: 'rgba(253,126,20,0.6)'
	},
	4: {
		precautions: 'Extra water and fire tools needed',
		level: 'Very High',
		cardColor: 'rgba(189,33,48,0.3)',
		layerColor: 'rgba(189,33,48,0.6)'
	},
	5: {
		precautions: 'Extra water and fire tools needed',
		level: 'Extreme',
		cardColor: 'rgba(102,16,242,0.3)',
		layerColor: 'rgba(102,16,242,0.6)'
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

