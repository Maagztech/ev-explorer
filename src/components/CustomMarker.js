import React from 'react';
import axios from "axios";
import { InfoWindow, Marker } from "react-google-maps";

class CustomMarker extends React.PureComponent {
    state = {
        isOpen: false,
        isLoading: false,
        savedInfo: this.props.data,
        charging: null
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    onMarkerClickHandler = () => {
        console.log("Clicked on", this.props.data); // this.props.data is station
        if (this.state.isOpen) {
            this.setState({
                isOpen: false
            });
        } else {
            this.setState({
                isLoading: true,
                isOpen: true
            });
            axios.get('https://api.tomtom.com/search/2/chargingAvailability.json?chargingAvailability=' + this.props.data.id + "&key=wJcAL3mTPCGwaRo8UvyFJeePPT9Lx5Sv").then(({ data }) => {
                console.log(data)
                this.setState({
                    charging: data
                });
                this.setState({
                    isLoading: false
                });
            }).catch(() => {
                this.setState({
                    isLoading: false
                });
            });
        }
    };
    renderStatus() {
        if (this.state.isLoading) {
            return "Loading...";
        }
        if (!this.state.savedInfo) {
            return null;
        }

        return <div>
            {
                "Station: " + this.state.savedInfo.poi.name
            }

            {
                this.state.charging.connectors.map((ev, key) =>
                    <div key={key}>
                        Type #{key + 1} {ev.type}
                        <br />
                        <small className='mx-2'>Total: {ev.total}</small><br />
                        <small className='mx-2'>Available: {ev.availability.current.available}</small>
                    </div>)
            }
        </div>
    }

    render() {
        return (
            <Marker position={this.props.position} onClick={this.onMarkerClickHandler}>
                {(this.state.isOpen && <InfoWindow onCloseClick={this.toggle}>
                    <div className="text-dark">
                        {this.renderStatus()}
                    </div>
                </InfoWindow>) || null}
            </Marker>
        );
    }
}

export default CustomMarker;