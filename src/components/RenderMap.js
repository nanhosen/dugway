import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import ERCMap from './ERCMap'
import Info from './Info'
import Header from './Header'
import fdaaLayer from '../layers/fdaaLayer'
// import './Home.css'
// import { initERCMap } from '../actions'

class RenderMap extends Component {
	state = { stateObj: null }

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.stateObj !== this.props.stateObj){
			this.setState({ stateObj: this.props.stateObj })
			// this.setState({ stateObj: 'newstate' })
      console.log('updated thsstate', this.state, this.props)
    }
	}
	render = () => {
		// console.log('rendered', this)
		var styles2 = {
	    height: '1000px'
	  }
	  // console.log('RenderMapthis', this)
	  // console.log('stateObj', stateObj, this.props.stateObj)

	  // if(this.props.stateObj !== undefined){
	  // 	// console.log('notundefined, ', this.props.stateObj)
	  // 	// console.log('notundefinedstate, ', this.state)
	  // }
	  // else{
	  // 	const stateObj = this.state
	  // 	// console.log('isundein', stateObj)
	  // }

	  	console.log('notnull', this.state)
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
	  

	  
	  // var tempObj = 'hi'
	  console.log('rendered. sending this to layer', this.state)
		
	}
}

// const mapDispatchToProps = dispatch => bindActionCreators({ initMap }, dispatch)
// const mapStateToProps = state => {
	// const { data } = state
	// return { data }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(RenderMap)

const mapStateToProps = reduxState => {
  const state = reduxState.wimsData
  // console.log('this RenderMap', state)
  return state
}

export default connect(mapStateToProps)(RenderMap)

// export default Home
