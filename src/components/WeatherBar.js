import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import  Info  from './Info'
import  ERCMap  from './ERCMap'
import  Grid  from './Grid'
import Chart from'./ChartTest'

import { WiFahrenheit, WiDirectionUp, WiDirectionUpRight, WiDirectionRight, WiDirectionDownRight, WiDirectionDown, WiDirectionDownLeft, WiDirectionLeft, WiDirectionUpLeft, WiDaySunny } from 'react-icons/wi';


// import '../style/css/weather-icons-wind.css'
// import '../style/css/weather-icons-wind.min.css'
// import '../style/css/weather-icons.css'
// import '../style/css/weather-icons.min.css'

// import '../style/font/weathericons-regular-webfont.eot'
// import '../style/font/weathericons-regular-webfont.svg'
// import '../style/font/weathericons-regular-webfont.ttf'
// import '../style/font/weathericons-regular-webfont.woff'
// import '../style/font/weathericons-regular-webfont.woff2'


export class WeatherBar extends Component {
	constructor(props) {
    super(props)
  }
  componentDidMount(){
  	// this.makeReq()
    // dispatch(makeReq())
  	// console.log('WeatherBar mount this', this)
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
  		// console.log('dataaa WeatherBar', this.props)
  		// var temp = Math.round((this.props.obsData.obsData[0].obs.air_temp_value_1.value * 1.8) + 32)
  		// var windDir = this.props.obsData.obsData[0].obs.wind_cardinal_direction_value_1d.value
  		// var windSpeed = this.props.obsData.obsData[0].obs.wind_direction_value_1.value
  		// var arrow = GetWindArrow(windDir)
  		// console.log(temp,'temp', windDir)
			return (
				<nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#a6aab5'}}>
          <MakeBarButton data = {this.props}/>
				</nav>
			)
  	}
  	
	}	
}

// export default connect(reduxState => reduxState, { makeReq })(WeatherBar)
function GetWindArrow(data){
  // console.log(data.data)
  // var size = ()
	var dirObj = {
		N: <WiDirectionUp />,
    NNE: <WiDirectionUp />,
    NE: <WiDirectionUpRight />,
		ENE: <WiDirectionUpRight />,
		E: <WiDirectionRight />,
    ESE: <WiDirectionRight />,
    SE: <WiDirectionDownRight />,
		SSE: <WiDirectionDownRight />,
		S: <WiDirectionDown />,
    SSW: <WiDirectionDown />,
    SW: <WiDirectionDownLeft />,
		WSW: <WiDirectionDownLeft />,
		W: <WiDirectionLeft />,
    WNW: <WiDirectionLeft />,
    NW: <WiDirectionUpLeft />,
    NNW: <WiDirectionUpLeft />
	}
  // return dirObj["N"]
	return dirObj[data.data]
}

function MakeBarButton(data){
  // console.log('data', data)
  return data.data.obsData.obsData.map((curr, i) => {
    // console.log('curr', curr)
    // var temp =  Math.round((curr.obs.air_temp_value_1.value * 1.8) + 32)
    var temp = curr.obs.air_temp_value_1 ? Math.round((curr.obs.air_temp_value_1.value * 1.8) + 32) : ''
    var curStn = curr.wimsId
    var windDir = curr.obs.wind_cardinal_direction_value_1d ? curr.obs.wind_cardinal_direction_value_1d.value : ''
    var windSpeed = (curr.obs.wind_speed_value_1) ? `${Math.round(curr.obs.wind_speed_value_1.value)} mph` : null

    // `string text ${expression} string text`
      // return <Link className="nav-link" to="/" + curr.wimsID>
      // <Link to={`/lists/${props.list._id}`}>{props.list.name}</Link>
      return <Link key={i} className="nav-link" to={`/${curStn}`}>
        <button type="button" className="btn btn-light">
          {curr.name} <WiDaySunny size={30} />
          { temp } &deg; { windSpeed } <GetWindArrow data = { windDir } />
        </button>
      </Link>

  })
  // return data.stnArray.map((curr,i) => {
  //   return <div key={i} className="col"> 
  //             <Chart stn={curr} />
  //           </div>  

  // })
}

const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this WeatherBar state', state)
  return state
}
export default connect(mapStateToProps)(WeatherBar)
// export default connect(mapStateToProps, { makeReq })( Home )