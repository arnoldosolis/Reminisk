import React from 'react'
import {GoogleApiWrapper, Map, Marker, InfoWindow} from  'google-maps-react'
import './map.css'
import { Component } from 'react'

export class MapC extends Component{

  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(prevState => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
  }
  render(){
    return(

      <Map google = {this.props.google}
      zoom ={13}
      style = {{
        width:"100%",
        height: "50%"
      }}
      center = {{lat: 12, lng :-75}}>
    \

        <Marker position ={{lat: 12, lng :-75}}
        onDragEnd = {this.moveMarker.bind(this)}
        draggable = {true}
        name= {"Marker"}/>

            <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h2>{this.state.selectedPlace.name}</h2>
              </div>
            </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyCKTiKzLSpkhGO_v1h_jGq6CltajbkrskM'
}) (MapC)
