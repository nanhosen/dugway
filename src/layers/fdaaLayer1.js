// import { connect } from 'react-redux'
// import Feature from 'ol/Feature.js'
// import Map from 'ol/Map.js'
// import View from 'ol/View.js'
// import Point from 'ol/geom/Point.js'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
// import {fromLonLat} from 'ol/proj.js'
// import TileJSON from 'ol/source/TileJSON.js'
import VectorSource from 'ol/source/Vector.js'
import { Icon, Text, Fill, Stroke, Style } from 'ol/style.js'
import GeoJSON from 'ol/format/GeoJSON'


export function fdaaLayer1(fdraLevel) {
  return new VectorLayer({
    title: 'Dispatch Boundaries',
    visible: true,
    source: new VectorSource({
      url: './FDAAs4326.json', 
      format: new GeoJSON()
    }),  
    wrapX: false,
    minResolution: 0,
    maxResolution: 10000,
    style: (feature, resolution) => {
      console.log('in fdaaLayer1 style function')
      const style = new Style({
        fill: new Fill({
          color: 'rgba(111,143,174,0.2)'
        }),
        stroke: new Stroke({
          color: 'rgba(7,7,7,0.8)', 
          width: 1
        }),
        text: new Text({
          font: '15px Montserrat, sans-serif',
          fill: new Fill({
            color: '#000'
          }),
          stroke: new Stroke({
            color: 'rgba(238, 238, 238, 1)',
            width: 3
          })
        })
      })
      const zone = feature.get('Fire_Dange')
      var name = 'FDRA ' + zone
      var zoneId = 'fdra' + zone
      // console.log('zone', name)
      // console.log('fdraLayer rendered and got this: ', fdraLevel)
      if(fdraLevel[zoneId]!==undefined){
        // console.log('fdraLevel[zoneId]: ', fdraLevel[zoneId], zoneId, fdraLevel)
        var statuss = fdraLevel[zoneId]

      }
      else {
        var statuss = undefined
      }
      
      // const { status } = fdraLevel['wimsData']['stateObj'] || ''
      // console.log('status', zoneId, statuss)
      // if(statuss !== undefined){
      //   console.log(statuss['text']['level'])
      //   var lev = statuss['text']['level']
      // }
      // else{
      //   console.log('statuss is undefined')
      //   var lev = ''
      // }
    
      // const colorr = {
      //   'Low': '#35d723',
      //   'Moderate': '#f2bb15',
      //   'Extreme': '#f21515',
      // }[lev] || 'rgba(178,171,171,0.6)'
      // console.log('colorr',zoneId, colorr)
      const color = 'rgba(211,17,78,0.6)'
      style.getFill().setColor(color)
      // style.getText().setText(resolution < 5000 ? name : '');
      return style
    }        
    // projection: 'EPSG:3857',
    // source: vectorSource,
    // name: 'rawsPoints',
    // visible: true,
    // // style: styleFunction
    // style: iconStyle
  })
}

// const mapStateToProps = state => {
//   const { wimsData } = state
//   console.log(wimsData, 'wimsDataLayer')
//   return { wimsData }
// }
// export default connect(mapStateToProps, null)(fdaaLayer1)
// export default fdaaLayer1

