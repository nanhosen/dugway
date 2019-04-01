import * as xml2js from 'xml2js'
import * as axios from 'axios'
import { WIMS_DATA } from './types'
import { makeDates } from '../components/things/makeDates'
import { getText } from '../components/things/getText'


// export function makeReq(day1,month1,year1,day2,month2,year2,day3,month3,year3){
export function makeReq() {
  return function(dispatch) {
    var parseString = xml2js.parseString
    // const dates = makeDates(day1,month1,year1,day2,month2,year2,day3,month3,year3);
    // const dates = makeDates(7,'MAY',17,6,'MAY',17,5,'MAY',17);
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
      // console.log('values', values)
      var stnsInFdras = {
        fdra1: [260110],
        fdra2: [260111],
        fdra3: [260112]
      }
      //not using stnsinfdras but could change code to include this sort of thing if more than 1 stn in an fdral. like, in the line 5 area map over stns in the array of the fdra and then assign average value to each fdra for each day
      // getColors = level => {
      //   if
      // }
      var stnFdraMap = new Map()
      stnFdraMap.set(260110, 'fdra1')
                .set(260111, 'fdra2')
                .set(260112, 'fdra3')
      // stnFdraArray = [[260110, 'fdra1'], [260111, 'fdra2'], [260112, 'fdra3']]

      var stnArray = [260110, 260111, 260112]
      var valObj = {}
      var stateObj = {}
      stnArray.map(curr => {
        var currFdra = stnFdraMap.get(curr)
        valObj[curr] = { biArray: []}
        stateObj[currFdra] = { biArray: []}
      })
      // console.log(valObj, 'valObj')

      // console.log('in promise', values)
      var allVals =  values.map((curr,i)=> curr.data)
      // console.log('allVals', allVals)
      allVals.map((currVal,i) => {
        stnArray.map((curStn,ii)=>{
          var currFdra = stnFdraMap.get(curStn)
          // console.log( currVal[curStn], curStn, 'here')
          if(currVal[curStn] !== undefined){
            valObj[curStn]['biArray'].push(currVal[curStn]['bi'])
            stateObj[currFdra]['biArray'].push(currVal[curStn]['bi'])
          }
        })
      })
      var text = "text"
      stnArray.map((currStn,i) => {
        // console.log('currStn', currStn, 'ind', i)
        var avgBi = (valObj[currStn]['biArray'].reduce((curr,prev) => (parseInt(curr) + parseInt(prev)))) / valObj[currStn]['biArray'].length
        var currFdra = stnFdraMap.get(currStn)
        // console.log(currFdra)
        valObj[currStn]['avgBi'] = avgBi
        valObj[currStn]['text'] = getText(avgBi)
        stateObj[currFdra]['avgBi'] = avgBi
        stateObj[currFdra]['text'] = getText(avgBi)
        // console.log(avgBi, 'avgBi', currStn, 'currStn')
      })
      var textget = getText(valObj)
      var text = 'text'
 
      // console.log(stateObj, 'stateObj')
      // console.log(valObj, 'valObj', textget, 'textget')
      var payload = {allVals, stateObj, text}
      console.log(payload, 'payload')
      dispatch({ type: WIMS_DATA, payload })
        

    })
    .catch(function(err){
      console.log(err.message)
    })
    // console.log(axiosArray)
  }

}