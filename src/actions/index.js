import * as xml2js from 'xml2js'
import * as axios from 'axios'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import VectorSource from 'ol/source/Vector.js'
import { Icon, Text, Fill, Stroke, Style } from 'ol/style.js'
import GeoJSON from 'ol/format/GeoJSON'

import { WIMS_DATA } from './types'
import { FETCH_DATA } from './types'

import { getText } from '../components/things/getText'
import fdaaLayer1 from '../layers/fdaaLayer1'

// export function makeReq(day1,month1,year1,day2,month2,year2,day3,month3,year3){
function makeAvg(array){
  return (array.reduce((curr,prev) => (parseInt(curr) + parseInt(prev)))) / array.length
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
      var fdraInfo = {
        fdra1: {
          stations: [420913],
          jolValAr: [],
          avgJolIndex: null,
          prettyName: 'FDRA 1'
        },
        fdra2: {
          stations: [420916],
          jolValAr: [],
          avgJolIndex: null,
          prettyName: 'FDRA 2'
        },
        fdra3: {
          stations: [420916],
          jolValAr: [],
          avgJolIndex: null,
          prettyName: 'FDRA 3'
        },
        fdra4: {
          stations: [420917],
          jolValAr: [],
          avgJolIndex: null,
          prettyName: 'FDRA 4'
        }
      }

      var fdraArray = Object.keys(fdraInfo)
      console.log(fdraArray)
      // function below goes through each fdra and puts jolley index vals in an array called jolValArr. If there were two stations 
      //want it to looklike this:
       // [[ stn1day1val, stn2day1val, stn3day1val ], [ stn1day2val, stn2day2val, stn3day2val ], [ stn1val, stn2val, stn3val ]]
      // day1 [ stn1val, stn2val, stn3val ]
      // day2 [stn1val, stn2val, stn3val ]
      // day3 [stn1val, stn2val, stn3val ]
      //the 0 is for the first station and the 1 is for the second station. The values inside the array for each station represent the values for each day
      fdraArray.map(currFdra => {
        console.log('current fdra: ', currFdra)
        var stnArray = fdraInfo[currFdra].stations
        var fdraArray = [] // has 3 values, one value of averaged index for all stations for each day. each value in array represents one day
        values.map((curDay, i) => {
          var dayArray = [] // day array has the value for each station for each day. So, if there are 3 stations there will be 3 vals, 1 station 1 value
          stnArray.map((curStn, j) => {
            dayArray.push(curDay['data'][curStn]['jolInd']) 
          })
          var dayAvg = makeAvg(dayArray) //single number average of all stations for one day for one fdra
          fdraArray.push(dayAvg)
          fdraInfo[currFdra]['jolValAr'].push(dayArray)
        })
        fdraInfo[currFdra]['avgJolIndex'] = makeAvg(fdraArray)
        // var returnText = getText(makeAvg(fdraArray))
        var returnText = getText(5)
        var addObj = { ...fdraInfo[currFdra], ...returnText}
        fdraInfo[currFdra] = addObj
      })

      console.log(fdraInfo)
      
      var payload = { fdraInfo }
      console.log(payload, 'payload')
      dispatch({ type: WIMS_DATA, payload })
        

    })
    .catch(function(err){
      console.log(err.message)
    })
    // console.log(axiosArray)
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


