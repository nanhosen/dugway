import React, { Component } from 'react'
import { connect } from 'react-redux'



import Map from 'ol/Map.js'
import View from 'ol/View.js'
// import {inherits} from 'ol/util.js';
// import { defaults as defaultControls, OverviewMap, Control} from 'ol/control.js'
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer.js'
// import BaseLayer from 'ol/layer/Base';

// import { fromLonLat } from 'ol/proj.js'
import Stamen from 'ol/source/Stamen'
// import TileJSON from 'ol/source/TileJSON.js'
// import VectorSource from 'ol/source/Vector.js'
// import { scaledSource, scaledLayer } from './layers/scaledLayer'
// import {Icon, Text, Fill, Stroke, Style } from 'ol/style.js'
// import GeoJSON from 'ol/format/GeoJSON'
// import Collection from 'ol/Collection'
import fdaaLayer from '../layers/fdaaLayer.js'

import { makeReq } from '../actions' 

// import { selectRaws, getDispatch, rawsNames, getClusters, idMap, getMonthlyErcData, getKMeans, getPCAVals } from '../actions' 

const mapKey = 'pk.eyJ1IjoicnRpcHBldHRzIiwiYSI6ImNpb2huaWtuNDAwNnF1NW0xNWFhYXJiM20ifQ.-c3uBsqfQoJgd3gG4TbNLw#0/0/0/0' 


class ERCMap extends Component {
  state = { stateObj: 'first state' }

  handleResizedScreen = () => setTimeout(() => {
    this._map.getView().fit([ -13385849.855545742, 4164163.9360093023, -12120670.513975333, 5733155.322681262 ], (this._map.getSize()), {padding: [10, 20, 50, 20], constrainResolution: false})
  }, 200)

  componentDidMount() {
    window.addEventListener("resize", this.handleResizedScreen)
    this.props.makeReq()
    console.log('mount this', this.props)

      /**
       * @constructor
       * @extends {module:ol/control/Control~Control}
       * @param {Object=} opt_options Control options.
       */
      
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
        new LayerGroup({
          title: 'Overlays',
          layers: [
            fdaaLayer(this.props)
          ]
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
    if (prevProps.wimsData !== this.props.wimsData){
    //   this.setState({ stateObj: this.props.stateObj })
    //   // this.setState({ stateObj: 'newstate' })
      console.log('dont match', this.props, prevProps)
    }
    // console.log('component did mout', this)
  }
  // componentWillUnmount = () => window.removeEventListener("resize", this.handleResizedScreen)
  render = () => {
    // console.log('ercmap render', this)
    return <div className='card h-100 border-0' id="map"></div>
  }

}





export default connect(reduxState => reduxState, { makeReq })( ERCMap )
// export default ERCMap