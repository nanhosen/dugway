import * as xml2js from 'xml2js'
import * as axios from 'axios'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import VectorSource from 'ol/source/Vector.js'
import { Icon, Text, Fill, Stroke, Style } from 'ol/style.js'
import GeoJSON from 'ol/format/GeoJSON'

import { WIMS_DATA, ARCHIVE_DATA, OBS_DATA, FORECAST_DATA, NWS_FCST, AVG_DATA } from './types'
import { FETCH_DATA } from './types'

import { getText } from '../components/things/getText'
import fdaaLayer1 from '../layers/fdaaLayer1'
import archiveData from '../data/archiveData'

// console.log(archiveData)

// export function makeReq(day1,month1,year1,day2,month2,year2,day3,month3,year3){
function makeAvg(array){
  return (array.reduce((curr,prev) => (parseInt(curr) + parseInt(prev)))) / array.length
}

export function getForecast(){
  // console.log('getForecast')
  return function(dispatch){
    axios.get('https://www.ercserver.us/forecast')
    .then((response)=>{
      // console.log(response)
      var fdraInfo = {
        fdra1: {
          stations: [420913],
          // stations: [260117],
          fcstSwfpi: null,
          indexPercentile: null,
          forecastDate: null,
          prettyName: 'FDRA 1'
        },
        fdra2: {
          stations: [420916],
          // stations: [260117],
          fcstSwfpi: null,
          indexPercentile: null,
          forecastDate: null,
          prettyName: 'FDRA 2'
        },
        fdra3: {
          stations: [420916],
          // stations: [260117],
          fcstSwfpi: null,
          indexPercentile: null,
          forecastDate: null,
          prettyName: 'FDRA 3'
        }
        // fdra4: {
        //   stations: [420917],
        //   // stations: [260117],
        //   fcstSwfpi: null,
        //   indexPercentile: null,
        //   forecastDate: null,
        //   prettyName: 'FDRA 4'
        // }
      }
      var fdraArray = Object.keys(fdraInfo)
      fdraArray.map(currFdra=>{
        var stnArray = fdraInfo[currFdra].stations
        var swfpiFcstArray = []
        var indexPercArray = []
        stnArray.map(currStn => {
          // console.log(response.data[currStn])
          if(response.data[currStn]){
            if(response.data[currStn].obDate){
              fdraInfo[currFdra]['forecastDate'] = response.data[currStn].obDate
            }
          }
          swfpiFcstArray.push(response.data[currStn]['swfpiFcst'])
          indexPercArray.push(response.data[currStn]['fcstIndexPerc'])
        })
        var fcstSwfpi = makeAvg(swfpiFcstArray)
        var fcstIndexPerc = makeAvg(indexPercArray)
        fdraInfo[currFdra]['fcstSwfpi'] = fcstSwfpi
        fdraInfo[currFdra]['indexPercentile'] = fcstIndexPerc
        var returnText = getText(fcstSwfpi)
        // var returnText = getText(5)
        var addObj = { ...fdraInfo[currFdra], ...returnText}
        fdraInfo[currFdra] = addObj
      })
      // console.log(fdraInfo)
      var payload = fdraInfo 
      // console.log(payload, 'payload')
      dispatch({ type: FORECAST_DATA, payload })

     })
    .catch(function(err){
      console.log(err.message)
    })
  }
}

