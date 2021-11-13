import React from 'react'
import "./Warning.css"

function WarningPopup( {trigger, setTrigger } ) {
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h3 className="disclaimer-hdr">Attention</h3>
                <p>You currently have this facility saved. Check your profile page to see the facility information.</p>
                <p></p>
                <button className="close-btn" onClick={() => setTrigger(false)}>Close</button>
            </div>
        </div>
    ) : "";
}

export default WarningPopup
