import VideoBackground from '../components/homepage_components/VideoBackground';
import Shortcut
 from '../components/shortcut_components/Shortcut';
import { Redirect } from 'react-router-dom';

function Home({ authorized }) {
    if(!authorized){ return <Redirect to="/" />;}
    return (
        <>
            <VideoBackground />
            <Shortcut />
        </>
    )
}

export default Home
