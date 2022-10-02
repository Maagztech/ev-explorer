import React, { Component, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import MyMapComponent from '../components/MyMapComponent';

const App = () => {
    const [City, setCity] = useState("");
    const [Area, setArea] = useState("");
    const [stations, setstations] = useState([])
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [l, setL] = useState(0);
    useEffect(() => {
        if (City) {
            setL(1);
            if (l == 0)
                document.getElementById("offc").click();
        }

        const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${Area ? Area : "Los angeles"},${City}.json?access_token=pk.eyJ1IjoiMjBlYzMwMTQiLCJhIjoiY2w4cWVxZWpwMDBtcTN2bnVlaTFha3JnMyJ9.DbGM6Pj7J_B8UnOFaJDzCQ&limit=1`;
        axios
            .get(mapbox).then(({ data }) => {
                console.log(data)
                setLat(data.features[0].center[1]);
                setLon(data.features[0].center[0]);
                const tomtom = "https://api.tomtom.com/search/2/search/EV%20Charging.json?lat=" + data.features[0].center[1] + "&lon=" + data.features[0].center[0] + "&key=H4Xi5KJCFuXARU2yZGnIGh8GIuwPVr2i&limit=100";
                axios
                    .get(tomtom).then(({ data }) => {
                        console.log(data)
                        setstations(data.results)
                    })
                    .catch(error => {
                        console.log("ERROR: " + error)
                    })
            })
            .catch(error => {
                console.log("ERROR: " + error)
            })
    }, [City, Area])



    return (
        <>

            <div className="my-3 mx-auto row" style={{ maxWidth: 800 }}>
                <h1 for="inputPassword" className='fs-4 fw-bold my-1 col'>Explore Chargers</h1>
                <div class="input-group col my-1 text-light">
                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{City ? City : "Select City"}</button>
                    <ul class="dropdown-menu">
                        <li><p class="dropdown-item crsr" onClick={e => setCity(e.target.innerText)}>New York, Ny, USA</p></li>
                    </ul>
                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{Area ? Area : "Select Zone"}</button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Zone1-Staten Island</a></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Zone2-Brooklyn</a></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Zone3-Manhattan</a></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Zone4-Queens</a></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Zone5-Bronx</a></li>
                    </ul>
                </div>
            </div>
            <button class="btn btn-primary d-none" id='offc' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"></button>
            <div class="offcanvas offcanvas-start text-dark bg-light" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Chargers In the location</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul>
                        {stations.map((charger) => (
                            <li key={charger.id}>
                                {charger.poi.name}
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
            <main className='col'>
                <MyMapComponent
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnRKbnDfJAymwgwlktMhqz271Zms1jbjM"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={stations}
                />
            </main>
        </>
    );

}

export default App;