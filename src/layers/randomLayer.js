import Feature from 'ol/Feature.js'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import Point from 'ol/geom/Point.js'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import {fromLonLat} from 'ol/proj.js'
import TileJSON from 'ol/source/TileJSON.js'
import VectorSource from 'ol/source/Vector.js'
import { Icon, Text, Fill, Stroke, Style } from 'ol/style.js'
import GeoJSON from 'ol/format/GeoJSON'

export const randomLayer = new VectorLayer({
  title: 'Dispatch Boundaries',
  visible: false,
  source: new VectorSource({
    url: './fdaas.json', 
    format: new GeoJSON()
  }),  
  wrapX: false,
  minResolution: 0,
  maxResolution: 10000,
  style: (feature, resolution) => {
    const style = new Style({
      fill: new Fill({
        color: 'rgba(244,67,54,0.5)'
      }),
      stroke: new Stroke({
        color: 'rgb(183, 183, 183)', 
        width: 2
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
    return style
  }        
})


