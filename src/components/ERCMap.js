import React, { Component } from 'react'
import { connect } from 'react-redux'



import Map from 'ol/Map.js'
import View from 'ol/View.js'
// import {inherits} from 'ol/util.js';
// import { defaults as defaultControls, OverviewMap, Control} from 'ol/control.js'
import { Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
// import BaseLayer from 'ol/layer/Base';

// import { fromLonLat } from 'ol/proj.js'
import Stamen from 'ol/source/Stamen'
// import TileJSON from 'ol/source/TileJSON.js'
import  VectorSource  from 'ol/source/Vector.js'
// import { scaledSource, scaledLayer } from './layers/scaledLayer'
import { Icon, Text, Fill, Stroke, Style } from 'ol/style.js'
import GeoJSON from 'ol/format/GeoJSON'
// import Collection from 'ol/Collection'
import fdaaLayer from '../layers/fdaaLayer.js'
import fdaaLayerSimple from '../layers/fdaaSimple.js'

import { makeReq } from '../actions' 

// import { selectRaws, getDispatch, rawsNames, getClusters, idMap, getMonthlyErcData, getKMeans, getPCAVals } from '../actions' 

const mapKey = 'pk.eyJ1IjoicnRpcHBldHRzIiwiYSI6ImNpb2huaWtuNDAwNnF1NW0xNWFhYXJiM20ifQ.-c3uBsqfQoJgd3gG4TbNLw#0/0/0/0' 


export default class ERCMap extends Component {
  state = { stateObj: 'first state' }

  handleResizedScreen = () => setTimeout(() => {
    this._map.getView().fit([ -13385849.855545742, 4164163.9360093023, -12120670.513975333, 5733155.322681262 ], (this._map.getSize()), {padding: [10, 20, 50, 20], constrainResolution: false})
  }, 200)

  componentDidMount() {
    // window.addEventListener("resize", this.handleResizedScreen)
    // this.props.makeReq()
    // console.log('mount this', this.props.data)

      /**
       * @constructor
       * @extends {module:ol/control/Control~Control}
       * @param {Object=} opt_options Control options.
       */
    
    
    const flickrStyle = feature => {
      var zone = 'fdra' + feature.get('Fire_Dange')
      var dataObj = this.props.data
      if(dataObj[zone]){
        var dynamicColor = dataObj[zone]['layerColor']
        // console.log('dynamicColor', dynamicColor)
      }
      else{
        // console.log('no data', zone)
        var dynamicColor = 'grey'
      }
      // console.log('zone', zone)
      // console.log('flickrStyle this', this)
      var style = new  Style({
        stroke: new Stroke({
          color: '#f00',
          width: 1
        }),
        fill: new Fill({
          color: dynamicColor
        }), 
        text: new Text({
          font: '18px Calibri,sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({
            color: 'white', width: 3
          }),
          text: zone

        })
      })
      return [style];
    }

    var newMap = new Map({
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'terrain'
          })
        }),          
        new TileLayer({
          source: new Stamen({
            layer: 'terrain-labels'
          })
        }),
        new VectorLayer({
            renderMode: 'image',
            source: new VectorSource({
              url: './FDAAs4326.json', 
              format: new GeoJSON()
            }),
            style: flickrStyle
          })
      ],
      target: document.getElementById('map'),
      view: new View({
        center: [-12611222.999392, 4895944.535722],
        zoom: 8.5,
      })
    })
    // console.log('this ercmap mount', this.props)
    this._map = newMap
    // this._map.getView().fit([ -13385849.855545742, 4164163.9360093023, -12120670.513975333, 5733155.322681262 ], (this._map.getSize()), {padding: [10, 20, 50, 20], constrainResolution: false})
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props){
    //   this.setState({ stateObj: this.props.stateObj })
    //   // this.setState({ stateObj: 'newstate' })
      // console.log('dont match', this.props, prevProps)
    }
    // console.log('component did mout', this)
  }
  // componentWillUnmount = () => window.removeEventListener("resize", this.handleResizedScreen)
  render = () => {
    return <div className='card h-100 border-0' id="map"></div>
  }

}





// export default connect(reduxState => reduxState, null)( ERCMap )
// export default ERCMap