export function makeReq() {
  return function(dispatch) {
    var parseString = xml2js.parseString
    const dates = ['day1', 'day2', 'day3']
    const axiosArray = dates.map(curr => {
      return 'https://www.ercserver.us/'+ curr ;
    })
    
    Promise.all(axiosArray.map(url => axios.get(url)))
    .then(values => {
      // console.log('values', values)
      var fdraInfo = {
        fdra1: {
          stations: [420913],
          // stations: [260117],
          jolValAr: [],
          fcstSwfpi: null,
          avgJolIndex: null,
          prettyName: 'FDRA 1'
        },
        fdra2: {
          stations: [420916],
          // stations: [260117],
          jolValAr: [],
          fcstSwfpi: null,
          avgJolIndex: null,
          prettyName: 'FDRA 2'
        },
        fdra3: {
          stations: [420916],
          // stations: [260117],
          jolValAr: [],
          fcstSwfpi: null,
          avgJolIndex: null,
          prettyName: 'FDRA 3'
        }
        // fdra4: {
        //   stations: [420917],
        //   // stations: [260117],
        //   jolValAr: [],
        //   fcstSwfpi: null,
        //   avgJolIndex: null,
        //   prettyName: 'FDRA 4'
        // }
      }

      var fdraArray = Object.keys(fdraInfo)
      // console.log(fdraArray)
      // function below goes through each fdra and puts jolley index vals in an array called jolValArr. If there were two stations 
      //want it to looklike this:
       // [[ stn1day1val, stn2day1val, stn3day1val ], [ stn1day2val, stn2day2val, stn3day2val ], [ stn1val, stn2val, stn3val ]]
      // day1 [ stn1val, stn2val, stn3val ]
      // day2 [stn1val, stn2val, stn3val ]
      // day3 [stn1val, stn2val, stn3val ]
      //the 0 is for the first station and the 1 is for the second station. The values inside the array for each station represent the values for each day
      fdraArray.map(currFdra => {
        // console.log('current fdra: ', currFdra)
        var stnArray = fdraInfo[currFdra].stations
        var fdraArray = [] // has 3 values, one value of averaged index for all stations for each day. each value in array represents one day
        values.map((curDay, i) => {
          // console.log(curDay)
          var dayArray = [] // day array has the value for each station for each day. So, if there are 3 stations there will be 3 vals, 1 station 1 value
          stnArray.map((curStn, j) => {
            // console.log('curstn', curStn, curDay['data'][curStn])
            dayArray.push(curDay['data'][curStn]['jolInd']) 
          })
          // console.log('dayarray', dayArray)
          var dayAvg = makeAvg(dayArray) //single number average of all stations for one day for one fdra
          fdraArray.push(dayAvg)
          fdraInfo[currFdra]['jolValAr'].push(dayArray)
        })
        fdraInfo[currFdra]['avgJolIndex'] = makeAvg(fdraArray)
        // console.log(makeAvg(fdraArray))
        var returnText = getText(makeAvg(fdraArray))
        // var returnText = getText(5)
        var addObj = { ...fdraInfo[currFdra], ...returnText}
        fdraInfo[currFdra] = addObj
      })

      // console.log(fdraInfo)
      
      var payload = { fdraInfo, archiveData }
      // console.log(payload, 'payload')
      dispatch({ type: WIMS_DATA, payload })
        

    })
    .catch(function(err){
      console.log(err.message)
    })
    // console.log(axiosArray)
  }

}


// export function getArchive(months) {
//   const payload = archiveData
//   // console.log('archiveData payload', payload)
//   return {
//     type: ARCHIVE_DATA,
//     payload
//   }
// }

// export function getArchive() {
//   return function(dispatch){
//     axios.get('https://www.ercserver.us/dugwayArchive')
//     .then((response)=>{
//       // console.log('archiveresponse', response.data)
//       // console.log('archivedata', response.data)
//       const payload = response.data
//       console.log('archiveData payload', payload)
//       dispatch({ type: ARCHIVE_DATA, payload })
//     })
//     .catch(function(err){
//       console.log(err.message)
//     })
//   }
// }

export function getArchive(){
  // console.log('getForecast')
  return function(dispatch){
    axios.get('https://www.ercserver.us/dugwayArchive')
    .then((response)=>{
      const payload = response.data
      // console.log(response)
      
      // console.log(payload, 'payload')
      dispatch({ type: ARCHIVE_DATA, payload })

     })
    .catch(function(err){
      console.log(err.message)
    })
  }
}

