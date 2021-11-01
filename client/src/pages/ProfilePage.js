import "./ProfilePage.css"
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";


function ProfilePage({ authorized }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [savedFacilities, setSavedFacilities] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:3001/userinfo").then((response) => {
            setName(response.data[0].name);
            setEmail(response.data[0].email);
        });
        Axios.get("http://localhost:3001/facility").then((response) => {
            setSavedFacilities(response.data)
        });
    }, []);
    if (!authorized) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <div className="profile-cntr" >
                <h1 className="profile-hdr">Profile Page</h1>
                <br />
                <div className="userinfo-cntr">
                    <h4>User Information</h4>
                    <label className="username-lbl">Name: {name}</label>
                    <label className="useremail-lbl">Email: {email}</label>
                </div>
                <div className="facilityinfo-cntr">
                <h4 className="facilityinfo-hdr">Saved Facility Information</h4>
                {savedFacilities.length !== 0 ?
                savedFacilities.map((val, index) => (
                    <div className="facilityinfo-cntr" key={index}>
                        <label className="facility-lbl">Facility Name: {val.facility_name!==null ? val.facility_name : "N/A"}</label>
                        <label className="facility-lbl">Facility Address: {val.facility_address!==null ? val.facility_address : "N/A"}</label>
                        <label className="facility-lbl">Facility Phone: {val.facility_phone!==null ? val.facility_phone : "N/A"}</label>
                        <label className="facility-lbl">Facility Times: 
                        {val.facility_times !== null ?  val.facility_times.split(',').map((times, index) => (
                            <label className="hours-p" key={index}>{times}</label>
                        ))
                        : "N/A" }
                        </label>
                    </div>
                    
                    
                ))
                : 
                    <h2>No Facilities Saved</h2>
                }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
