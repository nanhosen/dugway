import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import ERCMap from './ERCMap'
import RenderMap from './RenderMap'
import Info from './Info'
import Header from './Header'
import fdaaLayer from '../layers/fdaaLayer'
// import './Home.css'
// import { initERCMap } from '../actions'

// function incrementFooBy(prevProps, prevState, thiss) {
// 	console.log('inIncrementbyfood', prevProps, prevState, thiss)
//     return (previousState, currentProps) => {
//     	console.log('previousState', previousState, 'currentProps', currentProps)
//     }
// }

function incrementFooBy(curProps) {
	console.log('inIncrementbyfood', curProps)
    return (curProps) => {
    	return { stateObj: curProps}
    }
}

// function incrementFooBy(delta) {
//     return (previousState, currentProps) => {
//         return { ...previousState, foo: previousState.foo + delta };
//     };
// }

class Home extends Component {
	state = { stateObj: null }

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.stateObj !== this.props.stateObj){
			var curProps = this.props
			// this.setState({ stateObj: this.props.stateObj })
			this.setState(incrementFooBy(curProps))
			// this.setState({ stateObj: 'newstate' })
      console.log('updated thsstate', this.state, this.props)
    }
	}
	render = () => {
		console.log('rendered', this)
		var styles2 = {
	    height: '1000px'
	  }
	  // console.log('homethis', this)
	  // console.log('stateObj', stateObj, this.props.stateObj)
 
	  // if(this.props.stateObj !== undefined){
	  // 	// console.log('notundefined, ', this.props.stateObj)
	  // 	// console.log('notundefinedstate, ', this.state)
	  // }
	  // else{
	  // 	const stateObj = this.state
	  // 	// console.log('isundein', stateObj)
	  // }

	  // if(this.state.stateObj !== null){
	  	console.log('this props home js', this.props.stateObj) 
	  	if (this.props.stateObj == undefined) {
	  		console.log('isundefined')
	      return(
					<div>
						<div className="row mx-2 h-100" style={styles2}>
			   			<div className="mt-4 col-12 col-md-4 mb-2 h"> 
				      	<div 
				      		className="card h-100" 
			          > 
			          	<ERCMap layer={fdaaLayer(this.state)}/>
			    		 	</div> 
			   			</div> 
			   			<div className="col-12 col-md-8 mt-4 mb-2">
			          <Info />
			   			</div> 
						</div> 		
					</div>		
				)
	    }
	  	return(
				<div>
					<div className="row mx-2 h-100" style={styles2}>
		   			<div className="mt-4 col-12 col-md-4 mb-2 h"> 
			      	<div 
			      		className="card h-100" 
		          > 
		          	<ERCMap layer={fdaaLayer(this.props.stateObj)}/>
		    		 	</div> 
		   			</div> 
		   			<div className="col-12 col-md-8 mt-4 mb-2">
		          <Info />
		   			</div> 
					</div> 		
				</div>		
			)
	  // }

	  // else{
	  // 	return(<div>noData</div>)
	  // }
	  // var tempObj = 'hi'
	  console.log('rendered. sending this to layer', this.state)
		
	}
}

// const mapDispatchToProps = dispatch => bindActionCreators({ initMap }, dispatch)
// const mapStateToProps = state => {
	// const { data } = state
	// return { data }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home)

const mapStateToProps = reduxState => {
  const state = reduxState.wimsData
  // console.log('this home', state)
  return state
}

export default connect(mapStateToProps)(Home)

// export default Home