export function getLatest(){
  return function(dispatch){
    const stns = ['TT390', 'TT391', 'TT392'] 
    const obsData = 
      [
        {
          stid: 'TT390',
          wimsId: 420913,
          name: null,
          obs: null
        },
        {
          stid: 'TT391',
          wimsId: 420916,
          name: null,
          obs: null
        },
        {
          stid: 'TT392',
          wimsId: 420917,
          name: null,
          obs: null
        }

      ]
    const axiosArray = stns.map(curr => {
      return 'https://api.synopticdata.com/v2/stations/nearesttime?&token=ea0ea69fd87b4eac81bfc08cb270b8e8&output=json&stid=' + curr
    })
    Promise.all(axiosArray.map (url => axios.get(url)))
    .then(values => {
      // console.log('values', values)
      values.map(curr => {
        var valStnId = curr.data.STATION[0].STID
        obsData.map((currPos,i) => {
          if(valStnId == currPos.stid){
            // console.log(obsData[i], valStnId, curr.data.STATION[0].OBSERVATIONS)
            obsData[i].obs = curr.data.STATION[0].OBSERVATIONS
            obsData[i].name = curr.data.STATION[0].NAME
          }
        })
      })
      // console.log('obsData', obsData)
      var payload = { obsData }
      dispatch ({ type: OBS_DATA, payload})
    })
    .catch(function(err){
      console.log(err.message)
    })
  }
}

export function getNwsForecast(){
  //
  return function(dispatch){
    axios.get('https://api.weather.gov/gridpoints/SLC/58,163/forecast')
    .then((response)=>{
      function getMaxWind(string){
        var windArray = string.split(" ")
        var mphLoc = windArray.indexOf("mph")
        var maxSpeed = parseInt(windArray[mphLoc-1])
        // console.log(windArray.indexOf("mph"), windArray, maxSpeed)
        return maxSpeed
      }
      function getIconType(string){
        var fcstArray = string.split(" ")
        // var typeArray = ["Thunderstorms", "Rain", "Mostly" ]
        // var type = 
        //   {
        //     Rain:"rain",
        //     Mostly:"cloudy",
        //     sunny: "sunny",
        //     Thunderstorms: "thunderstorms"
        //   }
        //   console.log(fcstArray, fcstArray.indexOf("Thunderstorms"))
        if(fcstArray.indexOf("Thunderstorms") >=0)  {
          return "thunderstorms"
        }
        else if(fcstArray.indexOf("Rain") >=0)  {
          return "rain"
        }
        else if(fcstArray.indexOf("Mostly") >=0)  {
          return "cloudy"
        }
        else{
          return "sunny"
        }
        // typeArray.map(curr => {
        //   console.log('curr', curr)
        //   if(fcstArray.indexOf(curr) == 0){
        //     console.log(type[curr], curr, string)
        //     return 
        //   }
        // })  

      }
      var speed = getMaxWind("7 to 16 mph")
      // console.log('speed', speed)
      var forecast = response.data.properties
      var payload = []
      // var wantPeriods = [0, 2, 4, 6, 8, 10]
      forecast.periods.map((curr,i) => {
        // var currFcst = forecast.periods[curr]
        // console.log(i)
        // getIconType("sunny") 
        if(curr.isDaytime){
          // console.log('day', i, forecast.periods[i+1])
          // getIconType(curr.shortForecast)

          var fcstOb = {
            name: curr.name,
            maxT: curr.temperature,
            minT: forecast.periods[i+1].temperature,
            windDirection: curr.windDirection,
            windSpeed: getMaxWind(curr.windSpeed),
            shortForecast: curr.shortForecast,
            iconType: getIconType(curr.shortForecast)
          }
        payload.push(fcstOb)
        }
      })
      // var payload = 'forecast test'
      console.log('nwsresp', forecast)
      console.log('payloadNWS', payload)
      dispatch ({ type: NWS_FCST, payload})
    })
  }
}

