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

var styleFunction = function(feature, resolution){
  var currFdra = feature.get('Fire_Dange')
}

const fdaaLayer = fdraLevel => new VectorLayer({
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
    console.log('fdraLayer rendered and got this: ', fdraLevel)
    const { status } = fdraLevel[zoneId] || ''
    const color = {
      'Low': '#ffc107',
      'Moderate': '#28a645',
      'Extreme': '#dc3545',
    }[status] || 'rgba(211,17,78,0.6)'
    // const color = 'rgba(211,17,78,0.6)'
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

// const mapStateToProps = state => {
//   const { wimsData } = state
//   console.log(wimsData, 'wimsDataLayer')
//   return { wimsData }
// }
// export default connect(mapStateToProps, null)(fdaaLayer)
export default fdaaLayer


