import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import CustomMarker from "./CustomMarker";

const MyMapComponent = withScriptjs(withGoogleMap(({ markers, lat, lon }) =>
    < GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: lat, lng: lon }}
    >

        {
            markers.map((station, key) => <CustomMarker data={station}
                position={{ lat: station.position.lat, lng: station.position.lon }}
                key={key} />)
        }
    </GoogleMap >
))

export default MyMapComponent;
