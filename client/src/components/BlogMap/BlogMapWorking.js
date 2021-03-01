import React from 'react'

import ReactMapboxGl, { Layer, Feature, Marker , Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Pin from './Pin'

mapboxgl.accessToken ='pk.eyJ1IjoiZGFubnk5MSIsImEiOiJja2xhM2Fja3MyYzRlMnZucjlidzJsdHVxIn0.9F9Y7wmH-nZogsGoNTKyyg'


const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});


class BlogMap extends React.Component{
  constructor(props) {
  super(props);
      this.state = {
      lng: -74.5,
      lat: 40,
      zoom: 9
    };

      this._onClickMap = this._onClickMap.bind(this);
  }



  _onClickMap(map, evt){
    console.log(evt.lngLat.lat);
    this.setState({ lat: evt.lngLat.lat , lng: evt.lngLat.lng   })

  }


  render(){



    // const onMarkerDragStart = useCallback(event => {
    //     logEvents(_events => ({..._events, onDragStart: event.lngLat}));
    //   }, []);
    //
    //   const onMarkerDrag = useCallback(event => {
    //     logEvents(_events => ({..._events, onDrag: event.lngLat}));
    //   }, []);
    //
    //   const onMarkerDragEnd = useCallback(event => {
    //     logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
    //     setMarker({
    //       longitude: event.lngLat[0],
    //       latitude: event.lngLat[1]
    //     });
    //   }, []);




      // const onMarkerDragStart = useCallback(event => {
      //     logEvents(_events => ({..._events, onDragStart: event.lngLat}));
      //   }, []);


    // const  onMarkerDragStart = (event) => {
    //      const {latitude, longitude} = event;
    //      // Any functionality for when a drag starts
    //    }
    //
    //    onMarkerDragEnd = (event) => {
    //      const {latitude, longitude} = event;
    //      // Any functionality for when a drag ends
    //      this.setState({latitude, longitude});
    //    }
    //
    //    onMarkerDrag = (event) => {
    //      const {latitude, longitude} = event;
    //      // Any functionality when marker moves while being dragged
    //    }



    function onDragEnd() {

    }


    return(
      <div>
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{
                height: '600px',
                width: '600px'
              }}
                center={[this.state.lng, this.state.lat]}
                zoom={[this.state.zoom]}
                onClick={this._onClickMap}
              >


                 <Marker
                     coordinates={[ this.state.lng, this.state.lat ]}
                     anchor="bottom"
                     draggable
                     onMoseOver={(e)=> alert(e)}
                   >
                   <i class="fas fa-3x fa-map-marker"></i>
                  </Marker>



         {/*


           <Popup
             coordinates={[ this.state.lng, this.state.lat ]}
             offset={{
               'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
             }}>
             <div>Lat: {this.state.lat} Lng: {this.state.lng}</div>
           </Popup>




              <Marker
                coordinates={[ this.state.lng, this.state.lat ]}
                anchor="bottom">
                <h1>You are here</h1>
                </Marker>


               <Popup
                  coordinates={[ this.state.lng, this.state.lat ]}
                    offset={{
                        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                      }}>
                      <p>You are here</p>
                </Popup>
                */}



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
//     map.on('click' , (e)=> console.log(e))
//
//
//     // Clean up on unmount
//     return () => map.remove();
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
