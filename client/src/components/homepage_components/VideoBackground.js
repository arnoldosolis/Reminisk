import { Button } from "../Button"
import "./VideoBackground.css"

function VideoBackground() {
    return (
        <div className="video-container">
            <video className="video" src="../videos/video-1.mp4" autoPlay loop muted />
            <h1>Reminisk</h1>
            <p>Where your mental health and well-being is a priority.</p>

            <div className="video-btns">
                <Button className="btns" buttonStyle='btn--outline' buttonSize="btn--large" linkTo="/journal">
                    Log Journal Entry
                </Button>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn--large" linkTo="/survey">
                    Fill Out Survey
                </Button>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn--large" linkTo="/mapit">
                    Map It
                </Button>
            </div>
        </div>
    );
}

export default VideoBackground;
