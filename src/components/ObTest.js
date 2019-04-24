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
  	if(!this.props.obsData.obsData){
  		// console.log('noooo data', this)
  		return(
  			<div>Loading</div>
  		)
  	}
  	else{
  		console.log('dataaa ObTest', this.props.obsData)
  		this.props.obsData.obsData.map((curr,i)=>{
  			console.log('curr.name', curr.name)
  			var name = curr.name
  			var temp = Math.round((curr.obs.air_temp_value_1.value * 1.8) + 32)
  			var windDir = curr.obs.wind_cardinal_direction_value_1d.value
  			var windSpeed = curr.obs.wind_direction_value_1.value
  			console.log('nametemp', name, temp, windDir, windSpeed)
  		})
  		var temp = Math.round((this.props.obsData.obsData[0].obs.air_temp_value_1.value * 1.8) + 32)
  		var windDir = this.props.obsData.obsData[0].obs.wind_cardinal_direction_value_1d.value
  		var windSpeed = this.props.obsData.obsData[0].obs.wind_direction_value_1.value
  		var style = {
	      color: 'orange',
	      fontSize: 100
	    };
  		// var arrow = getWindArrow(windDir)
  		console.log(temp,'temp', windDir)
  		var firstData = this.props.obsData
			return (
				<div className="card" styleName="width: 18rem;">
					
					
					<MakeOb data = {firstData} style = {style} />
					 
				</div>
			)
  	}
  	
	}	
}

function MakeOb(props){
	var inData = props.data.obsData
	var curOb = inData[0]
	console.log('props', props, inData)
	var temp = Math.round((curOb.obs.air_temp_value_1.value * 1.8) + 32)
	var windDir = curOb.obs.wind_cardinal_direction_value_1d.value
	var windSpeed = Math.round(curOb.obs.wind_direction_value_1.value)
	var stnName = curOb.name
	return (
				<div className="card" styleName="width: 18rem;">
					<h5 class="card-title">{stnName}</h5>
					<div className="container">
					  <div className="row">
					    <div className="col align-middle">
					       <div style={props.style}><span className="text-nowrap">{temp}<WiFahrenheit size={70}/></span></div>
					    </div>
					    <div className="col align-self-center">
				    		<WiDaySunny size={70}/>
				    	</div>
				    	<div className="col align-self-center">	
					    	<span className="text-nowrap"><GetWindArrow data={windDir} />{windSpeed} mph </span>
					    </div>
					  </div>
					</div>
				</div>
			)
}


// export default connect(reduxState => reduxState, { makeReq })(ObTest)
function GetWindArrow(windDir){
	console.log(windDir)
	var dirObj = {
		N: <WiDirectionUp size={70}/>,
		NE: <WiDirectionUpRight />,
		E: <WiDirectionRight />,
		SE: <WiDirectionDownRight />,
		S: <WiDirectionDown />,
		SW: <WiDirectionDownLeft />,
		W: <WiDirectionLeft />,
		NW: <WiDirectionUp />
	}
	return dirObj[windDir.data]
}

const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this ObTest state', state)
  return state
}
export default connect(mapStateToProps)(ObTest)
// export default connect(mapStateToProps, { makeReq })( Home )