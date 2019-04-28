import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid  from './Grid'
import Chart from'./ChartTest'
import HighChart from'./HighChartTest'
import ObTest from'./ObTest'

export class Data extends Component {
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
  	if(!this.props.wimsData.fdraInfo){
  		// console.log('noooo data', this)
  		return(
  			<div>Loading</div>
  		)
  	}
  	else{
  		console.log('dataaa data', this)
      var stnArray = Object.keys(this.props.archiveData[Object.keys(this.props.archiveData)[0]])
      console.log('stnArray', stnArray)
			return (
				<div>
          <div className="row mx-2 h-100" >
            <Grid />
          </div> 		
          <div className="row mx-2 h-100" >
            <MakeChart stnArray={stnArray} />
          </div>
          <div className="row mx-2 h-100" >
            <HighChart />
          </div>
          <div>
            <ObTest />
          </div>  
				</div>
			)
  	}
  	
	}	
}
function MakeChart(data){
  console.log('stnArray', data.stnArray)
  return data.stnArray.map((curr,i) => {
    return <div key={i} className="col"> 
              <Chart stn={curr} />
            </div>  

  })
}
// export default connect(reduxState => reduxState, { makeReq })(Home)

const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(Data)
// export default connect(mapStateToProps, { makeReq })( Home )