import React, { Component }  from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux'



class ButtonChart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var stn = this.props.stn
    var dataLength = Object.keys(this.props.archiveData).length
    var dataLengthAvg = Object.keys(this.props.avgData).length
    var allData = this.props.archiveData
    var avgData = this.props.avgData
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
        visible: false,
        type: 'scatter', 
        name: 'ERC',
        line: {
          color: '#a11ddf',
          width: 2
        }
      }

      var ercAvgObj = {
        x:avgXDates,
        y:avgErcY,
        yaxis: 'y2',
        visible: false,
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
          color: '#ed1487',
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
      var chartData = [biAvgObj, biObj, ercAvgObj, ercObj]
      console.log(chartData)
      // console.log(avgXDates)
      var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers'
    };

    var trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 10],
      mode: 'lines'
    };

    var updatemenus=[
        {
            buttons: [   
                {
                    args: [{'visible': [true, true, false, false]},
                      {'title': 'BI'}],
                    label: 'BI',
                    method: 'update'
                },
                {
                    args: [{'visible': [false, false, true, true]},{'title': 'ERC'}],
                    label:'ERC',
                    method:'update'
                },
                {
                    args: [{'visible': [true, true, true, true]},{'title': 'BI + ERC'}],
                    label:'Both',
                    method:'update'
                }             
            ],
            direction: 'left',
            pad: {'r': 1, 't': 10, 'l':1, 'b':5},
            showactive: true,
            type: 'buttons',
            x: 0,
            xanchor: 'left',
            y: 1.4,
            yanchor: 'top',
            bgcolor: '#eeeeee' ,
            bordercolor: '#eeeeee' 
        }
    ]

    var trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers'
    };

    var data = [ trace1, trace2, trace3 ];

    var selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 3  ,
            label: '3m'
        }, 
        {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        },{
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        }, {
            step: 'all',
        }],
      }

    var layout = {
      legend: {
       
        orientation: "h"
      },
      updatemenus:updatemenus,
      autosize: autosize,
      width: width,
      title: 'BI',
      xaxis: {
        type: 'date',
        ticks: 'outside',
        tick0: firstDate,
        dtick: 1296000000,
        range: ["2019-01-01", lastDate],
        ticklen: 2,
        tickwidth: 1,
        tickcolor: '#000'
        ,rangeselector: selectorOptions,
        rangeslider: {}
      }
    };
      return (
      <Plot
        data = { chartData }
        layout = { layout }
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
export default connect(mapStateToProps)(ButtonChart)