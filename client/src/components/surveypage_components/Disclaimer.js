import React from 'react';
import './Disclaimer.css'
function Disclaimer ( { trigger, setTrigger }) {
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h3 className="disclaimer-hdr">Disclaimer</h3>
                <p>All responses from the survey will not be collected, nor will responses be shared with other individuals or 
                    companies.</p>
                <p></p>
                <button className="close-btn" onClick={() => setTrigger(false)}>Close</button>
            </div>
        </div>
    ) : "";
}

export default Disclaimer