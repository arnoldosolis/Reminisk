
import React from 'react';
import './MapIt.css';
import MyGoogleMap from './MyGoogleMap';
import Button from './button';
import Warning from "./WarningPopup";
import { Redirect } from 'react-router-dom';

function MapIt({ authorized }) {
  if(!authorized){ return <Redirect to="/redirectMapit" />;}
  return (
    <div className="main-wrapper">
      <MyGoogleMap />
    </div>
  );
}

export default MapIt;
