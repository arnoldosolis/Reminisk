import { Button } from "./Button"
import '../App.css'
import "./VideoBackground.css"
import { Redirect } from "react-router-dom";

function VideoBackground({authorized}) {
    if(!authorized){ return <Redirect to="/" />;}

    return (
        <div className="video-container">
            <video className="video" src="../videos/video-1.mp4" autoPlay loop muted />
            <h1>Reminisk</h1>
            <p>Where your mental health is a priority.</p>
            
            <div className="video-btns">
                {/* Currently Linked to Profile: May need to change to normal buttons */}
                <Button className="btns" buttonStyle='btn--outline' buttonSize="btn--large">
                    Log Journal Entry
                </Button>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn--large">
                    Fill Out Survey
                </Button>
            </div>
        </div>
    );
}

export default VideoBackground;
