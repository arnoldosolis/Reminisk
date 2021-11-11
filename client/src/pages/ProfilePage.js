import "./ProfilePage.css"
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";


function ProfilePage({ authorized }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [savedFacilities, setSavedFacilities] = useState([])

    const [edit, setEdit] = useState(false)
    const [newEmail, setNewEmail] = useState("")
    const [editFacility, setEditFacility] = useState(false)
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        Axios.get("http://localhost:3001/userinfo").then((response) => {
            setName(response.data[0].name);
            setEmail(response.data[0].email);
        });
        Axios.get("http://localhost:3001/facility").then((response) => {
            setSavedFacilities(response.data)
        });
        setChanges(false)
    }, [changes]);

    Axios.defaults.withCredentials = true;
    const editInfo = () => {
        Axios.put("http://localhost:3001/updateEmail", {
            new_email: newEmail
        }).then((response) => {
            console.log("Result: ", response);
        },
            (error) => {
                console.error("Error:", error);
            }
        )
        Axios.get("http://localhost:3001/userinfo").then((response) => {
            setEmail(response.data[0].email);
        });
        setEdit(false)
    }

    const deleteFacility = ( facility ) => {
        Axios.delete(`http://localhost:3001/deletefacility/${facility}`, {
            data: facility 
        }).then((response) => {
            console.log(response);
          }, (error) => {
            console.error("Error:", error);
        });
        setChanges(true);
        };

    if (!authorized) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <div className="profile-cntr" >
                <h1 className="profile-hdr">Profile Page</h1>
                <br />
                <div className="userinfo-cntr">
                    <h4 className="userinfo-hdr">User Information</h4>
                    <label className="username-lbl">Name: {name}</label>
                    {edit ?
                        <p className="edit-p">
                            <label className="edit-lbl">Edit Email:</label>
                            <input className="update-inp" placeholder="Input New Email" onChange={(e) => {
                                setNewEmail(e.target.value)
                            }} />
                            <button className="confirm-btn" onClick={editInfo}>Confirm Edit</button>
                            <button className="cancel-btn" onClick={() => setEdit(false)}>Cancel Edit</button>
                        </p>
                        :
                        <p>
                            <label className="useremail-lbl">Email: {email}</label>
                            <button className="edit-btn" onClick={() => setEdit(true)}>Edit Information</button>
                        </p>
                    }
                </div>
                <div className="facilityinfo-cntr">
                    <h4 className="facilityinfo-hdr">Saved Facility Information</h4>
                    <button className="editfacility-btn" onClick={() => { setEditFacility(!editFacility) }}>{editFacility === false ? "Edit" : "Cancel"}</button>
                    {savedFacilities.length !== 0 ?
                        savedFacilities.map((val, index) => (
                            <div className="facilityinfo-cntr" key={index}>
                                <label className="facility-lbl">Facility Name: {val.facility_name !== null ? val.facility_name : "N/A"}</label>
                                <label className="facility-lbl">Facility Address: {val.facility_address !== null ? val.facility_address : "N/A"}</label>
                                <label className="facility-lbl">Facility Phone: {val.facility_phone !== null ? val.facility_phone : "N/A"}</label>
                                <label className="facility-lbl">Facility Times:
                                    {val.facility_times !== null ? val.facility_times.split(',').map((times, index) => (
                                        <label className="hours-p" key={index}>{times}</label>
                                    ))
                                        : "N/A"}
                                </label>
                                {editFacility === true ?
                                    
                                        <div className="delete-icon" onClick={() => {deleteFacility(val.facility_id)}}>
                                        <i className="fas fa-minus-square" >
                                        </i>
                                        </div>
                                    : ""}
                            </div>


                        ))
                        :
                        <h2 className="nofacility-hdr">No Facilities Saved</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
