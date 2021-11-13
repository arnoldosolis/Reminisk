import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import './Search.css';
import SearchNear from './SearchNear.js';
import SearchLocation from './SearchLocation';
import Map from './GoogleMapComponent';
import SearchButtons from './searchButtons';
import Confirm from "./confirmPopup";
import Axios from 'axios'
import { Redirect } from "react-router-dom";
import Warning from "./WarningPopup";

function Search({ authorized }) {
    const currentPage = useLocation();
    const { searchFor } = currentPage.state || [];
    const [buttonPopup, setButtonPopup] = useState(false);
    const [warning, setWarning] = useState(false);
    const [changes, setChanges] = useState(false)
    const [centerSearch, setCenterSearch] = useState(false);
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

    const [savedFacilities, setSavedFacilities] = useState(null)
    
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
            setChanges(!changes)
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/facility").then((response) => {
            const facilities_address = new Set();
            for (let i = 0; i < response.data.length; i++) {
                facilities_address.add(response.data[i].facility_address);
            }
            console.log(facilities_address)
            setSavedFacilities(facilities_address)
        });
        return () => {
            setSavedFacilities(null);
        }
    }, [changes])

    const determinePopup = () => {
        //If not null, check if value in set
        if (savedFacilities !== null) {
            if (savedFacilities.has(facilityAddress)) {
                setWarning(true);
            } else {
                setButtonPopup(true);
            }
        }
        //Is not, add first facility
        else {
            setButtonPopup(true);
        }
  
        
    }
    //If user isnt logged in redirect them to log in
    if (!authorized) {
        return <Redirect to="/" />;
    }

    //If user is logged in, show "Error: Answer Survey First"
    if (searchFor === undefined && authorized) {
        return (<div className="s-cntr">
            <h1 className="s-hdr">Error: Answer Survey First</h1>
        </div>);
    }

    return (
        <div>
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
                            onClick={determinePopup}
                        >
                            {(selectedFacility.length === 0) ? "Input address, then select issue " : (selectedFacility.length > 0 && selectMarker === null) ? "Select a marker" : "Save Information"}
                        </button>
                        <Warning trigger={warning} setTrigger={setWarning} />
                        <Confirm trigger={buttonPopup} setTrigger={setButtonPopup} uploadData={addFacility} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search