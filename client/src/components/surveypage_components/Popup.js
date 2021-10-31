import './Popup.css'
import { Link } from 'react-router-dom'

function Popup( { trigger, setTrigger }) {
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h3 className="popup-hdr">Thank You</h3>
                <p className="popup-msg">Would you like to find professional counseling?</p>
                <p></p>
                <Link to="/home">
                    <button className="decline-btn" onClick={() => setTrigger(false)}>Decline</button>
                </Link>
                <Link to="/search">
                    <button className="accept-btn">Accept</button>
                </Link>
            </div>
        </div>
    ) : "";
}

export default Popup
