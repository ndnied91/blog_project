import React from 'react'

import ReactMapboxGl, { Layer, Feature, Marker , Popup } from 'react-mapbox-gl';
import Geocoder from 'react-mapbox-gl-geocoder'
import {connect} from 'react-redux'
import Pin from './Pin'
import './BlogMap.css'


import { updateBlog ,fetchIndividualBlog } from '../../actions'

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
      lng: -74 ,
      lat: 40,
      zoom:  9,
      viewport: {}
    };

      this._onClickMap = this._onClickMap.bind(this);
  }






  onSelected = (viewport, item) => {
      this.setState({ lat: viewport.latitude , lng: viewport.longitude   })
     }



  _onClickMap(map, evt){
    this.setState({ lat: evt.lngLat.lat , lng: evt.lngLat.lng   })

    let updatedBlog = {
                      _id:this.props.currentBlog._id,
                      body: this.props.currentBlog.body,
                      created: this.props.currentBlog.created,
                      hitCount :this.props.currentBlog.hitCount,
                      image: this.props.currentBlog.image,
                      state: this.props.currentBlog.state,
                      summary: this.props.currentBlog.summary,
                      tags: this.props.currentBlog.tags,
                      timestamp: this.props.currentBlog.timestamp,
                      title: this.props.currentBlog.title,
                      coords : {lat:  evt.lngLat.lat, lng: evt.lngLat.lng}
                      }
                      this.props.updateBlog(updatedBlog)
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
    const showCoords = () =>{
        if(this.props.currentBlog.coords){
          return(
            <div> Coords : <br/> <strong> Lat: </strong> {this.props.currentBlog.coords.lat }   <strong> Lng: </strong>  {this.props.currentBlog.coords.lng }  </div>
          )
        }
        else return null

    }

    const update =  ( lat, lng )=>{

      let updatedBlog = {
                        _id:this.props.currentBlog._id,
                        body: this.props.currentBlog.body,
                        created: this.props.currentBlog.created,
                        hitCount :this.props.currentBlog.hitCount,
                        image: this.props.currentBlog.image,
                        state: this.props.currentBlog.state,
                        summary: this.props.currentBlog.summary,
                        tags: this.props.currentBlog.tags,
                        timestamp: this.props.currentBlog.timestamp,
                        title: this.props.currentBlog.title,
                        coords : {lat: lat, lng: lng}
                        }
                        this.props.updateBlog(updatedBlog)
                      }






const renderMap=()=>{
  if(this.props.currentBlog){
    return(
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '600px',
          width: '600px'
        }}



          center={ [ this.state.lng ,  this.props.currentBlog.coords.lat  ||null ] }
          zoom={[this.state.zoom]}
          onClick={ this.props.auth ? this._onClickMap : null  }
          onZoom={ (e)=> this.setState({ zoom:  e.getZoom() })}
        >

           <Marker
            // coordinates={ [ this.props.currentBlog.coords.lng ,  this.props.currentBlog.coords.lat ]  }
               coordinates={[ this.props.currentBlog.coords.lng || this.state.lng ,  this.props.currentBlog.coords.lat  || this.state.lat  ]}
               anchor="bottom"
               draggable
               onMoseOver={(e)=> alert(e)}
             >

             <Pin/>
            </Marker>
    </Map>
    )
  }
  else
    return null

}






    // const renderMap=()=>{
    //   if(this.props.currentBlog){
    //     return(
    //
    //         <div>
    //           {showCoords()}
    //
    //             <Map
    //               style="mapbox://styles/mapbox/streets-v9"
    //               containerStyle={{
    //                 height: '600px',
    //                 width: '600px'
    //               }}
    //
    //
    //                 center={ [ this.props.currentBlog.coords ? this.props.currentBlog.coords.lng :  this.state.lng ,  this.props.currentBlog.coords ? this.props.currentBlog.coords.lat :  this.state.lat  ] }
    //                 zoom={[this.state.zoom]}
    //                 onClick={ this.props.auth ? this._onClickMap : null  }
    //                 onZoom={ (e)=> this.setState({ zoom:  e.getZoom() })}
    //               >
    //
    //                  <Marker
    //                      coordinates={ [ this.props.currentBlog.coords ? this.props.currentBlog.coords.lng :  this.state.lng ,  this.props.currentBlog.coords ?this.props.currentBlog.coords.lat :  this.state.lat  ] }
    //                      anchor="bottom"
    //                      draggable
    //                      onMoseOver={(e)=> alert(e)}
    //                    >
    //
    //                    <Pin/>
    //                   </Marker>
    //           </Map>
    //
    //     </div>
    //     )
    //   }
    //   else
    //     return null
    //
    // }










  return(




      <div>

                  { this.props.auth ? showGeoCoder() : null }







                  {renderMap()}


                { this.props.auth ?   <button onClick={ ()=> update( this.state.lat , this.state.lng ) }> Update Map </button> : null }

    </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return {auth: state.auth  , currentBlog: state.currentBlog}
}

export default connect( mapStateToProps , {updateBlog}  )(BlogMap)
