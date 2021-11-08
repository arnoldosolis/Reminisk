import { useState } from 'react';
import { useLocation } from 'react-router';
import './Search.css';
import SearchNear from './SearchNear.js';
import SearchLocation from './SearchLocation';
import Map from './GoogleMapComponent';
import SearchButtons from './searchButtons';
import Confirm from "./confirmPopup";
import Axios from 'axios'
import { Redirect } from "react-router-dom";

function Search({ authorized }) {
    const currentPage = useLocation();
    const { searchFor } = currentPage.state || [];
    const [buttonPopup, setButtonPopup] = useState(false);

    const [centerSearch, setCenterSearch] = useState(false)
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 0.0, lng: 0.0 }
    })

    const [findFacility, setFindFacility] = useState("")
    const [selectedFacility, setSelectedFacility] = useState([])
    const [selectMarker, setSelectMarker] = useState(null)

    const [facilityName, setFacilityName] = useState("")
    const [facilityAddress, setFacilityAddress] = useState("")
    const [facilityPhone, setFacilityPhone] = useState("")
    const [facilityTimes, setFacilityTimes] = useState("")

    Axios.defaults.withCredentials = true;
    const addFacility = () => {
        Axios.post("http://localhost:3001/facility", {
            f_name: facilityName,
            f_address: facilityAddress,
            fy_phone: facilityPhone,
            f_times: facilityTimes,
        })
            .then((response) => {
                console.log("Result: ", response);
            },
                (error) => {
                    console.error(error);
                }
            )
    }

    //If user isnt logged in redirect them to log in
    if (!authorized) {
        console.log(authorized)
        return <Redirect to="/" />;
        
    }

    //If user is logged in, show "Error: Answer Survey First"
    if (searchFor === undefined && authorized) {
        console.log("AUTHORIZATION BUT EMPTY ARRAY")
        return <Redirect to="/survey" />;
    }



    return (
        <div>
            {/* <button onClick={consoleLog}>Check problem</button> */}
            <div className="s-cntr">
                <h1 className="s-hdr">Search for a Facility</h1>
                <br />
                <div className="search-cntr"> {
                    centerSearch ?
                        <SearchNear
                            handleSearch={centerSearch}
                            handleClick={setCenterSearch}
                            centered={location}
                            handleLocation={setLocation}
                            resetMarkers={setSelectedFacility}
                            resetSelected={setSelectMarker}
                            resetKeyword={setFindFacility}
                        /> :
                        <SearchLocation
                            handleSearch={centerSearch}
                            handleClick={setCenterSearch}
                            handleLocation={setLocation}
                            resetMarkers={setSelectedFacility}
                            resetSelected={setSelectMarker}
                            resetKeyword={setFindFacility}
                        />}
                </div>

                <div className="google-fncts">
                    <div className="map">
                        <Map
                            center={location.coordinates}
                            searchKeyword={findFacility}
                            setMarkers={setSelectedFacility}
                            markers={selectedFacility.length > 0 ? selectedFacility : []}
                            statusMarker={selectMarker}
                            selectMarker={setSelectMarker}
                            setName={setFacilityName}
                            setAddress={setFacilityAddress}
                            setPhone={setFacilityPhone}
                            setTimes={setFacilityTimes}
                            facilityName={facilityName}
                            facilityAddress={facilityAddress}
                            facilityPhone={facilityPhone}
                            facilityTimes={facilityTimes}
                        />
                    </div>
                    <div className="info">
                        <p>Select an issue to search for respective facility.</p>
                        <p>Then once search box appears, click and make a query</p>
                        {location.loaded ? searchFor.map((value, index) => (
                            <SearchButtons problem={value} key={index} setFacility={setFindFacility} />
                        )) : "No selection displayed: Input a valid address"}
                        <br />
                        <button className="save-btn"
                            disabled={selectMarker === null ? true : false}
                            onClick={() => setButtonPopup(true)}
                        >
                            {(selectedFacility.length === 0) ? "Input address, then select issue " : (selectedFacility.length > 0 && selectMarker === null) ? "Select a marker" : "Save Information"}
                        </button>
                        <Confirm trigger={buttonPopup} setTrigger={setButtonPopup} uploadData={addFacility} />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Search