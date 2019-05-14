import Feature from 'ol/Feature.js'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import Point from 'ol/geom/Point.js'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import {fromLonLat} from 'ol/proj.js'
import TileJSON from 'ol/source/TileJSON.js'
import VectorSource from 'ol/source/Vector.js'
import {Circle as CircleStyle, Icon, Text, Fill, Stroke, Style } from 'ol/style.js'
import GeoJSON from 'ol/format/GeoJSON'
import raws from '../../data/raws.json'

var iconStyle = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: 'white'
    }),
    stroke: new Stroke({
      color: 'black'
    })
  }),
});

var vectorSource = new VectorSource({
  features: (new GeoJSON()).readFeatures(raws, {
    dataProjection : 'EPSG:4326', 
    featureProjection: 'EPSG:3857'
  })  
});

var createTextStyle = function(feature, resolution) {
  return new Text({
    textAlign: 'end',
    text: resolution < 2000 ? feature.get('name') : '',
    stroke: new Stroke({color: 'white', width: 2}),
    offsetX: 8
  });
};

var rawsStyleFunction = function(feature,resolution){
  var style = new Style({
        image: new CircleStyle({
            radius: 8,
            fill: new Fill({
              color: 'white'
            }),
            stroke: new Stroke({
              color: 'black'
            })
          }),
        text: createTextStyle(feature,resolution)
      })
  return style
}

const RawsLayer = new VectorLayer({
  source: vectorSource, 
  wrapX: false,
  minResolution: 0,
  maxResolution: 2000,
  visible: true,
  style: rawsStyleFunction
});

export default RawsLayer