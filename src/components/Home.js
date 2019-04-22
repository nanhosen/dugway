import React, { Component } from 'react'
import { connect } from 'react-redux'

import  Info  from './Info'
import  ERCMap  from './ERCMap'
import  Grid  from './Grid'
import { makeReq } from '../actions' 

export class Home extends Component {
	constructor(props) {
    super(props)
  }
  componentDidMount(){
  	// this.makeReq()
  	// console.log('home mount this', this)
  }

  componentDidUpdate(){
  	// console.log('updated this', this)
  }
  render = () => {
  	if(!this.props.wimsData.fdraInfo){
  		// console.log('noooo data', this)
  		return(
  			<div>Loading</div>
  		)
  	}
  	else{
  		console.log('dataaa Home', this)
			return (
				<div>
					<div className="row mx-2 h-100" >
						<div className="mt-4 col-12 col-md-4 mb-2 h"> 
			      	<div className="card h-100"> 
		          	<ERCMap data = {this.props.wimsData.fdraInfo}/>
		    		 	</div> 
		   			</div> 
		   			<div className="col-12 col-md-8 mt-4 mb-2">
		          <Info data = {this.props.wimsData.fdraInfo}/>
		   			</div>
					</div>
          <div className="row mx-2 h-100" >
            <Grid />
          </div> 		
				</div>

			)
  	}
  	
	}	
}

// export default connect(reduxState => reduxState, { makeReq })(Home)

const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(Home)
// export default connect(mapStateToProps, { makeReq })( Home )