export function assignAvgAllYears(archiveData, avgData){
  var nameMap = new Map([['dugwayN',420913],['dugwayS',420916],['dugwayW',420917]])
  var archiveDateArray = Object.keys(archiveData)
  // console.log(archiveDateArray)
  var yearsArray = archiveDateArray.reduce((prev,curr)=>{
    var year = new Date(curr).getFullYear()
    if(prev.indexOf(year) < 0 ){
      prev.push(year)
    }
    return prev
  }, [])
  var stnArray = Object.keys(avgData)
  // console.log(stnArray)
  var avgArray = []
  var avgObj = {}
  yearsArray.map(currYear => {
    stnArray.map((currAvgStn) => {
      // console.log(nameMap.get(currAvgStn))
      avgData[currAvgStn].map(currData => {
        var year = currYear.toString()
        var fullDate = `${currData.date} ${year}`
        var day = new Date(fullDate).toLocaleString('en-En',{day: "2-digit"})
        var month = new Date(fullDate).toLocaleString('en-En',{month: "2-digit"})
        var year = new Date(fullDate).toLocaleString('en-En',{year: "numeric"})
        var formatDate = `${month}/${day}/${year}`
        var avgBi= currData.avgBi
        var avgErc= currData.avgErc
        if(!avgObj[formatDate]){
          // console.log('not', avgObj[formatDate])
          avgObj[formatDate] = {}
        }
        // console.log(avgObj[formatDate])
        avgObj[formatDate][nameMap.get(currAvgStn)] = {
          name: currAvgStn,
          avgBi,
          avgErc
        }
        avgArray.push({
          formatDate,
          avgBi,
          avgErc
        })
      // console.log(formatDate, currData, currAvgStn)
      })
    })
  })
  // console.log(avgObj, nameMap)
  var payload = avgObj
  return function(dispatch){
    dispatch ({ type: AVG_DATA, payload})
  }
}


// export function fdaaLayer(fdraData) {
//   var vecLayer = new VectorLayer({
//     title: 'Dispatch Boundaries',
//     visible: true,
//     source: new VectorSource({
//       url: './FDAAs4326.json', 
//       format: new GeoJSON()
//     }),  
//     wrapX: false,
//     minResolution: 0,
//     maxResolution: 10000,
//     style: (feature, resolution) => {
//       const style = new Style({
//         fill: new Fill({
//           color: 'rgba(111,143,174,0.2)'
//         }),
//         stroke: new Stroke({
//           color: 'rgba(7,7,7,0.8)', 
//           width: 1
//         }),
//         text: new Text({
//           font: '15px Montserrat, sans-serif',
//           fill: new Fill({
//             color: '#000'
//           }),
//           stroke: new Stroke({
//             color: 'rgba(238, 238, 238, 1)',
//             width: 3
//           })
//         })
//       })
//       const zone = feature.get('Fire_Dange')
//       var name = 'FDRA ' + zone
//       var zoneId = 'fdra' + zone
//       // console.log('zone', name)
//       console.log('fdraLayer rendered and got this: ', fdraData)
//       const { status } = fdraData[zoneId] || ''
//       const color = {
//         'Low': '#ffc107',
//         'Moderate': '#28a645',
//         'Extreme': '#dc3545',
//       }[status] || 'rgba(211,17,78,0.6)'
//       // const color = 'rgba(211,17,78,0.6)'
//       style.getFill().setColor(color)
//       // style.getText().setText(resolution < 5000 ? name : '');
//       return style
//     }        
//   // projection: 'EPSG:3857',
//   // source: vectorSource,
//   // name: 'rawsPoints',
//   // visible: true,
//   // // style: styleFunction
//   // style: iconStyle
//   })
//   var payload = {vecLayer}
//       // console.log(payload, 'payload')
//   dispatch({ type: LAYER, payload })
// }
// // const mapStateToProps = state => {
// //   const { wimsData } = state
// //   console.log(wimsData, 'wimsDataLayer')
// //   return { wimsData }
// // }
// // export default connect(mapStateToProps, null)(fdaaLayer)
// export default fdaaLayer


