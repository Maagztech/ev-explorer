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
    const [Divisons, setDivisons] = useState([]);
    const [Number, setNumber] = useState(5);
    useEffect(() => {
        if (City) {
            setL(1);
            if (l == 0)
                document.getElementById("offc").click();
        }
        const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${Area ? Area : "New York"},${City}.json?access_token=pk.eyJ1IjoiMjBlYzMwMTQiLCJhIjoiY2w4cWVxZWpwMDBtcTN2bnVlaTFha3JnMyJ9.DbGM6Pj7J_B8UnOFaJDzCQ&limit=1`;
        axios
            .get(mapbox).then(({ data }) => {
                // console.log(data)
                setLat(data.features[0].center[1]);
                setLon(data.features[0].center[0]);
                const tomtom = `https://api.tomtom.com/search/2/search/EV%20Charging.json?lat=${data.features[0].center[1]}&lon=${data.features[0].center[0]}&key=H4Xi5KJCFuXARU2yZGnIGh8GIuwPVr2i&limit=${City ? Number : "1"}`;
                axios
                    .get(tomtom).then((res) => {
                        console.log(res.data.results[0].chargingPark.connectors)
                        setstations(res.data.results)
                    })
                    .catch(error => {
                        console.log("ERROR: " + error)
                    })
            })
            .catch(error => {
                console.log("ERROR: " + error)
            })
    }, [City, Area])

    const Zones = [
        {
            city: "Mumbai,India",
            divison: ["Mira Bhayandar", "Kandiveli", "Goregaon", "Andheri", "Dadar", "Chembur", "Mulund West", "Thane"],
            number: 6
        },
        {
            city: "New York,USA",
            divison: ["Lakewood", "Ocean City", "Brighton Beach", "White Plains", "Manhattan", "Queens", "Farmingdale", "Greenport", "Riverhead", "Bridgehampton", "Bronx"],
            number: 30
        },
        {
            city: "Delhi,India",
            divison: ["Bhiwadi", "Ghaziabad", "New Delhi", "Gurugram", "Faridabad", "Rohini", "Greater Noida", "Meerut", "Chandpur", "Sonipat"],
            number: 10
        },

    ]

    return (
        <>
            <div className="my-3 mx-auto row" style={{ maxWidth: 800 }}>
                <h1 htmlFor="inputPassword" className='fs-4 fw-bold my-1 col'>Explore Chargers</h1>
                <div className="input-group col my-1 text-light">
                    <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{City ? City : "Select City"}</button>
                    <ul className="dropdown-menu">
                        {Zones.map((citi) => (
                            <li><p className="dropdown-item crsr" onClick={e => {
                                setCity(citi.city)
                                setDivisons(citi.divison)
                                setNumber(citi.number)
                            }}>{citi.city}</p></li>
                        ))}
                    </ul>
                    <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{Area ? Area : "Select Zone"}</button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        {Divisons.map((divison) => (
                            <li><p className="dropdown-item crsr" onClick={e => {
                                setArea(divison)
                            }}>{divison}</p></li>
                        ))}
                    </ul>
                </div>
            </div>
            <button className="btn btn-primary d-none" id='offc' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"></button>
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
                    {/* <button
                        type="button"
                        className={`btn-close text-reset`}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    /> */}
                </div>
                <hr />
                <div className="offcanvas-body">
                    <div className="list-group">
                        {stations.map((charger, index) => {
                            return (
                                <div className="w-100" key={index}>
                                    <h6 className="mb-1 fw-bold text-dark"><i className="fas fa-charging-station"></i> {charger.poi.name}</h6>
                                    <div className='mx-3 mb-2'>
                                        <small className='text-dark text-muted'><i className="fas fa-map-marker-alt"></i>{' '}
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
                                            {charger.chargingPark ?
                                                charger.chargingPark.connectors.map((locate, i) => {
                                                    return (
                                                        <div className='shadow p-3 mb-5 bg-body rounded' key={i}>
                                                            <small className='fw-bold'>{locate.connectorType}</small><br />
                                                            <small>Power-{locate.ratedPowerKW}KW</small><br />
                                                            <small>{locate.voltageV}V,{locate.currentA}A,{locate.currentType}</small>
                                                        </div>
                                                    )
                                                }) : ""
                                            }
                                        </div>
                                    </div>
                                    {/* <p className="mb-1 text-muted">{charger.desc}</p> */}
                                </div>

                            )
                        })}
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