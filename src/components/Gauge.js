import React, { Component }  from 'react';
import { connect } from 'react-redux'
// import GaugeChart from 'react-gauge-chart' 
import ReactSpeedometer from 'react-d3-speedometer'


class Gauge extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if(Object.keys(this.props.forecastData).length>0 && this.props.stn){
  	  console.log('gauge this', this)
      Object.keys(this.props.forecastData).map(currFdra => {

      })

    }
    var width = this.props.divWidth ? this.props.divWidth : 700

  	return <div style={{
              width: width,
              height: "200px",
              background: "#f8f9fa"
            }}>
              <ReactSpeedometer
                minValue={0}
                maxValue={100}
                value={55}
                segments={50}
                maxSegmentLabels={0}
                needleHeightRatio={0.6}
                needleColor="#343b40"
                currentValueText="Current SFWPI: 1"
                segmentColors={[
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd",
                  "#c7e3bd", //55 to 60
                  "#f7f77a",
                  "#f7f77a",
                  "#f7f77a",
                  "#f7f77a", //75 to 80
                  "#f8bf8a",
                  "#f8bf8a", //85 to 90
                  "#db6f7c", //90 to 95
                  "#ce6fdb" // 95 to 100
                ]}
                // startColor will be ignored
                // endColor will be ignored
              />
              <ReactSpeedometer
                value={10}
                maxValue={30}
                segments={1}
              />
            </div>  
  }
}


const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(Gauge)