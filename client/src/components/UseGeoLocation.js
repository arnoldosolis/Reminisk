import { useEffect, useState } from 'react'

function UseGeoLocation() {
    const [geolocation, setGeoLocation] = useState({
        loaded: false,
        coordinates: {lat: 0.0, lng: 0.0}
    })
    const onSucess = geolocation => {
        setGeoLocation({
            loaded: true,
            coordinates: {
                lat: parseFloat(geolocation.coords.latitude),
                lng: parseFloat(geolocation.coords.longitude),
            }
        });
    };
    const onError = (error) => {
        setGeoLocation({
            loaded: false,
            coordinates: {lat: 0.0, lng: 0.0},
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator) ) {
            onError({
                code: 0,
                message: "Geolocation Not Supported"
            });
        }
        navigator.geolocation.getCurrentPosition(onSucess, onError)
    }, []);
    return geolocation;
}

export default UseGeoLocation
