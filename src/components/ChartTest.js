import React, { Component }  from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux'


class Chart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // console.log('chart this', this)
    var stn = this.props.stn
    var dataLength = Object.keys(this.props.archiveData).length
    var allData = this.props.archiveData


    // console.log(this)
    // console.log('other name', allData)
    if(dataLength!==0){
      if(this.props.divWidth){
        var autosize = false
        var width = this.props.divWidth
      }
      else{
        // console.log(this.props)
        var autosize = true
        var width = 'auto'
      }
      // console.log(autosize, width)
      var dateArray = Object.keys(allData)

      var selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
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
        // console.log(allData[curr][stn], curr, stn)
        var date = new Date(curr)
        var upMonth = date.getMonth() + 1
        var newDate = date.getFullYear() + '-' + upMonth + '-' + date.getDate()
        var formattedDate = new Intl.DateTimeFormat('en-US',{ 
          year: '2-digit', 
          month: 'numeric', 
          day: 'numeric' 
        }).format(date)
        // console.log(formattedDate,'new',  newDate)
        sfwpiObj['x'].push(newDate)
        ercObj['x'].push(newDate)
        biObj['x'].push(newDate)
        var sfwpiFcst = allData[curr][stn] ? allData[curr][stn]['swfpiFcst'] : 0
        var erc = allData[curr][stn] ? allData[curr][stn]['erc'] : 0
        var bi = allData[curr][stn] ? allData[curr][stn]['bi'] : 0
        sfwpiObj['marker']['color'].push(getBarColor(sfwpiFcst))
        sfwpiObj['y'].push(parseInt(sfwpiFcst))
        ercObj['y'].push(parseInt(erc))
        biObj['y'].push(parseInt(bi))

      })
    
      var firstDate = sfwpiObj.x[0]
      // console.log(biObj)

      var chartData = [sfwpiObj, biObj, ercObj]
      var layout = 
        {
          autosize: autosize,
          width: width, 
          // height: 500, 
          title: `ERC, BI, and SFWPI for station ${stn}`,
          yaxis: {
            title: 'SFWPI',
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
            tickcolor: '#000',
            rangeselector: selectorOptions,
            rangeslider: {}
          }
        } 
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
export default connect(mapStateToProps)(Chart)