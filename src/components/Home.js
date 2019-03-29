import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import ERCMap from './ERCMap'
import Info from './Info'
import Header from './Header'
// import './Home.css'
// import { initERCMap } from '../actions'

class Home extends Component {
	render(){
		var styles2 = {
	    height: '1000px'
	  }
		return(
			<div>
				<Header />
				<div className="row mx-2 h-100" style={styles2}>
	   			<div className="mt-4 col-12 col-md-4 mb-2 h"> 
		      	<div 
		      		className="card h-100" 
	          > 
	          	<ERCMap />
	    		 	</div> 
	   			</div> 
	   			<div className="col-12 col-md-8 mt-4 mb-2">
	          <Info />
	   			</div> 
				</div> 		
			</div>	
		)
	}
}

// const mapDispatchToProps = dispatch => bindActionCreators({ initMap }, dispatch)
// const mapStateToProps = state => {
	// const { data } = state
	// return { data }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home
