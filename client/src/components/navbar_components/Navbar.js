import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { Button } from '../Button';
import Axios from "axios";

function Navbar() {
    const [clicked, setClicked] = useState(false);

    const [button, setButton] = useState(true);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const closeMobileMenu = () => setClicked(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)

    function logOut() {
        Axios.defaults.withCredentials = true;
        Axios.post("http://localhost:3001/logout");
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
                        Reminisk 
                        <i className="fas fa-book" />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={clicked ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                    <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                                <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                                    Home
                                </Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/journal" className="nav-links" onClick={closeMobileMenu}>
                                    Journal
                                </Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/survey" className="nav-links" onClick={closeMobileMenu}>
                                    Survey
                                </Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/mapit" className="nav-links" onClick={closeMobileMenu}>
                                    Map-It
                                </Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/" className="nav-links" onClick={logOut}>
                                    Log Out
                                </Link>
                        </li>
                        <li>
                                <Link to="/profile" className="nav-links-mobile" onClick={closeMobileMenu}>
                                    Profile
                                </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle="btn--outline" linkTo={"/profile"}>Profile</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;