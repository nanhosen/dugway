import React, { Component }  from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux'


class Chart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('chart this', this)
    var stn = this.props.stn
    var allData = this.props.archiveData
    console.log('other name', allData)
    if(allData){

      var dateArray = Object.keys(allData)
      var jolIndObj = {
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

      var biObj = {
        x:[],
        y:[],
        yaxis: 'y2',
        type: 'scatter', 
        name: 'BI',
        line: {
          color: '#062a4e',
          width: 2,
          dash: 'dot'
        }
      }
      dateArray.map((curr, i) => {
        console.log(allData[curr], curr, stn)
        var date = new Date(curr)
        var upMonth = date.getMonth() + 1
        var newDate = date.getFullYear() + '-' + upMonth + '-' + date.getDate()
        var formattedDate = new Intl.DateTimeFormat('en-US',{ 
          year: '2-digit', 
          month: 'numeric', 
          day: 'numeric' 
        }).format(date)
        // console.log(formattedDate,'new',  newDate)
        jolIndObj['x'].push(newDate)
        ercObj['x'].push(newDate)
        biObj['x'].push(newDate)
        jolIndObj['marker']['color'].push(getBarColor(allData[curr][stn]['jolInd']))
        jolIndObj['y'].push(parseInt(allData[curr][stn]['jolInd']))
        ercObj['y'].push(parseInt(allData[curr][stn]['erc']))
        biObj['y'].push(parseInt(allData[curr][stn]['bi']))

      })
    }
    var firstDate = jolIndObj.x[0]
    // console.log(biObj)

    var chartData = [jolIndObj, biObj, ercObj]
    return (
      <Plot
        data = { chartData }
        layout={ 
          {
            width: 700, 
            height: 500, 
            title: `ERC, BI, and SFWPI for station ${stn}`,
            yaxis: {
              title: 'Jolly Index',
              range: [0,5]
            },
            yaxis2: {
              title: 'BI',
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
              ticklen: 2,
              tickwidth: 1,
              tickcolor: '#000'
            },
          } 
        }
      />
    )
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
export default connect(mapStateToProps)(Chart)