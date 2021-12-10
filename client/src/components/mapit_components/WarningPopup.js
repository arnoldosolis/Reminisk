import React from 'react'
import "./Warning.css"

function WarningPopup( {trigger, setTrigger } ) {
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h3 className="disclaimer-hdr">Address</h3>
                <p>695 Park Avenue</p>
            </div>
        </div>
    ) : "";
}

export default WarningPopup
