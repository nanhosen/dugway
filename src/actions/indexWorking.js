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
export function makeReq() {
  return function(dispatch) {
    var parseString = xml2js.parseString
    // console.log(dates)
    const dates = ['day1', 'day2', 'day3']
    const axiosArray = dates.map(curr => {
      return 'https://www.ercserver.us/'+ curr ;
      // return 'https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=&sig=ALL_GB&type=O&start='+ curr + '&end=' + curr + '&time=&user=679&fmodel=7G';
      // console.log(axios.get(url))
      // return axios.get(url)
      // axiosArray.push(axiosReq)
      // console.log('as af')
    })
    
    Promise.all(axiosArray.map(url => axios.get(url)))
    .then(values => {
      var stnsInFdras = {
        fdra1: [420913],
        fdra2: [420916],
        fdra3: [420917], 
        fdra4: [420917]
      }
      //not using stnsinfdras but could change code to include this sort of thing if more than 1 stn in an fdral. like, in the line 5 area map over stns in the array of the fdra and then assign average value to each fdra for each day
      // getColors = level => {
      //   if
      // }
      var stnFdraMap = new Map()
      stnFdraMap.set(420913, 'fdra1')
                .set(420916, 'fdra2')
                .set(420917, 'fdra3')
      // stnFdraArray = [[420913, 'fdra1'], [420913, 'fdra2'], [420913, 'fdra3']]

      var stnArray = [420913, 420916, 420917]
      var valObj = {}
      var stateObj = {}
      stnArray.map(curr => {
        var currFdra = stnFdraMap.get(curr)
        valObj[curr] = { 
          biArray: [],
          jolArray : []
        }
        stateObj[currFdra] = { 
          biArray: [],
          jolArray : []
        }
      })
      console.log(valObj, 'valObj')

      // console.log('in promise', values)
      var allVals =  values.map((curr,i)=> curr.data)
      console.log('allVals', allVals)
      allVals.map((currVal,i) => {
        stnArray.map((curStn,ii)=>{
          var currFdra = stnFdraMap.get(curStn)
          if(currVal[curStn] !== undefined){
          console.log( currVal[curStn], curStn, 'here')

            valObj[curStn]['biArray'].push(currVal[curStn]['bi'])
            stateObj[currFdra]['biArray'].push(currVal[curStn]['bi'])
            valObj[curStn]['jolArray'].push(currVal[curStn]['jolInd'])
            stateObj[currFdra]['jolArray'].push(currVal[curStn]['jolInd'])
          }
        })
      })
      var text = "text"
      stnArray.map((currStn,i) => {
        console.log('currStn', currStn, 'ind', i)
        var avgBi = (valObj[currStn]['biArray'].reduce((curr,prev) => (parseInt(curr) + parseInt(prev)))) / valObj[currStn]['biArray'].length
        var avgJolInd = (valObj[currStn]['jolArray'].reduce((curr,prev) => (parseInt(curr) + parseInt(prev)))) / valObj[currStn]['jolArray'].length
        var currFdra = stnFdraMap.get(currStn)
        // console.log(currFdra)
        valObj[currStn]['avgBi'] = avgBi
        valObj[currStn]['avgJolInd'] = avgJolInd
        valObj[currStn]['text'] = getText(avgJolInd)
        stateObj[currFdra]['avgBi'] = avgBi
        stateObj[currFdra]['avgJolInd'] = avgJolInd
        stateObj[currFdra]['text'] = getText(avgJolInd)
        // console.log(avgBi, 'avgBi', currStn, 'currStn')
      })


      
      
      // console.log(vecLayer, 'vecLayer')
      // console.log(valObj, 'valObj', textget, 'textget')
      var payload = {stateObj}
      // console.log(payload, 'payload')
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


