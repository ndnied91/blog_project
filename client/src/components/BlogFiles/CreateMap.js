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




class CreateMap extends React.Component{
  constructor(props) {
  super(props);
      this.state = {
      lng: -74 ,
      lat: 40,
      zoom:  9,
      viewport: {}
    };

      this._onClickMap = this._onClickMap.bind(this);
  }

  onSelected = (viewport, item) => {
    // console.log(viewport, item)
      this.setState({ lat: viewport.latitude , lng: viewport.longitude   })
        this.props.getCoords(viewport.latitude  , viewport.longitude )
     }


  _onClickMap(map, evt){
    this.setState({ lat: evt.lngLat.lat , lng: evt.lngLat.lng   })
    this.props.getCoords(this.state.lat , this.state.lng)
}


  render(){

    const showGeoCoder=() =>{
      return(
        <div>
          <Geocoder
              {...mapAccess} onSelected={this.onSelected} viewport={this.state.viewport} hideOnSelect={true}
                queryParams={queryParams}
                />
        </div>
      )
    }



    return(
      <div>

          { this.props.auth ? showGeoCoder() : null }


        <div>
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: '600px',
                  width: '600px'
                }}

                  center={ [ this.state.lng ,  this.state.lat  ] }
                  zoom={[this.state.zoom]}
                  onClick={ this.props.auth ? this._onClickMap : null  }
                  onZoom={ (e)=> this.setState({ zoom:  e.getZoom() })}
                >

                   <Marker
                       coordinates={[ this.state.lng ,  this.state.lat  ]}
                       anchor="bottom"
                       draggable
                       onMoseOver={(e)=> alert(e)}
                     >

                     <Pin/>
                    </Marker>
            </Map>

            </div>
      </div>
    )
  }
}



const mapStateToProps = (state) =>{
  return {auth: state.auth}
}

export default connect( mapStateToProps   )(CreateMap)
