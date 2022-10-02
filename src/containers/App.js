import React, { Component, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import MyMapComponent from '../components/MyMapComponent'
import Search from '../components/Search';

const App = () => {
    const [City, setCity] = useState("");
    const [Area, setArea] = useState("");
    const [stations, setstations] = useState([])
    
    useEffect(() => {
        const endPoint = "https://api.tomtom.com/search/2/search/EV%20Charging.json?lat=40.7127764&lon=-74.0059746&key=H4Xi5KJCFuXARU2yZGnIGh8GIuwPVr2i&limit=100";
        axios
            .get(endPoint).then(({ data }) => {
                setstations(data.results)
            })
            .catch(error => {
                console.log("ERROR: " + error)
            })
    }, [])



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
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item crsr" onClick={e => setArea(e.target.innerText)}>Explore Whole city</a></li>
                    </ul>
                </div>
            </div>
            <button class="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Enable body scrolling</button>
            <div class="offcanvas offcanvas-start text-dark bg-light" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <p>Try scrolling the rest of the page to see this option in action.</p>
                </div>
            </div>
            <main className='col'>
                <MyMapComponent
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnRKbnDfJAymwgwlktMhqz271Zms1jbjM"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={[]}
                />
            </main>
        </>
    );

}

export default App;