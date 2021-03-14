import React from 'react'

import ReactMapboxGl, { Layer, Feature, Marker , Popup } from 'react-mapbox-gl';
import Geocoder from 'react-mapbox-gl-geocoder'
import Pin from './Pin'
import './BlogMap.css'


import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';


// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken ='pk.eyJ1IjoiZGFubnk5MSIsImEiOiJja2xhM2Fja3MyYzRlMnZucjlidzJsdHVxIn0.9F9Y7wmH-nZogsGoNTKyyg'


const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});



const mapAccess = {
    mapboxApiAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
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
    console.log(evt.lngLat.lat);
    this.setState({ lat: evt.lngLat.lat , lng: evt.lngLat.lng   })

  }


  render(){


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
                         <i class="fas fa-3x fa-map-marker"></i>
                        </Marker>




                </Map>

    </div>
    )
  }
}


export default BlogMap






//
//
//
// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
//
// import './BlogMap.css';
//
// // mapboxgl.accessToken =
//   // 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
//
//  mapboxgl.accessToken ='pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
//
// const BlogMap = () => {
//   const mapContainerRef = useRef(null);
//
//   const [lng, setLng] = useState(-78.2026);
//   const [lat, setLat] = useState(42.9464);
//   const [zoom, setZoom] = useState(6);
//
//   // Initialize map when component mounts
//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v9',
//       center: [lng, lat],
//       zoom: zoom
//     });
//
//     // Add navigation control (the +/- zoom buttons)
//     map.addControl(new mapboxgl.NavigationControl(), 'top-right');
//
//     map.on('move', () => {
//       setLng(map.getCenter().lng.toFixed(4));
//       setLat(map.getCenter().lat.toFixed(4));
//       setZoom(map.getZoom().toFixed(2));
//     });
//
//
//     map.on('click' , (e)=>{
//       // console.log( [ e.lngLat.lng , e.lngLat.lat] )
//       var marker = new mapboxgl.Marker()
//         // .setLngLat([ e.lngLat.lng , e.lngLat.lat ])
//         .setLngLat([  -80.8002 , 27.3822 ])
//
//           .addTo(map); // add the marker to the map
//     })
//
//
//
//
//
//
//
//
//     // Clean up on unmount
//     // return () => map.remove();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps
//
//   return (
//     <div>
//       <div className='sidebarStyle'>
//         <div>
//           Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//         </div>
//       </div>
//       <div className='map-container' ref={mapContainerRef} />
//     </div>
//   );
// };
//
// export default BlogMap;
