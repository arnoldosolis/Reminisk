
import React from 'react';
import './MapIt.css';
import MyGoogleMap from './MyGoogleMap';
import Button from './button';
import Warning from "./WarningPopup";


function MapIt() {

  return (
    <div className="main-wrapper">
      <MyGoogleMap />
    </div>
  );
}

export default MapIt;
