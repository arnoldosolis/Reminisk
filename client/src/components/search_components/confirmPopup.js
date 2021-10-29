import './confirmPopup.css'


function Popup({ trigger, setTrigger, uploadData }) {
    const addData = () => {
        uploadData()
        setTrigger(false)
    }
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h3 className="popup-hdr">Would you like to save the selected facility info?</h3>
                <p></p>
                <div className="btn-cntr">
                    <button className="decline-btn" onClick={() => setTrigger(false)}>No</button>
                    {/* Change Yes button for back end */}
                    <button className="accept-btn" onClick={addData}>Yes</button>
                </div>
            </div>
        </div>
    ) : "";
}

export default Popup
