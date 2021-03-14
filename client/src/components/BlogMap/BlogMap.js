import React from 'react'

import ReactMapboxGl, { Layer, Feature, Marker , Popup } from 'react-mapbox-gl';
import Geocoder from 'react-mapbox-gl-geocoder'
import Pin from './Pin'
import './BlogMap.css'

import keys from '../config/keys'



import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// @ts-ignore
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


class BlogMap extends React.Component{
  constructor(props) {
  super(props);
      this.state = {
      lng: -74.5,
      lat: 40,
      zoom: 9,
      viewport: {}
    };

      this._onClickMap = this._onClickMap.bind(this);
  }


  onSelected = (viewport, item) => {
      this.setState({ lat: viewport.latitude , lng: viewport.longitude   })

     }



  _onClickMap(map, evt){
    this.setState({ lat: evt.lngLat.lat , lng: evt.lngLat.lng   })

  }


  render(){
    
    console.log(keys.mapboxApiAccessToken)


    function onDragEnd() {

    }


    return(
      <div>


                  <div>
                    <Geocoder
                        {...mapAccess} onSelected={this.onSelected} viewport={this.state.viewport} hideOnSelect={true}
                          queryParams={queryParams}
                          />
                  </div>


                  <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                      height: '600px',
                      width: '600px'
                    }}

                      center={[this.state.lng, this.state.lat]}
                      zoom={[this.state.zoom]}
                      onClick={this._onClickMap}
                      onZoom={ (e)=> this.setState({ zoom:  e.getZoom() })}
                    >




                       <Marker
                           coordinates={[ this.state.lng, this.state.lat ]}
                           anchor="bottom"
                           draggable
                           onMoseOver={(e)=> alert(e)}
                         >

                         <Pin/>
                        </Marker>




                </Map>

    </div>
    )
  }
}


export default BlogMap
