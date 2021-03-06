// MyGoogleMaps.js
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Button from "./button";
import styled from "styled-components";
import Axios from "axios";
import AutoComplete from "./Autocomplete";
import Marker from "./Marker";
import Marker2 from "./Marker2";
import { InfoWindow, OverlayView } from '@react-google-maps/api';
import Warning from "./WarningPopup";


const libraries = ["places"];
const Wrapper = styled.main`
  width: 100%;
  height: 75%;
`;

class MyGoogleMap extends Component {
  state = {
    mapApiLoaded: false,
    showingInfoWindow: false,
    mapInstance: null,
    clickMe: false,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [],
    zoom: 9,
    address: "",
    draggable: true,
    lat: null,
    lng: null,
    label: null,
    journalList: [],
    newjournalList: [],
    warning: false,
    setWarning: false,
  };

  componentWillMount() {
    this.setCurrentLocation();
    this.forNewJournalList();
    this.determinePopup();
    // this.geocode();
  }

  // onMarkerInteraction = (childKey, childProps, mouse) => {
  //   this.setState({
  //     draggable: false,
  //     lat: mouse.lat,
  //     lng: mouse.lng,
  //   });
  // };
  // onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
  //   this.setState({ draggable: true });
  //   this._generateAddress();
  // };

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  _onClick = (value) => {
    this.setState({
      lat: value.lat,
      lng: value.lng,
    });
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });

    this._generateAddress();
  };


  addPlace = (place) => {
    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    this._generateAddress();
  };

  _generateAddress() {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }
  determinePopup(){
    return (<div className="s-cntr">
        <h1 className="s-hdr">Error: Answer Survey First</h1>
    </div>);
}

  // Get Current Location Coordinates
  //in wrapper it prints out the coords using setstate
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }
  componentDidMount() {
    Axios.get("http://localhost:3001/journals").then((response) => {
      const list = response.data;
      this.setState({ journalList: list });
    });
  }

  geocode(loc) {
    console.log("here");
    Axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: loc.location,
        key: "AIzaSyCKTiKzLSpkhGO_v1h_jGq6CltajbkrskM",
      },
    }).then((response) => {
      // console.log(response.data);
      let obj = {
        id: loc.journallog_id,
        lat: response.data.results[0].geometry.location.lat,
        lon: response.data.results[0].geometry.location.lng,
      };
      // console.log(obj);
      this.setState({ newjournalList: [...this.state.newjournalList, obj] });

      // console.log(response.data.results[0].geometry.location.lat);
      // console.log(response.data.results[0].geometry.location.lng);
    });
  }

  forNewJournalList() {
    this.state.journalList.map((data) => this.geocode(data));
  }
  mapMarkers = () => {
    this.state.newjournalList.map((data) => {
      return (
        <Marker
          key={data.id}
          coordinate={{ latitude: data.lat, longitude: data.lon }}
        ></Marker>
      );
    });
  };
  render() {
    const { places, mapApiLoaded, mapInstance, mapApi, clickMe } = this.state;

    return (
      <Wrapper>
        {mapApiLoaded && (
          <div>
            <AutoComplete
              map={mapInstance}
              mapApi={mapApi}
              addplace={this.addPlace}
            />
          </div>
        )}
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          draggable={this.state.draggable}
          onChange={this._onChange}
          onChildMouseDown={this.onMarkerInteraction}
          onChildMouseUp={this.onMarkerInteractionMouseUp}
          onChildMouseMove={this.onMarkerInteraction}
          onChildClick={() => console.log("child click")}
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: "AIzaSyCKTiKzLSpkhGO_v1h_jGq6CltajbkrskM",
            libraries: ["places", "geometry"],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
        <Marker
          text={this.state.address}
          lat={this.state.lat}
          lng={this.state.lng}
          label={this.state.address}
          journal={this.state.journalList}
        />
        <Marker2
        title="Click to zoom"
        lat = {40.7687275}
        lng={-73.9651798}
        determinePopup={this.state.warning}
        />
          {this.mapMarkers()}
        </GoogleMapReact>

        <div className="info-wrapper">
          <div className="map-details">
            Latitude: <span>{this.state.lat}</span>, Longitude:{" "}
            <span>{this.state.lng}</span>
          </div>
          <div className="map-details">
            Address: <span>{this.state.address}</span>
          </div>
        </div>
        <Warning trigger={this.state.warning} setTrigger={this.state.setWarning} />
      </Wrapper>
    );
  }
}

export default MyGoogleMap;
