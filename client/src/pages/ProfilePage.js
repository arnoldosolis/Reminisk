import "./ProfilePage.css"
import Facilities from "./Facilities"
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination.js"
import Axios from "axios";


function ProfilePage({ authorized }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [savedFacilities, setSavedFacilities] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [facilityPerPage] = useState(5)

    const [edit, setEdit] = useState(false)
    const [newEmail, setNewEmail] = useState("")
    const [editFacility, setEditFacility] = useState(false)
    const [changes, setChanges] = useState(false)

    const [authPass, setAuthPass] = useState("")
    const [confirmAuth, setConfirmAuth] = useState("")
    const [wrongPass, setWrongPass] = useState(false)
    const [same, setSame] = useState(true)
    
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("http://localhost:3001/userinfo").then((response) => {
            setName(response.data[0].name);
            setEmail(response.data[0].email);
        });

        return () => {
            setName("")
            setEmail("")
            setSavedFacilities([])
        }
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/facility").then((response) => {
            setSavedFacilities(response.data)
        });
    }, [changes])

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

    const deleteFacility = (facility) => {
        Axios.delete(`http://localhost:3001/deletefacility/${facility}`, {
            data: facility
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.error("Error:", error);
        });
        setChanges(!changes);
    };

    const indexOfLastPost = currentPage * facilityPerPage;
    const indexOfFirstPost = indexOfLastPost - facilityPerPage;
    const currentFacilities = savedFacilities.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const authChange = () => {
        if (authPass === confirmAuth) {
            Axios.get(`http://localhost:3001/updateEmailAuth/${authPass}`, {
                data: authPass
            }).then((response) => {
                setSame(true)
                const confirm = response.data;
                if (confirm) {
                    editInfo()
                } else {
                    setWrongPass(true)
                }
            }, (error) => {
                console.log("Error", error);
                setWrongPass(true)
            });
        } else {
            setSame(false)
        }
    }

    const cancelEdit = () => {
        setEdit(false);
        setWrongPass(false)
        setSame(true)
    }

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
                            <label className="edit-lbl">Edit Email: {email}</label>
                            <input 
                            className="update-inp" 
                            placeholder="Input New Email" 
                            onChange={(e) => {setNewEmail(e.target.value)}} />
                            <input 
                            type="password"
                            className="update-inp" 
                            placeholder="Enter password" 
                            onChange={(e) => {setAuthPass(e.target.value)}} />
                            <input 
                            type="password"
                            className="update-inp" 
                            placeholder="Confirm password" 
                            onChange={(e) => {setConfirmAuth(e.target.value)}} />
                            <br/>
                            {wrongPass || !same ? (<label className="incorrect-lbl">{!same ? "Passowrd fields do not match" : wrongPass ? "Wrong Password" : ""}</label>) : ""}
                            <br/>
                            <br/>
                            <button className="confirm-btn" onClick={authChange}>Confirm Edit</button>
                            <button className="cancel-btn" onClick={cancelEdit}>Cancel Edit</button>

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
                    {savedFacilities.length !== 0 ?
                        <>
                            <button className="editfacility-btn" onClick={() => { setEditFacility(!editFacility) }}>{editFacility === false ? "Edit" : "Cancel"}</button>
                            {/* {savedFacilities.map((val, index) => (
                                <Facilities facility={val} key={index} deleteFacility={deleteFacility} editFacility={editFacility} />
                            ))} */}
                            <Facilities 
                            facilities={currentFacilities} 
                            deleteFacility={deleteFacility}
                            editFacility={editFacility}
                            />
                            <Pagination 
                            facilitiesPerPage={facilityPerPage} 
                            totalFacilities={savedFacilities.length} 
                            paginate={paginate}
                            />
                        </>
                        :
                        <h2 className="nofacility-hdr">No Facilities Saved</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
