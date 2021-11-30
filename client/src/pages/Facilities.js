import "./ProfilePage.css";
import { useState } from 'react';

function Facilities( { facilities, deleteFacility, editFacility }) {
    const [show, setShow] = useState(false)


    return (
        <> 
            {facilities.map((facility, index) => (
                <div className="facilityinfo-cntr" key={index}>
                    <label className="facility-lbl">Facility Name: {facility.facility_name !== null ? facility.facility_name : "N/A"}</label>
                    <label className="facility-lbl">Facility Address: {facility.facility_address !== null ? facility.facility_address : "N/A"}</label>
                    {show ?
                        <>
                            <label className="facility-lbl">Facility Phone: {facility.facility_phone !== null ? facility.facility_phone : "N/A"}</label>
                            <label className="facility-lbl">Facility Times:
                                {facility.facility_times !== null ? facility.facility_times.split(',').map((times, index) => (
                                    <label className="hours-p" key={index}>{times}</label>
                                ))
                                    : "N/A"}
                            </label>
                        </> : ""}
                    <button className="show-btn" onClick={() => { setShow(!show) }}>{!show ? "Show More" : "Show Less"}</button>
                    {editFacility === true ?

                        <div className="delete-icon" onClick={() => { deleteFacility(facility.facility_id) }}>
                            <i className="fas fa-minus-square" >
                            </i>
                        </div>
                        : ""}
                    {/* <label className="facility-lbl">Facility Name: {facility.facility_name !== null ? facility.facility_name : "N/A"}</label>
            <label className="facility-lbl">Facility Address: {facility.facility_address !== null ? facility.facility_address : "N/A"}</label>
            {show ?
                <>
                    <label className="facility-lbl">Facility Phone: {facility.facility_phone !== null ? facility.facility_phone : "N/A"}</label>
                    <label className="facility-lbl">Facility Times:
                        {facility.facility_times !== null ? facility.facility_times.split(',').map((times, index) => (
                            <label className="hours-p" key={index}>{times}</label>
                        ))
                            : "N/A"}
                    </label>
                </> : ""}
            <button className="show-btn" onClick={() => { setShow(!show) }}>{!show ? "Show More" : "Show Less"}</button>
            {editFacility === true ?

                <div className="delete-icon" onClick={() => { deleteFacility(facility.facility_id) }}>
                    <i className="fas fa-minus-square" >
                    </i>
                </div>
                : ""} */}
                </div>
            ))}
        </>
    )
}

export default Facilities
