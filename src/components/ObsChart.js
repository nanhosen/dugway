import React, { Component }  from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux'
import timeseries from '../data/timeseries'


class ObsChart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var tempData = {
      x: [], 
      y: [],
      mode: 'lines',
      type: 'scatter',
      name: 'Temperature',
      line: {
          color: '#a50d1b',
          width: 2
      }
    }
    var rhData = {
      x: [], 
      y: [],
      mode: 'lines',
      type: 'scatter',
      name: 'Relative Humidity',
      line: {
          color: '#1a599c',
          width: 1
      }
    }
    // console.log('chart timeseriestimeseries', timeseries)
    timeseries['STATION'][0]['OBSERVATIONS']['air_temp_set_1'].map((curr,i)=>{
      // console.log(curr, timeseries['STATION'][0]['OBSERVATIONS']['date_time'][i])
      tempData.x.push(timeseries['STATION'][0]['OBSERVATIONS']['date_time'][i])
      rhData.x.push(timeseries['STATION'][0]['OBSERVATIONS']['date_time'][i])
      tempData.y.push((curr*1.8)+32)
      rhData.y.push(timeseries['STATION'][0]['OBSERVATIONS']['relative_humidity_set_1'][i])
    })
    
    // console.log(tempData)
    var trace1 = {
      x: ['2000-01-01', '2000-01-02', '2000-01-03', '2000-01-04', '2000-01-05', '2000-01-06', '2000-01-07', '2000-01-08', '2000-01-09', '2000-01-10', '2000-01-11', '2000-01-12', '2000-01-13', '2000-01-14', '2000-01-15', '2000-01-16', '2000-01-17', '2000-01-18', '2000-01-19', '2000-01-20', '2000-01-21', '2000-01-22', '2000-01-23', '2000-01-24', '2000-01-25', '2000-01-26', '2000-01-27', '2000-01-28', '2000-01-29', '2000-01-30', '2000-01-31'],
      y: [4.3, 8.2, 4.1, 5.6, -3, -0.2, 0.3, 0.4, 4.1, 5, 4.6, -0.2, -8.5, -9.1, -2.7, -2.7, -17, -11.3, -5.5, -6.5, -16.9, -12, -6.1, -6.6, -7.9, -10.8, -14.8, -11, -4.4, -1.3, -1.1],
      mode: 'lines',
      type: 'scatter',
      name: '2000'
    };
    var layout = {
          xaxis: {
            type: 'date'
          },
          title:'Temperature and Relative Humidity: Past 3 days'
        }
    var chartData = [tempData, rhData]
    return (
      <Plot
        data = { chartData }
        layout= {layout }
      />
    )
  }
}


const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(ObsChart)