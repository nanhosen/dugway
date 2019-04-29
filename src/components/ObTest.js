import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import  Info  from './Info'
import  ERCMap  from './ERCMap'
import  Grid  from './Grid'
import Chart from'./ChartTest'

import { FaBeer } from 'react-icons/fa';
import { WiFahrenheit, WiDirectionUp, WiDirectionUpRight, WiDirectionRight, WiDirectionDownRight, WiDirectionDown, WiDirectionDownLeft, WiDirectionLeft, WiDaySunny } from 'react-icons/wi';

// import './cirle.css'



export class ObTest extends Component {
	constructor(props) {
    super(props)
  }
  componentDidMount(){
  	// this.makeReq()
    // dispatch(makeReq())
  	// console.log('ObTest mount this', this)
  }

  componentDidUpdate(){
  	// console.log('updated this', this)
  }
  render = () => {
  	 //<div className="card" styleName="width: 18rem;">
					
					
			//		<MakeOb data = {firstData} style = {style} />
					 
			//	</div>
  	if(!this.props.obsData.obsData){
  		// console.log('noooo data', this)
  		return(
  			<div>Loading</div>
  		)
  	}
  	else{
  		// console.log('dataaa ObTest', this.props.obsData)
  		this.props.obsData.obsData.map((curr,i)=>{
  			// console.log('curr.name', curr.name)
  			var name = curr.name
  			var temp = Math.round((curr.obs.air_temp_value_1.value * 1.8) + 32)
  			var windDir = curr.obs.wind_cardinal_direction_value_1d.value
  			var windSpeed = curr.obs.wind_direction_value_1.value
  			// console.log('nametemp', name, temp, windDir, windSpeed)
  		})
  		var temp = Math.round((this.props.obsData.obsData[0].obs.air_temp_value_1.value * 1.8) + 32)
  		var tD = Math.round((this.props.obsData.obsData[0].obs.dew_point_temperature_value_1d.value * 1.8) + 32)
			var RH = Math.round(100*(Math.exp((17.625*tD)/(243.04+tD))/Math.exp((17.625*temp)/(243.04+temp))) )
  		var windDir = this.props.obsData.obsData[0].obs.wind_cardinal_direction_value_1d.value
  		var timeStamp = this.props.obsData.obsData[0].obs.air_temp_value_1.date_time
  		var date = new Date(timeStamp)
  		var formattedDate = new Intl.DateTimeFormat('en-US',{ 
          year: '2-digit', 
          month: 'numeric', 
          day: 'numeric' 
        }).format(date)
  		var windSpeed = Math.round(this.props.obsData.obsData[0].obs.wind_direction_value_1.value)
  		var style = {
	      color: 'orange',
	      fontSize: 50
	    };
  		// var arrow = getWindArrow(windDir)
  		// console.log(temp,'temp', windDir, 'dewpt', tD, 'th', RH, formattedDate, date, timeStamp)
  		var firstData = this.props.obsData
			return (
				<div className="card">
					<h5 className="card-title">Current Conditions</h5>
					<div className="card-body">
						<div className="d-flex flex-nowrap flex-shrink">
				      <MakeOb data = {firstData} style = {style} />
					  </div> 
					</div>
				</div>
			)
  	}
  	
	}	
}
				

function MakeOb(props){
	var inData = props.data.obsData
	var curOb = inData[0]
	// console.log('props', props, inData)
	var style = props.style
	// console.log('dewPt', curOb.dew_point_temperature_value_1d)
	var temp = Math.round((curOb.obs.air_temp_value_1.value * 1.8) + 32)
	var tD = Math.round((curOb.obs.dew_point_temperature_value_1d.value * 1.8) + 32)
	var RH = Math.round(100*(Math.exp((17.625*tD)/(243.04+tD))/Math.exp((17.625*temp)/(243.04+temp))) )
	var windDir = curOb.obs.wind_cardinal_direction_value_1d.value
	var windSpeed = Math.round(curOb.obs.wind_direction_value_1.value)
	var stnName = curOb.name
	return (
		<React.Fragment>
			<div className="p-2">
		  	<div>
		  		Temp
		  	</div>
		  	<div>
		  		<span className="text-nowrap align-middle">{temp}<WiFahrenheit size={30}/></span>
		  	</div>
		  </div>
		  <div className="p-2">
		  	<div>
		  		Sky
		  	</div>
		  	<div>
		  		<WiDaySunny size={40} style= { style }/>
		  	</div>
		  </div>
		  <div className="p-2">
		  	<div>Wind</div>
		  	<div>
		  		{windDir} <GetWindArrow data={[windDir, windSpeed]} />
		  	</div>
		  	<div>{ windSpeed } mph </div>
		  </div>
		</React.Fragment>	
	)
}


// export default connect(reduxState => reduxState, { makeReq })(ObTest)
function GetWindArrow(windDir){
	// console.log(windDir)
	var direction = windDir.data[0]
	var windSpeed = windDir.data[1]
	var speedSize = windSpeed * 5
	var dirObj = {
		N: <WiDirectionUp size={speedSize}/>,
		NE: <WiDirectionUpRight />,
		E: <WiDirectionRight />,
		SE: <WiDirectionDownRight />,
		S: <WiDirectionDown />,
		SW: <WiDirectionDownLeft />,
		W: <WiDirectionLeft />,
		NW: <WiDirectionUp />
	}
	return dirObj[direction]
}

const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this ObTest state', state)
  return state
}
export default connect(mapStateToProps)(ObTest)
// export default connect(mapStateToProps, { makeReq })( Home )