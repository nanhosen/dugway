// Step 1 - Including react
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'


// Step 2 - Including the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Step 3 - Including the fusioncharts library
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import Widgets from 'fusioncharts/fusioncharts.widgets';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

// Step 7 - Creating the JSON object to store the chart configurations


// Step 9 - Creating the DOM element to pass the react-fusioncharts component
class LinearGauge extends React.Component {
  render() {
    // var stnName  = ''
    // var fcstErc = ''
    // var fcstBi = ''
    // var fcstDate = ''
    // var obErc = ''
    // var obBi = ''
    // var obDate = ''
    // console.log('table this', this)


    if(this.props.divWidth && Object.keys(this.props.forecastData).length>0 && this.props.stn){
      // console.log(this)
      var stnSelected = this.props.stn
      // Object.keys(this.props.forecastData).map(curr => {
      //   var currStn = this.props.forecastData[curr].stations
      //   if(currStn.indexOf(parseInt(stnSelected)) >= 0){
      //     var stnName = this.props.forecastData[curr].prettyName
      //     var fcstErc = Math.round(this.props.forecastData[curr].ercFcst)
      //     var fcstBi = Math.round(this.props.forecastData[curr].biFcst)
      //     // obDate = 'need to get'
      //     // fcstDate = this.props.forecastData[curr].forecastDate
      //     // console.log(curr, 'xue4e', stnName, fcstErc, fcstBi, fcstDate)
      //   }
      // })
      var sfwpiPercentile = 0
      var sfwpiDate = '1/1/1'
      Object.keys(this.props.forecastData).map(currFdra => {
        // console.log(this.props.stn, this.props.forecastData[currFdra]["stations"][0])
        // console.log(this.props.forecastData[currFdra]["stations"].indexOf(parseInt(this.props.stn)))
        if(this.props.forecastData[currFdra]["stations"].indexOf(parseInt(this.props.stn))>=0){
          sfwpiPercentile = this.props.forecastData[currFdra].indexPercentile
          sfwpiDate = this.props.forecastData[currFdra].forecastDate
        }
      })
      const chartConfigs = {
        type: 'hlineargauge', // The gauge type
        width: this.props.divWidth, // Width of the gauge
        height: '180', // Height of the gauge
        dataFormat: 'json', // Data type
        dataSource : {
          chart: {
            caption: `Fire Danger Forecast for ${sfwpiDate}`,
            subcaption: `Based on the Severe Fire Weather Potential Index `,
            gaugefillmix: "{dark-20},{light+70},{dark-10}",
            theme: "fusion",
            showTickMarks: "1",
            showTickValues: "1",
            majorTMNumber: "10",
            showGaugeBorder: "1",
            gaugeBorderColor: "#343a40",
            gaugeBorderThickness: "1",
            gaugeBorderAlpha: "50"
          },
          colorrange: {
            color: [
              // {
              //   minvalue: "0",
              //   maxvalue: "59",
              //   label: "Low",
              //   code: "#c7e3be"
              // },
              {
                minvalue: "0",
                maxvalue: "79",
                label: "Low",
                code: "#c7e3be"
              },
              {
                minvalue: "80",
                maxvalue: "89",
                label: "Moderate",
                code: "#f7f779"
              },
              {
                minvalue: "90",
                maxvalue: "96",
                label: "High",
                code: "#f8bf8a"
              },
              {
                minvalue: "97",
                maxvalue: "100",
                label: "Extreme",
                code: "#dc727f"
              }
            ]
          },
          pointers: {
            pointer: [
              {
                value: Math.round(sfwpiPercentile),
                showValue: "1"
              }
            ]
          }
        }
      };
      return (
     <ReactFC
        {...chartConfigs}/>
     )
    }
    else{
      return <div>Loading</div>
    }
  }
}

// export default LinearGauge

const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(LinearGauge)