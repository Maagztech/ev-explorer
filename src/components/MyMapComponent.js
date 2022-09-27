import React from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import CustomMarker from "./CustomMarker";

const MyMapComponent = withScriptjs(withGoogleMap(({markers}) =>
    <GoogleMap
        defaultZoom={6}
        defaultCenter={{lat: 48.157469, lng: 17.12937}}
    >
        {markers.map((station, key) => <CustomMarker data={station}
                                                     position={{lat: station.position.lat, lng: station.position.lon}}
                                                     key={key}/>)}
    </GoogleMap>
))

export default MyMapComponent;
