export function getText(biVal){
	// const sum = biArray.reduce(function (accumulator, currentValue){
	//   return parseInt(accumulator) + parseInt(currentValue);
	// });
	// const average = sum / biArray.length;
	// console.log(biVal, 'biVal')
	if( biVal < 10 ){
		var precautions = 'No precautions needed'
		var level = 'Low'
		var cardColor = 'bg-success text-white'
		var layerColor = '#ffc107'
		// console.log('less 25')
	}
	else if( biVal < 33 && biVal >= 10 ){
		var precautions = 'Extra water and fire tools needed'
		var level = 'Moderate'
		var cardColor = 'bg-warning'
		var layerColor = '#28a645'
		// console.log('less50')
	}
	else if( biVal >= 30 ){
		var precautions = 'hide yo kids, hide yo wife, and hide yo husband'
		var level = 'Extreme'
		var cardColor = 'bg-danger text-white'
		var layerColor = '#dc3545'
		// console.log('great50')

	}
	else {
		var precautions = 'something weird happened'
		var level = 'NAL'
		var cardColor = 'bg-danger text-white'
		var layerColor = '#afb4ba'
		// console.log('weirdl')

	}
	return { precautions, level, cardColor, layerColor }
}
