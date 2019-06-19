import React, { Component } from 'react'
import { connect } from 'react-redux'



import  Info  from './Info'
import  ERCMap  from './ERCMap'
import  Grid  from './Grid'
import Chart from'./ChartTest'

export class Home extends Component {
	constructor(props) {
    super(props)
  }
  componentDidMount(){
  	// this.makeReq()
    // dispatch(makeReq())
  	// console.log('home mount this', this)
  }

  componentDidUpdate(){
  	// console.log('updated this', this)
  }
  render = () => {
  	if(Object.keys(this.props.forecastData).length == 0){
  		// console.log('noooo data', this)
  		return(
  			<div>Loading</div>
  		)
  	}
  	else{
      var fdraArray = Object.keys(this.props.forecastData)
  		// console.log('dataaa Home',fdraArray.length, this)
      var obDate = [] 
      var date
      fdraArray.map( currFdra => 
        {
          obDate.push(this.props.forecastData[currFdra].forecastDate) 
          if(this.props.forecastData[currFdra].forecastDate){
            date = this.props.forecastData[currFdra].forecastDate
          }
          return date
        }
      )
      
      // console.log('obDadte', date)  
			return (
				<div>
					<div className="row mx-2 h-100" >
						<div className="mt-4 col-12 col-md-4 mb-2 h"> 
			      	<div className="card h-100"> 
		          	<ERCMap data = {this.props.forecastData}/>
                <footer className="text-center"><b>Fire Danger Forecast for {date}</b></footer>
                <footer className="text-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm" style={{backgroundColor: "#bee1b8"}}> 
                        Low
                      </div>
                      <div className="col-sm" style={{backgroundColor: "#f7f77b"}}>
                        Moderate
                      </div>
                      <div className="col-sm" style={{backgroundColor: "#f8bf8a"}}>
                        High
                      </div>
                      <div className="col-sm" style={{backgroundColor: "#db707c"}}>
                        Extreme
                      </div>
                    </div>
                  </div>
                </footer>
		    		 	</div>
		   			</div> 
		   			<div className="col-12 col-md-8 mt-4 mb-2">
		          <Info data = {this.props.forecastData}/>
		   			</div>
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