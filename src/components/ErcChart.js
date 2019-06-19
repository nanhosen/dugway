import React, { Component }  from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux'

import avgErcBi from '../data/avgErcBi'


class ErcChart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // console.log('chart this', this)
    var stn = this.props.stn
    var dataLength = Object.keys(this.props.archiveData).length
    var dataLengthAvg = Object.keys(this.props.avgData).length
    var allData = this.props.archiveData
    var avgData = this.props.avgData


    // console.log(this)
    // console.log('other name', allData)
    if(dataLength!==0 && dataLengthAvg !==0){
      if(this.props.divWidth){
        var autosize = false
        var width = this.props.divWidth
        // console.log(Object.keys(avgData))
      }
      else{
        // console.log(this.props)
        var autosize = true
        var width = 'auto'
      }
      // console.log(autosize, width)
      var dateArray = Object.keys(allData)
      var dateArrayAvg = Object.keys(avgData)
      var avgErcY = []
      var avgBiY = []

      var avgXDates = dateArrayAvg.reduce((prev,curr, i) => {
        var date = new Date(curr)
        var upMonth = date.getMonth() + 1
        var newDate = date.getFullYear() + '-' + upMonth + '-' + date.getDate()
        // console.log(newDate, i, prev)
        prev.push(newDate)
        avgErcY.push(avgData[curr][stn]['avgErc'])
        avgBiY.push(avgData[curr][stn]['avgBi'])
        // console.log(avgData[curr][stn])
        return prev
        // console.log(curr, newDate)
      },[])
      // console.log(avgXDates)

      var selectorOptions = {
        // buttons: [
        //   {
        //     step: 'month',
        //     stepmode: 'backward',
        //     count: 1,
        //     label: '1m'
        //   }, {
        //     step: 'month',
        //     stepmode: 'backward',
        //     count: 3  ,
        //     label: '3m'
        //   }, 
        //   {
        //     step: 'month',
        //     stepmode: 'backward',
        //     count: 6,
        //     label: '6m'
        //   },{
        //     step: 'year',
        //     stepmode: 'todate',
        //     count: 1,
        //     label: 'YTD'
        //   }, {
        //     step: 'year',
        //     stepmode: 'backward',
        //     count: 1,
        //     label: '1y'
        //   }, {
        //     step: 'all',
        //   }
        // ],
      };
      var sfwpiObj = {
        x:[],
        y:[],
        type: 'bar', 
        name: 'SFWPI',
        marker: {
          color: []
        }
      }
      var ercObj = {
        x:[],
        y:[],
        yaxis: 'y2',
        type: 'scatter', 
        name: 'ERC',
        line: {
          color: 'rgb(219, 64, 82)',
          width: 2
        }
      }

      var ercAvgObj = {
        x:avgXDates,
        y:avgErcY,
        yaxis: 'y2',
        type: 'scatter', 
        name: 'Average ERC (2010-2018)',
        line: {
          color: 'grey',
          width: 2,
          dash: 'dot'
        }
      }

      var biObj = {
        x:[],
        y: [],
        yaxis: 'y2',
        type: 'scatter', 
        name: 'BI',
        line: {
          color: 'rgb(219, 64, 82)',
          width: 2
        }
      }

      var biAvgObj = {
        x:avgXDates,
        y:avgBiY,
        yaxis: 'y2',
        type: 'scatter', 
        name: 'BI Average',
        line: {
          color: 'grey',
          width: 2,
          dash: 'dot'
        }
      }

      // console.log('avgdate', dateArrayAvg)

      
      dateArray.map((curr, i) => {
        // console.log(allData[curr][stn], curr, stn)
        var date = new Date(curr)
        var upMonth = date.getMonth() + 1
        var newDate = date.getFullYear() + '-' + upMonth + '-' + date.getDate()
        // var formattedDate = new Intl.DateTimeFormat('en-US',{ 
        //   year: '2-digit', 
        //   month: 'numeric', 
        //   day: 'numeric' 
        // }).format(date)
        // console.log(formattedDate,'new',  newDate)
        sfwpiObj['x'].push(newDate)
        ercObj['x'].push(newDate)
        biObj['x'].push(newDate)
        biAvgObj['x'].push(newDate)
        ercAvgObj['x'].push(newDate)
        var sfwpiFcst = allData[curr][stn] ? allData[curr][stn]['swfpiFcst'] : 0
        var erc = allData[curr][stn] ? allData[curr][stn]['erc'] : 0
        var bi = allData[curr][stn] ? allData[curr][stn]['bi'] : 0
        // console.log(avgData[curr][stn]['avgBi'])
        sfwpiObj['marker']['color'].push(getBarColor(sfwpiFcst))
        sfwpiObj['y'].push(parseInt(sfwpiFcst))
        ercObj['y'].push(parseInt(erc))
        biObj['y'].push(parseInt(bi))
        

      })
      // console.log('biAvgObj  ', biAvgObj['x'])
    
      var firstDate = sfwpiObj.x[0]
      var xLen = sfwpiObj.x.length
      var lastDate = sfwpiObj.x[xLen - 1]
      // console.log(lastDate, biObj)

      // var chartData = [ercAvgObj, ercObj, biAvgObj, biObj]
      var chartData = [biAvgObj, biObj]
      // console.log(chartData)
      // var chartData = [sfwpiObj, biObj, ercObj]
      var layout = {
          legend: {
            x: 0,
            y: 1
          },
          autosize: autosize,
          width: width, 
          // height: 500, 
          title: `ERC for station ${stn}`,
          updatemenus: updatemenus,
          yaxis: {
            title: 'ERC',
            range: [0,5]
          },
          yaxis2: {
            title: 'Avg',
            titlefont: {color: 'rgb(148, 103, 189)'},
            tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right'
          },
          xaxis: {
            type: 'date',
            ticks: 'outside',
            tick0: firstDate,
            dtick: 1296000000,
            range: ["2019-01-01", lastDate],
            ticklen: 2,
            tickwidth: 1,
            tickcolor: '#000'
            // ,rangeselector: selectorOptions,
            // rangeslider: {}
          }
      } 

      var updatemenus=[
        {
            buttons: [   
                {
                    args: [{'visible': [true, false]},
                           {'title': 'ERC'}],
                    label: 'ERC',
                    method: 'update'
                },
                {
                    args: [{'visible': [false, true]},
                           {'title': 'BI'}],
                    label: 'BI',
                    method: 'update'
                },
                {
                    args: [{'visible': [true, true]},
                           {'title': 'Both'}],
                    label: 'Both',
                    method: 'update'
                }
                
            ],
            direction: 'left',
            pad: {'r': 5, 't': 5},
            showactive: true,
            type: 'buttons',
            x: 0.1,
            xanchor: 'left',
            y: 1,
            // y: 5,
            yanchor: 'top' 
        },
        
    ]
      return (
        <Plot
          data = { chartData }
          layout={ layout }
        />
      )
    }
    else{
      // console.log('wait......')
      return <div>Loading</div>
    }  
  }
}

function getBarColor(number){
  var numObj = {
    1: '#2cc74f', 
    2: '#faeb1e',
    3: '#e5a733',
    4: '#e32d19',
    5: '#cf19e3'
  }
  // console.log(numObj[number])
  return numObj[number]
}
const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(ErcChart)