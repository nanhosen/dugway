import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WiFahrenheit, WiDirectionUp, WiDirectionUpRight, WiDirectionRight, WiDirectionDownRight, WiDirectionDown, WiDirectionDownLeft, WiDirectionLeft, WiDirectionUpLeft, WiDaySunny, WiDayCloudy } from 'react-icons/wi';
// import drawChart from './things/d3/lineChart1'
import drawChart from './things/d3/barChart'
import BarChartPlotly from './BarChartPlotly'

class Forecast1 extends Component {
  constructor(props) {
    super(props)
    this.d3Ref = React.createRef()
    this.plotRef = React.createRef()
    this.forecastDayRef = React.createRef()
    this.forecastDayRef1 = React.createRef()
    this.state = { }
  }

  componentDidMount(){
    var divWidth = this.d3Ref.current ? this.d3Ref.current.offsetWidth : undefined
    var forecastDayRef = this.forecastDayRef.current ? this.forecastDayRef.current.offsetWidth : null
    var daySpace = this.forecastDayRef1.current ? this.forecastDayRef1.current.offsetLeft - this.forecastDayRef.current.offsetLeft : 10

    // console.log('mountThis', divWidth, this.d3Ref )
    var chartProps = {
      width: divWidth,
      daySpace
    }
    this.setState({size:divWidth})
    // console.log(chartProps)
    // drawChart(chartProps)
  }
  componentDidUpdate(prevProps, prevState){
    // console.log('updateThis', this.d3Ref, 'prevProps', prevProps, 'prevState', prevState.size)
    if(this.d3Ref.current && prevState.size == undefined){
      // console.log(this.d3Ref.current.offsetWidth)
      this.setState({size: this.d3Ref.current.offsetWidth})
    }
  }
 
