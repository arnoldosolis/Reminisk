import "./Search.css";

function SearchNear({ handleSearch, handleClick, centered, handleLocation, resetMarkers, resetSelected, resetKeyword }) {
    
    const changeButton = () => {
        handleClick(!handleSearch)
        handleLocation({
            loaded: false,
            coordinates: { lat: 0.0, lng: 0.0 }
        })
        resetMarkers([])
        resetSelected(null)
        resetKeyword("")
    }

    // const consoleLog = () => {
    //     console.log(JSON.stringify(location))
    // }
    return (
        <>
            <button className="change-btn" onClick={changeButton}>Change search type to: Location Search</button>
            <p className="address-p">
                Address
                <input className="near-input" type="text" placeholder="Using your current location, switch to Address Search to input location" disabled={true}></input>
                <label className="status-lbl">
                    Status on location:
                    {
                        centered.loaded ? " Coordinates recieved" : " Error, coordinates cannot be retrieved, check browser permissions and try again"
                    }
                </label>
            </p>

        </>
    )
}

export default SearchNear
