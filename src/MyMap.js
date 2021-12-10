import React, { useState } from 'react';
import ReactMapGL from "react-map-gl";
import { Marker } from 'react-map-gl'
import pin from './assets/icons8-location-48.png'



const REACT_APP_MAPBOX_TOKEN="pk.eyJ1IjoiZ29idWJiYSIsImEiOiJja3d1eTFrdmwxN2pqMnVzZWM4Y3J5bTY3In0.4zdRkgdsRUP2eOjxjceZoA"

export default function MyMap({directions, personMarker, viewport, setViewport}) {

 
 const [selectedPerson, setSelectedPerson] = useState(null)

 const {latitude: latitude = 40.318460, longitude: longitude = -111.720440} = personMarker

 
return (
  <ReactMapGL 
  {...viewport}
  className='map'
  mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
  mapStyle="mapbox://styles/gobubba/ckwv4adko5luq14mnmlwx3ht0"
  onViewportChange={(viewport) => {
      setViewport(viewport);
  }}
  >
    <Marker key={latitude} latitude={latitude} longitude={longitude}>
      <button onClick={(e) => {
        e.preventDefault()
        setSelectedPerson()
      }} class='marker-button'>
        <img className='marker-button' src={pin} alt='pin'/>
      </button>
    </Marker> 
  </ReactMapGL>
)
}