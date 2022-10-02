import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import CustomMarker from "./CustomMarker";

const MyMapComponent = withScriptjs(withGoogleMap(({ markers }) =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 40.712776, lng: -74.005974 }}
    >
        {markers.map((station, key) => <CustomMarker data={station}
            position={{ lat: [40.712776], lng: [-74.005974] }}
            key={key} />)}
    </GoogleMap>
))

export default MyMapComponent;
