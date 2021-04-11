import React from 'react'

import ReactMapboxGl, { Layer, Feature, Marker , Popup } from 'react-mapbox-gl';
import Geocoder from 'react-mapbox-gl-geocoder'
import Pin from '../BlogMap/Pin'

import {connect} from 'react-redux'
import keys from '../config/keys'

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';


// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken= keys.mapboxApiAccessToken


const Map = ReactMapboxGl({
  accessToken: keys.mapboxApiAccessToken
});



const mapAccess = {
    mapboxApiAccessToken: keys.mapboxApiAccessToken
}


const queryParams = {
    country: 'us'
}




class InputText extends React.Component{



render(){
  return <div>  HI </div>
} }




export default InputText
