import React, { Component }  from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux'



class HeatMap extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // console.log('chart this', this)
    var stn = this.props.stn
    var allData = this.props.archiveData
    // console.log('other name', allData)
    var dataLength = Object.keys(this.props.archiveData).length
    if(dataLength !== 0){

      if(this.props.divWidth){
        // var autosize = false
        var width = this.props.divWidth
      }
      else{
        // console.log(this.props)
        // var autosize = true
        var width = 'auto'
      }

      var layout = {
          title: 'SFWPI by Year',
          annotations: [],
          showscale: true,
          legend: {
            bgcolor: 'white'
          },
          width: width,
          xaxis: {
            ticks: '',
            side: 'bottom',
            tickmode: 'auto',
            nticks: 10
          },
          yaxis: {
            ticks: '',
            ticksuffix: ' ',
            tickmode: 'auto',
            nticks: 5,
            // width: 700,
            name: 'year',
            // height: 700,
            // type: 'scaled',
            autosize: true
          }
        }

      Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }
      // console.log(allData)
      var dateArray = Object.keys(allData)
      // console.log(dateArray)
      // var allDays = [new Date("1/1")]
      var dateArrayNoYear = ["January 1"]
      var d = 0
      var d0 = new Date("1/1/2018")
      while (d<365){
        var pos = dateArrayNoYear.length - 1
        var initDate = new Date(dateArrayNoYear[pos])
        var nextDate = initDate.addDays(1)
        // allDays.push(nextDate)
        dateArrayNoYear.push(new Date(nextDate).toLocaleString('en-En',{month: "long", day: "numeric"})) 


        d = d+1
      }
      // console.log(dateArrayNoYear)
      var dateAr = []
      var yearAr = []
      var monDayAr = []
      var iAr = []
      var zAr = [[],[]]
      var bigZ = [[],[],[]]



      const data = [{
        x: dateArrayNoYear,
        y: yearAr,
        z: bigZ,
        showscale: true,
        colorscale: [
    // Let first 10% (0.1) of the values have color rgb(0, 0, 0)
            [0, 'grey'],
            [0.16, 'grey'],

            [0.16, '#2cc74f'],
            [0.33, '#2cc74f'],

            [0.33, '#faeb1e'],
            [0.49, '#faeb1e'],     

            [0.49, '#e5a733'],
            [0.65, '#e5a733'],

            [0.65, '#e32d19'],
            [0.82, '#e32d19'],

            [0.82, '#cf19e3'],
            [1.0, '#cf19e3'],
        ],
        type: 'heatmap',
        // colorscale: colorscaleValue,
        showscale: false
      }]; 
      dateArrayNoYear.map(curr => {
        bigZ[0].push(0)
        bigZ[1].push(0)
        bigZ[2].push(0) 
      })
      // console.log(bigZ)
      dateArray.map((curr, i) => {
        // console.log(allData[curr], curr, stn)
        // console.log('index of', dateArrayNoYear.indexOf(new Date(curr).toLocaleString('en-En',{month: "long", day: "numeric"})), new Date(curr))
        var date = new Date(curr)
        var index = dateArrayNoYear.indexOf(new Date(curr).toLocaleString('en-En',{month: "long", day: "numeric"}))
        var upMonth = date.getMonth() + 1
        var newDate = upMonth + '-' + date.getDate()
        var formattedDate = new Intl.DateTimeFormat('en-US',{ 
          year: '2-digit', 
          month: 'numeric', 
          day: 'numeric' 
        }).format(date)
        var currYear = date.getFullYear()
        var yearLen = yearAr.length
        var position = yearLen-1 >0 ? yearLen-1 : 0
        // console.log(yearAr)
        dateAr.push(newDate)
        var sfwpiFcst = allData[curr][stn] ? allData[curr][stn]['swfpiFcst'] : 0
        bigZ[position][index] = parseInt(sfwpiFcst)
        if(!yearAr.includes(currYear)){
          yearAr.push(currYear)
          // zAr[position] = []
          zAr[position].push(parseInt(allData[curr][stn]['swfpiFcst']))
          // console.log('includes', 'zar', zAr, 'position', position, 'length', yearLen, yearLen-1)


        }
        else{
          // console.log('zar', zAr, 'position', position, 'yearLen', yearLen, yearLen-1)
          // zAr[position].push(parseInt(allData[curr][stn]['swfpiFcst']))

        }

        // return data
          // console.log('data', data, data[0]['x'][0], bigZ)
      // var sfwpiObj = {
      //   x:[],
      //   y:[],
      //   type: 'bar', 
      //   name: 'SFWPI',
      //   marker: {
      //     color: []
      //   }
      // }
      // var ercObj = {
      //   x:[],
      //   y:[],
      //   yaxis: 'y2',
      //   type: 'scatter', 
      //   name: 'ERC',
      //   line: {
      //     color: 'rgb(219, 64, 82)',
      //     width: 2
      //   }
      // }

      // var biObj = {
      //   x:[],
      //   y:[],
      //   yaxis: 'y2',
      //   type: 'scatter', 
      //   name: 'BI',
      //   line: {
      //     color: '#062a4e',
      //     width: 2,
      //     dash: 'dot'
      //   }
      // }
      
   //    var colorscaleValue = [
      //   [0, '#e882ca'],
      //   [1, '#b182e8']
      //   [2, '#1696de']
      //   [3, '#16dec9']
      //   [4, '#25de16']
      //   [5, '#de5e16']
      // ];

      
        // console.log(formattedDate,'new',  newDate)
        // sfwpiObj['x'].push(newDate)
        // ercObj['x'].push(newDate)
        // biObj['x'].push(newDate)
        // sfwpiObj['marker']['color'].push(getBarColor(allData[curr][stn]['swfpiFcst']))
        // sfwpiObj['y'].push(parseInt(allData[curr][stn]['swfpiFcst']))
        // ercObj['y'].push(parseInt(allData[curr][stn]['erc']))
        // biObj['y'].push(parseInt(allData[curr][stn]['bi']))
      })
        console.log('heatmapdata', data)
      
      return (
      <Plot
        data = { data }
        layout = { layout }
        // layout={ 
        //   {
        //     width: 700, 
        //     height: 500, 
        //     title: `ERC, BI, and SFWPI for station ${stn}`,
        //     yaxis: {
        //       title: 'Jolly Index',
        //       range: [0,5]
        //     },
        //     yaxis2: {
        //       title: 'BI',
        //       titlefont: {color: 'rgb(148, 103, 189)'},
        //       tickfont: {color: 'rgb(148, 103, 189)'},
        //       overlaying: 'y',
        //       side: 'right'
        //     },
        //     xaxis: {
        //       type: 'date',
        //       ticks: 'outside',
        //       tick0: firstDate,
        //       dtick: 1296000000,
        //       ticklen: 2,
        //       tickwidth: 1,
        //       tickcolor: '#000'
        //     },
        //   } 
        // }
      />
    )
    }
    else{
      return <div>Loading</div>
    }
    // var firstDate = sfwpiObj.x[0]

    // var chartData = [sfwpiObj, biObj, ercObj]
    // console.log('datsaa', data)
    
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
export default connect(mapStateToProps)(HeatMap)