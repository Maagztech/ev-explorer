import React, { useEffect, useState } from 'react';
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

        const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${Area ? Area : "New York"},${City}.json?access_token=pk.eyJ1IjoiMjBlYzMwMTQiLCJhIjoiY2w4cWVxZWpwMDBtcTN2bnVlaTFha3JnMyJ9.DbGM6Pj7J_B8UnOFaJDzCQ&limit=1`;
        axios
            .get(mapbox).then(({ data }) => {
                console.log(data)
                setLat(data.features[0].center[1]);
                setLon(data.features[0].center[0]);
                const tomtom = `https://api.tomtom.com/search/2/search/EV%20Charging.json?lat=${data.features[0].center[1]}&lon=${data.features[0].center[0]}&key=H4Xi5KJCFuXARU2yZGnIGh8GIuwPVr2i&limit=${City ? "50" : "1"}`;
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
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Staten Island</a></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Brooklyn</a></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Manhattan</a></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Queens</a></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Bronx</a></li>
                    </ul>
                </div>
            </div>
            <button class="btn btn-primary d-none" id='offc' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"></button>
            <div
                className="offcanvas offcanvas-start"
                data-bs-backdrop="false"
                tabIndex={-1}
                id="offcanvasWithBothOptions"
                aria-labelledby="offcanvasWithBothOptionsLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-dark" id="offcanvasWithBothOptionsLabel">
                        <i className="fas fa-search-location"></i> {Area},{City}
                    </h5>
                    <button
                        type="button"
                        className={`btn-close text-reset`}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <hr />
                <div className="offcanvas-body">
                    <div className="list-group">
                        {stations.length > 0 && stations.map((charger) => (

                            <div className="w-100">
                                <h6 className="mb-1 fw-bold text-dark"><i className="fas fa-charging-station"></i> {charger.poi.name}</h6>
                                <div className='mx-3 mb-2'>
                                    <small className='text-dark text-muted'><i className="fas fa-map-pin"></i>{' '}
                                        {charger.address.streetNumber},
                                        {charger.address.streetName},
                                        {charger.address.municipalitySubdivision},
                                        {charger.address.municipality}
                                    </small><br />
                                    <small className='text-dark text-muted'>
                                        <i className="fas fa-globe-europe"></i>{' '}
                                        {charger.poi.url}
                                    </small><br />
                                    <small className='text-dark text-muted'>
                                        <i className="fas fa-mobile"></i>{' '}
                                        {charger.poi.phone}
                                    </small><br />
                                    <div className='text-dark mx-3 d-flex' style={{ overflowX: "scroll" }}>
                                        {
                                            charger.chargingPark.connectors.map((locate) => (
                                                <div className='shadow p-3 mb-3 mr-2 bg-body rounded'>
                                                    <small className='fw-bold'>{locate.connectorType}</small><br />
                                                    <small>Power-{locate.ratedPowerKW}KW</small><br />
                                                    <small>{locate.voltageV}V,{locate.currentA}A,{locate.currentType}</small><br />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/* <p className="mb-1 text-muted">{charger.desc}</p> */}
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <main>
                {lat &&
                    <MyMapComponent
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnRKbnDfJAymwgwlktMhqz271Zms1jbjM"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        markers={stations}
                        lat={lat}
                        lon={lon}
                    />
                }
            </main>
        </>
    );

}

export default App;