import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MyMapComponent from '../components/MyMapComponent'

class App extends Component {
    state = {
        stations: []
    };

    componentDidMount() {
        this.getStations();
    }

    getStations = () => {
        const endPoint = "https://api.tomtom.com/search/2/search/EV%20Charging.json?lat=19.0760&lon=72.8777&key=H4Xi5KJCFuXARU2yZGnIGh8GIuwPVr2i&limit=100";
        axios
            .get(endPoint).then(({ data }) => {
                this.setState({ stations: data.results })
            })
            .catch(error => {
                console.log("ERROR: " + error)
            })
    };

    render() {
        console.log(this.state.stations);
        return (
            <main>
                <MyMapComponent
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnRKbnDfJAymwgwlktMhqz271Zms1jbjM"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={this.state.stations}
                />
            </main>
        );
    }
}

export default App;