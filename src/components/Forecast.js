import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import  Info  from './Info'
import  ERCMap  from './ERCMap'
import  Grid  from './Grid'
import Chart from'./ChartTest'

import { FaBeer } from 'react-icons/fa';
import { WiFahrenheit, WiDirectionUp, WiDirectionUpRight, WiDirectionRight, WiDirectionDownRight, WiDirectionDown, WiDirectionDownLeft, WiDirectionLeft, WiDirectionUpLeft, WiDaySunny } from 'react-icons/wi';

// import './cirle.css'



export class Forecast extends Component {
	constructor(props) {
    super(props)
  }
  componentDidMount(){
  	// this.makeReq()
    // dispatch(makeReq())
  	// console.log('Forecast mount this', this)
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
  		console.log('this Forecast', this)
  		var station = this.props.stn
  		var obObject = {}
  		this.props.obsData.obsData.map((curr,i)=>{
  			// console.log('curr.name', curr.name)
  			if(curr.wimsId == station){
  				console.log('matchy!')
	  			var name = curr.name
	  			var temp = Math.round((curr.obs.air_temp_value_1.value * 1.8) + 32)
	  			var windDir = curr.obs.wind_cardinal_direction_value_1d.value
	  			var windSpeed = (curr.obs.wind_speed_value_1) ? Math.round(curr.obs.wind_speed_value_1.value) : null
	  			var rh = Math.round(curr.obs.relative_humidity_value_1.value)
  				var tD = Math.round((curr.obs.dew_point_temperature_value_1d.value * 1.8) + 32)
  				var timeStamp = curr.obs.air_temp_value_1.date_time
		  		var date = new Date(timeStamp)
		  		var formattedDate = new Intl.DateTimeFormat('en-US',{ 
		          year: '2-digit', 
		          month: 'numeric', 
		          day: 'numeric' 
		        }).format(date)
  				obObject = { name, temp, windDir, windSpeed, rh, tD, formattedDate}
		  	}
		  			// console.log('nametemp', name, temp, windDir, windSpeed)
		  })
			// var RH = Math.round(100*(Math.exp((17.625*tD)/(243.04+tD))/Math.exp((17.625*temp)/(243.04+temp))) )
  		// var windDir = this.props.obsData.obsData[0].obs.wind_cardinal_direction_value_1d.value
  		// var timeStamp = this.props.obsData.obsData[0].obs.air_temp_value_1.date_time
  		// var date = new Date(timeStamp)
  		// var formattedDate = new Intl.DateTimeFormat('en-US',{ 
    //       year: '2-digit', 
    //       month: 'numeric', 
    //       day: 'numeric' 
    //     }).format(date)
  		// var windSpeed = Math.round(this.props.obsData.obsData[0].obs.wind_direction_value_1.value)
  		var style = {
	      color: 'orange',
	      fontSize: 50
	    };
  		// var arrow = getWindArrow(windDir)
  		// console.log(temp,'temp', windDir, 'dewpt', tD, 'th', RH, formattedDate, date, timeStamp)
  		// var firstData = this.props.obsData
			return (
				<div className="card">
					<h5 className="card-title">Tomorrow's Forecast</h5>
					<div className="card-body">
						<div className="d-flex flex-nowrap flex-shrink">
				      <MakeOb data = {obObject} style = {style} />
					  </div> 
					</div>
				</div>
			)
  	}
  	
	}	
}
				

function MakeOb(props){
	console.log('props', props)
	// var stnData = props.data
	// var curOb = inData[0]
	var style = props.style
	// console.log('dewPt', curOb.dew_point_temperature_value_1d)
	// var temp = Math.round((curOb.obs.air_temp_value_1.value * 1.8) + 32)
	// var tD = Math.round((curOb.obs.dew_point_temperature_value_1d.value * 1.8) + 32)
	// var RH = Math.round(100*(Math.exp((17.625*tD)/(243.04+tD))/Math.exp((17.625*temp)/(243.04+temp))) )
	// var windDir = curOb.obs.wind_cardinal_direction_value_1d.value
  // var windSpeed = (curOb.obs.wind_speed_value_1) ? `${Math.round(curOb.obs.wind_speed_value_1.value)} mph` : null
	// console.log('speed', windSpeed)
	var stnName = props.data.name
	var displaySpeed = (props.data.windSpeed) ? `${ props.data.windSpeed } mph` : ''
	return (
		<React.Fragment>
			<div className="p-2">
		  	<div>
		  		Temp
		  	</div>
		  	<div>
		  		<span className="text-nowrap align-middle">{props.data.temp}<WiFahrenheit size={30}/></span>
		  	</div>
		  </div>
		  <div className="p-2">
		  	<div>
		  		Sky
		  	</div>
		  	<div>
		  		<WiDaySunny size={40} style= { props.style }/>
		  	</div>
		  </div>
		  <div className="p-2">
		  	<div>Wind</div>
		  	<div>
		  		{props.data.windDir} <GetWindArrow data={[props.data.windDir, props.data.windSpeed]} />
		  	</div>
		  	<div>{ displaySpeed }</div>
		  </div>
		</React.Fragment>	
	)
}


// export default connect(reduxState => reduxState, { makeReq })(Forecast)
function GetWindArrow(data){
  console.log(data.data)
  var speed = (data.data[1]) ? data.data[1] : 1
  // var size = speed * 10
  var size = 30
  console.log('size', size)
	var dirObj = {
		N: <WiDirectionUp size ={size} />,
    NNE: <WiDirectionUp size ={size} />,
    NE: <WiDirectionUpRight size ={size} />,
		ENE: <WiDirectionUpRight size ={size} />,
		E: <WiDirectionRight size ={size} />,
    ESE: <WiDirectionRight size ={size} />,
    SE: <WiDirectionDownRight size ={size} />,
		SSE: <WiDirectionDownRight size ={size} />,
		S: <WiDirectionDown size ={size} />,
    SSW: <WiDirectionDown size ={size} />,
    SW: <WiDirectionDownLeft size ={size} />,
		WSW: <WiDirectionDownLeft size ={size} />,
		W: <WiDirectionLeft size ={size} />,
    WNW: <WiDirectionLeft size ={size} />,
    NW: <WiDirectionUpLeft size ={size} />,
    NNW: <WiDirectionUpLeft size ={size} />
	}
  // return dirObj["N"]
	return dirObj[data.data[0]]
}


const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this Forecast state', state)
  return state
}
export default connect(mapStateToProps)(Forecast)
// export default connect(mapStateToProps, { makeReq })( Home )