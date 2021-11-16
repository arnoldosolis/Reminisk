import React from 'react';
import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, StandaloneSearchBox, Marker, InfoWindow, } from '@react-google-maps/api';
import { MAPS_API_KEY } from '../../config'
import MapStyles from './MapStyles';
import './Search.css'
import { getDetails } from 'use-places-autocomplete';


const libraries = ["places"];

const mapContainerStyle = {
    width: '53vw',
    height: '53vh',
}

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false,

};

function GoogleMapComponent({ center, searchKeyword, setMarkers, markers,
    statusMarker, selectMarker, setName, setAddress, setPhone, setTimes,
    facilityName, facilityAddress, facilityPhone, facilityTimes}) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: MAPS_API_KEY,
        libraries,
    });

    const [bounds, setBounds] = useState(null)

    const rfMap = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        rfMap.current = map;
    }, []);

    const handleChange = () => {
        setBounds(rfMap.current.getBounds())
    }

    const rfSearchBox = React.useRef();
    const onLoad = React.useCallback((search) => {
        rfSearchBox.current = search;
    }, []);

    const onInputChange = () => {
        var markerArray = [];
        let results = rfSearchBox.current.getPlaces();
        for (let i = 0; i < results.length; i++) {
            let place = results[i].geometry.location
            let locations = {

                place_id: results[i].place_id,
                placeLocation: place,
            }
            markerArray.push(locations);
        }

        setMarkers(markerArray)
        selectMarker(null)
    }

    function markerChosen(chosenMarker) {
        setName("")
        setAddress("")
        setPhone("")
        setTimes("")

        const parameter = {
            placeId: chosenMarker.place_id,
            fields: ["name", "formatted_address", "international_phone_number", "opening_hours"],
        };

        getDetails(parameter).then(
            (details) => {
                let selectedMarkerArray = Object.keys(details)
                //Set name
                if (selectedMarkerArray.find(field => field === "name")) {

                    setName(details["name"])
                } else {
                    setName("N/A")
                }
                //Set address
                if (selectedMarkerArray.find(field => field === "formatted_address")) {
                    setAddress(details["formatted_address"])
                } else {
                    setAddress("N/A")
                }
                //Set phone
                if (selectedMarkerArray.find(field => field === "international_phone_number")) {

                    setPhone(details["international_phone_number"])
                } else {
                    setPhone("N/A")
                }
                //Set hours
                if (selectedMarkerArray.find(field => field === "opening_hours")) {

                    setTimes(details["opening_hours"]["weekday_text"].toString())
                } else {
                    setTimes("N/A")
                }

            })
            .catch((error) => {
                console.log("Error: ", error);
            });
            selectMarker(chosenMarker)
    }

    const closeMarker = () => {
        selectMarker(null)
        setName("")
        setAddress("")
        setPhone("")
        setTimes("")
    }

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    return (
        <div>
            <GoogleMap
                id="googleMap"
                mapContainerStyle={mapContainerStyle}
                zoom={center.lat === 0.0 ? 1 : 11}
                center={center}
                options={options}
                onLoad={onMapLoad}
                onIdle={handleChange}
                onClick={() => { return true }}
            >
                {searchKeyword !== "" ? <StandaloneSearchBox
                    onLoad={onLoad}
                    bounds={bounds}
                    onPlacesChanged={onInputChange}
                >
                    <div className="input-field">
                        <input className="find"
                            readOnly={true}
                            type="text"
                            placeholder="Find a Facility via radio buttons"
                            value={searchKeyword !== "" ? searchKeyword : ""}
                        />
                    </div>
                </StandaloneSearchBox> : ""}
                {markers.map((marker, index) => (
                    <Marker key={index}
                        position={marker.placeLocation}
                        value={marker}
                        onClick={() => { markerChosen(marker) }}
                    />
                ))}
                {statusMarker ? (
                    <InfoWindow
                        position={statusMarker.placeLocation}
                        onCloseClick={closeMarker}
                    >
                        <div>
                        <p className="facility-p">Facility Info</p>
                        <hr/>
                        <p className="name-lbl">Name: {facilityName}</p>
                        <p className="address-lbl">Address: {facilityAddress}</p>
                        <p className="phone-lbl">Business Phone: {facilityPhone}</p>
                        <p className="times-lbl">Weekly Hours:</p>
                        {facilityTimes !== "" ?  facilityTimes.split(',').map((times, index) => (
                            <p className="hours-p" key={index}>{times}</p>
                        ))
                        : "" }
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )
}

export default GoogleMapComponent