  render() {
    // console.log(this,'forecastThis', this.props.nwsForecast, Object.keys(this.props.nwsForecast))
    var googleWxIcons = ["cloudy", "partly_cloudy", "rain", "rain_s_cloudy", "sunny", "thunderstorms"]
    var iconUrl = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[0]}.png`
    var iconUrlBlank = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/`
    var iconUrl1 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[1]}.png`
    var iconUrl2 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[2]}.png`
    var iconUrl3 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[3]}.png`
    var iconUrl4 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[4]}.png`
    var iconUrl5 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[5]}.png`
    // console.log(iconUrl)

    if(Object.keys(this.props.nwsForecast).length>0 && this.props.stn && this.props.obsData.obsData){
      var forecast = this.props.nwsForecast
      var firstName = forecast[0].name
      var obsObject

      // console.log(this.props.obsData.obsData)
      this.props.obsData.obsData.map(curr => {
        // console.log(curr)
        if(curr.wimsId == this.props.stn){
            var curTemp = Math.round((curr.obs.air_temp_value_1.value * (9/5)) + 32)
            var curWindSpeed = Math.round(curr.obs.peak_wind_speed_value_1.value)
            var curWindDirect = getWindDir(Math.round(curr.obs.peak_wind_direction_value_1.value))
            var curRh = Math.round(100*(Math.exp((17.625*curr.obs.dew_point_temperature_value_1d.value)/(243.04+curr.obs.dew_point_temperature_value_1d.value))/Math.exp((17.625*curr.obs.air_temp_value_1.value)/(243.04+curr.obs.air_temp_value_1.value))))
            var name = curr.name
            var date = new Date()
            var time = `${date.getHours()}:${date.getMinutes()}` 
            // var day = date.getDate()
            // const shortYear = date.getFullYear().toString()
            const dateText = date.toLocaleString("en-US", {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})

            // console.log(curTemp, curWindSpeed, curWindDirect, curRh)
            obsObject = {dateText, curTemp, curWindSpeed, curWindDirect, curRh, name, time}
        }
      })
      // console.log('obsObject', obsObject, this.d3Ref, this)
      return (
        <div className="container" style={{backgroundColor: 'white'}}>
          <div className="row justify-content-start">
            <div className="col-4">
              <span style={{fontSize: '1.5em', fontFamily: 'Roboto, Arial'}}>{ obsObject.name } Forecast</span>
            </div>
            <div className="col-4">
               
            </div>
          </div>
          <div className="row justify-content-left" >
            <div className="col-4">
              <span style={{fontSize: '1em', color: '#666', fontFamily: 'Roboto, Arial'}}>{ obsObject.dateText }  {obsObject.time}</span> 
            </div>
            <div className="col-4">
              
            </div>
          </div>
          <div className="row justify-content-left">
            <div className="col-4">
              <span style ={{fontSize: '1em', color: '#666', fontFamily: 'Roboto, Arial'}}>Overcast</span>
            </div>
            <div className="col-4">
              
            </div>
          </div>
          <div className="row justify-content-left">
            <div className="col-2 align-middle">
              <div className = "row">
                <div className="col-md-auto" style={{paddingRight: "0px"}}>
                  <img src= {iconUrl}></img>
                </div>
                <div className="col-md-auto align-self-center" style={{paddingLeft: "0px"}}>
                  <span style={{fontSize: '1.5em'}}>{ obsObject.curTemp }&deg;</span>
                </div>  
              </div> 
            </div>
            <div className="col-3">
              Humidity: { obsObject.curRh }%<br />Wind: { obsObject.curWindSpeed } mph { obsObject.curWindDirect }<br />
            </div>
          </div>
          <div className="row justify-content-between" style={{marginTop: '10px', marginBottom:'0px'}} ref = {this.d3Ref}>
            <div className="col-12" style ={{color: '#343940', fontSize: '1.1em', fontFamily: 'Roboto, Arial', backgroundColor: '#f8f9fa'}}>
              Max Wind Gust By Day
            </div>
          </div> 
          <div className="row justify-content-between" style={{marginTop: '0px', marginBottom:'15px', backgroundColor: '#f8f9fa'}} ref = {this.d3Ref}>
            <div className="col-12">
              <BarChartPlotly props={this.state.size} />
            </div>
          </div>  
          <div className="row justify-content-between" style={{marginTop: '10px', marginBottom:'15px'}}>
            <MakeForecastDay data = {this.props.nwsForecast} />
            
          </div>
        </div>
           
      )
    }
    else{
      return(<div>Forecast Loading</div>)
    }
    
    

  }
}

function MakeForecastDay(data){
  // console.log(data.data)
  var rowData = []
  data.data.map((curr,i) => {
    if(i<6){ 
      rowData.push(
        <div className="col-2" key={i}>
          <div className = "row">
            <div className="col-12 text-center">
              {curr.name}
            </div>  
          </div>
          <div className = "row">
            <div className="col-12 text-center">
              <img src= {`https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${curr.iconType}.png`}></img>
            </div>  
          </div>
          <div className = "row" style={{marginTop: '0px'}}>
            <div className="col-12 text-center">
              {curr.maxT}&deg; | {curr.minT}&deg;
            </div>  
          </div>   
        </div>
      )
    }
  })
  return rowData
}

function getWindDir(dir){
  if(dir>=0 && dir<35 || dir>=325 && dir<=360){
    return "N"
  }
  else if (dir>=35 && dir<80){
    return "NE"
  }
  else if (dir>=80 && dir<125){
    return "E"
  }
  else if (dir>=125 && dir<170){
    return "SE"
  }
  else if (dir>=170 && dir<190){
    return "S"
  }
  else if (dir>=190 && dir<260){
    return "SW"
  }
  else if (dir>=260 && dir<305){
    return "W"
  }
  else if (dir>=305 && dir<325){
    return "NW"
  }
}
const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this WeatherBar state', state)
  return state
}
export default connect(mapStateToProps)(Forecast1)