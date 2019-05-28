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
    this.forecastDayRef = React.createRef()
    this.forecastDayRef1 = React.createRef()

  }

  componentDidMount(){
    var divWidth = this.d3Ref.current ? this.d3Ref.current.offsetWidth : 700
    var forecastDayRef = this.forecastDayRef.current ? this.forecastDayRef.current.offsetWidth : 'no way'
    var daySpace = this.forecastDayRef1.current ? this.forecastDayRef1.current.offsetLeft - this.forecastDayRef.current.offsetLeft : 10

    // console.log('mountThis', divWidth, this,this.forecastDayRef.current.offsetLeft, this.forecastDayRef1.current.offsetLeft )
    var chartProps = {
      width: divWidth,
      daySpace
    }
    // console.log(chartProps)
    drawChart(chartProps)
  }
  componentDidUpdate(){
    // console.log('updateThis', this)
  }
 
  render() {
    console.log(this,'forecastThis', this.props.nwsForecast, Object.keys(this.props.nwsForecast))
    var googleWxIcons = ["cloudy", "partly_cloudy", "rain", "rain_s_cloudy", "sunny", "thunderstorms"]
    var iconUrl = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[0]}.png`
    var iconUrlBlank = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/`
    var iconUrl1 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[1]}.png`
    var iconUrl2 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[2]}.png`
    var iconUrl3 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[3]}.png`
    var iconUrl4 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[4]}.png`
    var iconUrl5 = `https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/${googleWxIcons[5]}.png`
    // console.log(iconUrl)

    if(Object.keys(this.props.nwsForecast).length>0){
      var forecast = this.props.nwsForecast
      var firstName = forecast[0].name
      forecast.map(curr => {

      })
      console.log('forecastinf', forecast)
      return (
        <div className="container" style={{backgroundColor: '#f8f9fa'}}>
          <div className="row justify-content-start">
            <div className="col-4">
              <span style={{fontSize: '2em', fontFamily: 'Roboto, Arial'}}>Dugway-N Forecast</span>
            </div>
            <div className="col-4">
               
            </div>
          </div>
          <div className="row justify-content-left" >
            <div className="col-4">
              <span style={{fontSize: '1em', color: '#666', fontFamily: 'Roboto, Arial'}}>Monday May 20th, 2019</span> 
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
            <div className="col-6 align-middle">
              <div className = "row">
                <div className="col-md-auto" style={{paddingRight: "0px"}}>
                  <img src= {iconUrl}></img>
                </div>
                <div className="col-md-auto align-self-center" style={{paddingLeft: "0px"}}>
                  <span style={{fontSize: '1.5em'}}>58&deg;</span>
                </div>  
              </div> 
            </div>
            <div className="col-6" >
              Precipitation: 100%<br />Humidity: 48%<br />Wind: 5 mph SW<br />
            </div>
          </div>
          <div className="row justify-content-between" style={{marginTop: '10px', marginBottom:'0px'}} ref = {this.d3Ref}>
            <div className="col-12" style ={{color: '#343940', fontSize: '1.1em', fontFamily: 'Roboto, Arial', backgroundColor: '#d2d2d3'}}>
              Max Wind Gust By Day
            </div>
          </div> 
          <div className="row justify-content-between" style={{marginTop: '0px', marginBottom:'15px', backgroundColor: '#d2d2d3'}} ref = {this.d3Ref}>
            <div className="col-12">
              <div className="viz" id="viz">
              <BarChartPlotly props={this.d3Ref} />
              </div>
            </div>
          </div>  
          <div className="row justify-content-between" style={{marginTop: '10px', marginBottom:'15px'}}>
            <div className="col-2" ref = { this.forecastDayRef }>
              <div className = "row">
                <div className="col-12 text-center">
                  {firstName}
                </div>  
              </div>
              <div className = "row">
                <div className="col-12 text-center">
                  <img src= {iconUrl1}></img>
                </div>  
              </div>
              <div className = "row" style={{marginTop: '0px'}}>
                <div className="col-12 text-center">
                  68&deg; | 45&deg;
                </div>  
              </div>
            </div>
            <div className="col-2" ref = { this.forecastDayRef1 }>
              <div className = "row">
                <div className="col-12 text-center">
                  {forecast[1].name}
                </div>  
              </div>
              <div className = "row">
                <div className="col-12 text-center">
                  <img src= {iconUrlBlank + forecast[1].iconType + '.png'}></img>
                </div>  
              </div>
              <div className = "row" style={{marginTop: '0px'}}>
                <div className="col-12 text-center">
                  {forecast[1].maxT}&deg; | {forecast[1].minT}&deg;
                </div>  
              </div>   
            </div>
            <div className="col-2">
              <div className = "row">
                <div className="col-12 text-center">
                  Wednesday
                </div>  
              </div>
              <div className = "row">
                <div className="col-12 text-center">
                  <img src= {iconUrl3}></img>
                </div>  
              </div>
              <div className = "row" style={{marginTop: '0px'}}>
                <div className="col-12 text-center">
                  68&deg; | 45&deg;
                </div>  
              </div>   
            </div>
            <div className="col-2">
              <div className = "row">
                <div className="col-12 text-center">
                  Thursday
                </div>  
              </div>
              <div className = "row">
                <div className="col-12 text-center">
                  <img src= {iconUrl4}></img>
                </div>  
              </div>
              <div className = "row" style={{marginTop: '0px'}}>
                <div className="col-12 text-center">
                  68&deg; | 45&deg;
                </div>  
              </div>   
            </div>
            <div className="col-2">
              <div className = "row">
                <div className="col-12 text-center">
                  Friday
                </div>  
              </div>
              <div className = "row">
                <div className="col-12 text-center">
                  <img src= {iconUrl5}></img>
                </div>  
              </div>
              <div className = "row" style={{marginTop: '0px'}}>
                <div className="col-12 text-center">
                  68&deg; | 45&deg;
                </div>  
              </div>   
            </div>
            <div className="col-2">
              <div className = "row">
                <div className="col-12 text-center">
                  Saturday
                </div>  
              </div>
              <div className = "row">
                <div className="col-12 text-center">
                  <img src= {iconUrl}></img>
                </div>  
              </div>
              <div className = "row" style={{marginTop: '0px'}}>
                <div className="col-12 text-center">
                  68&deg; | 45&deg;
                </div>  
              </div>   
            </div>
          </div>
        </div>
           
      )
    }
    else{
      return(<div>Forecast Loading</div>)
    }
    
    

  }
}
const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this WeatherBar state', state)
  return state
}
export default connect(mapStateToProps)(Forecast1)