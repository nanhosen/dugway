import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid  from './Grid'
import Chart from'./ChartTest'
import ObsChart from'./ObsChart'
import ObTest from'./ObTest'
import HighChart from'./HighChartTest'
import Slider from './SliderBar'
import HeatMapChart from './HeatMapChart'

export class StationPage extends Component {
	constructor(props) {
    super(props)
    this.chartRef = React.createRef()
    this.heatMapRef = React.createRef()
    // this.state = {
    //   chartWidth: null
    // }
  }
  componentDidMount(){
  	// this.makeReq()
    // dispatch(makeReq())
   //  this.getWidth()
  	// console.log('home reff ref', this.chartRef)
   //  if(this.chartRef.current){
   //    console.log('notnull', this.chartRef)
   //  }
  }

  // getWidth(){
  //   console.log(this.chartRef.current)
  // }

  componentDidUpdate(){
  	// console.log('updated this', this)
    // console.log('home update ref', Object.keys(this.chartRef))
    // if(this.chartRef.current){
    //   console.log('notnullup', this.chartRef.current.offsetWidth, this.chartRef)
    //   console.log('hasit','prev', prevProps, this.props)
    //   // this.setState({chartWidth: this.chartRef.current.offsetWidth})
    // }
    // else{
    //   console.log('nohasit','prev', prevProps, this.props)
    // }

  }
  render = () => {
  	if(!this.props.wimsData.fdraInfo){
  		// console.log('noooo data', this)
  		return(
  			<div>Loading</div>
  		)
  	}
  	else{
      var stnSelected = this.props.match.path.slice(1)
  		// console.log('dataaa data', this)
      // var stnArray = Object.keys(this.props.archiveData[Object.keys(this.props.archiveData)[0]])
      // console.log('stnArray', stnArray)
      var divWidth = this.chartRef.current ? this.chartRef.current.offsetWidth : null
      var divWidthHeat = this.heatMapRef.current ? this.heatMapRef.current.offsetWidth : null
      console.log('divWidth', divWidth)
			return (
				<div className="container">
          <div className="row">
            <div className="col-md-auto">
              <Slider />
            </div>
          </div>  
          <div className="row">
            <div className="col-md-auto">
              <ObTest stn = { stnSelected }/>
            </div>
          </div>
          <div className="row" ref = {this.chartRef}>
            <div className="col-md-auto" >
              <Chart stn={ stnSelected } divWidth = {divWidth} />
            </div>
          </div>

          <div className="row" ref = { this.heatMapRef }>
            <div className="col-md-auto">
              <HeatMapChart stn={ stnSelected } divWidth = { divWidthHeat }/>
            </div>
            <div className="col-md-auto">
             <HighChart />
            </div>
          </div>
          <div className="row">
            <div className="col-md-auto">
              <ObsChart />
            </div>
          </div>
        </div>
			)
  	}
  	
	}	
}
// function MakeChart(data){
//   // console.log('stnArray', data.stnArray)
//   return data.stnArray.map((curr,i) => {
//     return <div key={i} className="col"> 
//               <Chart stn={curr} />
//             </div>  

//   })
// }
// export default connect(reduxState => reduxState, { makeReq })(Home)

const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(StationPage)
// export default connect(mapStateToProps, { makeReq })( Home )