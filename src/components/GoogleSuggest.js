import React, { Component } from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";

import { connect } from "react-redux";

import { getInputData, toggleInputResults } from "./../actions/index";

const MY_API_KEY = "AIzaSyDBYJmYQkG7IuhZcUNTo-yWNB6ix1hstzA";

// const res = fetch("https://maps.googleapis.com/maps/api/distancematrix/json")
//   .query({
//     origins: [49.839683, 24.029717000000005],
//     destinations: [50.4475854, 30.522025699999972],
//     mode: "driving",
//     key: MY_API_KEY
//   })
//   .then(res => console.log(res));
// console.log("RES", res);

class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: "",
    pickUp: "",
    dropOff: "",
    origins: {
      lat: "",
      lng: ""
    },
    destination: {
      lat: "",
      lng: ""
    }
  };

  // handleInputChange = (key, value) => {
  //   this.props.getInputData({
  //     key,
  //     value: this.state.value
  //   });
  // };
  // handleInputChange = e => {
  //   this.setState({ search: e.target.value, value: e.target.value });
  //   this.props.getInputData(this.state.search, this.state.value);
  // };
  handleInputChange = event => {
    this.setState({
      search: event.target.value,
      value: event.target.value
    });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(Map);
    console.log(geocodedPrediction.geometry.location.lat(), originalPrediction); // eslint-disable-line

    if (this.props.resultTypes.pickUp && geocodedPrediction) {
      //console.log(
      //  "pickUp",
      //  this.state.value,

      this.setState({
        search: "",
        value: geocodedPrediction.formatted_address,
        origins: {
          lat: geocodedPrediction.geometry.location.lat(),
          lng: geocodedPrediction.geometry.location.lng()
        }
      });
      this.props.getInputData({ key: "pickUp", value: this.state.value });
      this.setState({ search: "", value: "" });
      //);
    }
    {
      //console.log("dropOff", this.state.value, this.props.getInputData);

      this.setState({
        search: "",
        value: geocodedPrediction.formatted_address,

        destination: {
          lat: geocodedPrediction.geometry.location.lat(),
          lng: geocodedPrediction.geometry.location.lng()
        }
      });
      this.props.getInputData({ key: "dropOff", value: this.state.value });
      this.setState({ search: "", value: "" });
    }
  };

  handleNoResult = () => {
    console.log("No results for ", this.state.search);
  };

  handleStatusUpdate = status => {
    console.log(status);
  };
  // getMatrix = () => {
  //   //console.log(Map);
  //   var service = new window.google.maps.DistanceMatrixService();
  //   service.getDistanceMatrix(
  //     {
  //       origins: [this.state.origins.lat, this.state.origins.lng],
  //       destinations: [this.state.destination.lat, this.state.destination.lng],
  //       travelMode: "DRIVING",
  //       avoidHighways: Boolean,
  //       avoidTolls: Boolean
  //     },
  //     () => console.log(service)
  //   );
  // const res = fetch(
  //   "https://maps.googleapis.com/maps/api/distancematrix/json"
  // )
  //   .query({
  //     origins: this.state.origins.lat + "," + this.state.origins.lng,
  //     destinations:
  //       this.state.destination.lat + "," + this.state.destination.lng,
  //     mode: "driving",
  //     key: MY_API_KEY
  //   })
  //   .then(res => console.log(res));
  // console.log("RES", res);
  // };

  render() {
    console.log("state", this.state);
    const { search, value } = this.state;
    //console.log("STATE:", this.state);
    return (
      <>
        <ReactGoogleMapLoader
          params={{
            key: MY_API_KEY,
            libraries: "places,geocode"
          }}
          render={googleMaps =>
            googleMaps && (
              <GooglePlacesSuggest
                googleMaps={googleMaps}
                autocompletionRequest={{
                  input: search,
                  componentRestrictions: { country: "ua" }
                  // Optional options
                  // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                }}
                // Optional props
                onNoResult={this.handleNoResult}
                onSelectSuggest={this.handleSelectSuggest}
                onStatusUpdate={this.handleStatusUpdate}
                textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                customRender={prediction => (
                  <div style={{ color: "black" }}>
                    {prediction
                      ? prediction.description
                      : "My custom no results text"}
                  </div>
                )}
              >
                <input
                  type="text"
                  value={value}
                  placeholder="pick up"
                  name="pickUp"
                  onChange={this.handleInputChange}
                  onFocus={() => this.props.toggleInputResults("pickUp")}
                />
                <br />
                <input
                  type="text"
                  value={value}
                  name="dropOff"
                  placeholder="drop off"
                  onChange={this.handleInputChange}
                  onFocus={() => this.props.toggleInputResults("dropOff")}
                />
              </GooglePlacesSuggest>
            )
          }
        />
        {/* {this.state.destination.lat &&
          this.state.origins.lat &&
          this.getMatrix()} */}
        {this.props.inputData && (
          <p>
            You are travelling from {this.props.inputData.pickUp} to{" "}
            {this.props.inputData.dropOff}
          </p>
        )}
      </>
    );
  }
}
export default connect(
  state => ({
    inputData: state.home.inputData,
    resultTypes: state.home.resultTypes
  }),
  { getInputData, toggleInputResults }
)(GoogleSuggest);
