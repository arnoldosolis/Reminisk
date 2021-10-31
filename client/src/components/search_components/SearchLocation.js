import "./Search.css";
import { useState } from 'react';
import Geocode from "react-geocode";
import { GEO_API_KEY } from '../../config';
import UseGeoLocation from '../UseGeoLocation';

function SearchLocation({ handleSearch, handleClick, handleLocation, resetMarkers, resetSelected, resetKeyword}) {
    const centeredLocation = UseGeoLocation();
    const [geolocation, setGeoLocation] = useState({
        loaded: false,
        coordinates: { lat: 0.0, lng: 0.0 }
    })

    Geocode.setApiKey(GEO_API_KEY)

    const [searchLocation, setSearchLocation] = useState("")
    const [useAddressBtn, setUseAddressBtn] = useState(false)
    const [useCenterBtn, setUseCenterBtn] = useState(true)
    const [useClearBtn, setUseClearBtn] = useState(true)

    const changeButton = () => {
        // console.log(centeredLocation)
        handleClick(!handleSearch)
        handleLocation(centeredLocation)
        resetMarkers([])
        resetSelected(null)
        resetKeyword("")
    }

    const handleChange = () => {
        Geocode.fromAddress(searchLocation).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location
                setGeoLocation({
                    loaded: true,
                    coordinates: {
                        lat, lng
                    }
                })
                setUseAddressBtn(true)
                setUseCenterBtn(false)
            },
            (error) => {
                setGeoLocation({
                    loaded: false,
                    coordinates: { lat: 0.0, lng: 0.0 },
                    error: {
                        code: error,
                        message: error.message
                    }
                })
            });
        setUseClearBtn(false)
    }

    const clearEntries = () => {
        setGeoLocation({
            loaded: false,
            coordinates: { lat: 0.0, lng: 0.0 }
        })
        handleLocation({
            loaded: false,
            coordinates: { lat: 0.0, lng: 0.0 }
        });
        setUseAddressBtn(false)
        setUseCenterBtn(true)
        setSearchLocation("")
        setUseClearBtn(true)
        document.getElementById("input-location").value = ""
        resetMarkers([])
        resetSelected(null)
        resetKeyword("")
    }

    const handleInput = e => {
        if (e.keyCode === 13) {
            setSearchLocation(e.target.value)
        }
        if (e.keyCode === 8 && geolocation.loaded) {
            setGeoLocation({
                loaded: false,
                coordinates: { lat: 0.0, lng: 0.0 }
            })
            handleLocation(geolocation);
        }

    }

    const reverseGeocode = () => {
        resetKeyword("Found location")
        resetMarkers([])
        handleLocation(geolocation);
        setUseCenterBtn(true)
        // console.log(geolocation);
        setUseClearBtn(false)
    }

    // const consoleLog = () => {
    //     console.log(searchLocation)
    // }

    return (
        <>
            <button className="change-btn" onClick={changeButton}>Change search type to: Near By Search</button>
            <p className="address-p">
                Address/City:
                <span className="first-cntr">
                    <input className="address-input"
                        id="input-location"
                        type="text"
                        placeholder=" Input full address/city and press 'Enter' for accurate reverse geocoding"
                        onKeyDown={handleInput}
                        disabled={useAddressBtn}
                    >
                    </input>
                    <label className="valid-lbl">{searchLocation !== "" ? ("Current Address Input: " + searchLocation) : "Current Address Input: No input address, Press 'Enter in input'"}</label>

                </span>
                <button className="location-btn" onClick={handleChange} disabled={useAddressBtn}>Validate Input</button>
                <br />
                <label className="valid-lbl">{geolocation.loaded ? ("Valid address, press 'Center on Address' to center map, or clear to restart search") : "Input a valid address, press enter, then click 'Use Address'"}</label>
                <button className="location-btn" onClick={reverseGeocode} disabled={useCenterBtn}>Center on Address</button>
                <button className="location-btn" onClick={clearEntries} disabled={useClearBtn}>Clear</button>
            </p>

        </>
    )
}

export default SearchLocation