import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setName,
  getCurrentLocation,
  getInputData,
  toggleInputResults
} from "../actions";
import Home from "./Home";
import GoogleSuggest from "./GoogleSuggest";

class MapContainer extends Component {
  componentDidMount() {
    this.props.setName();
    //this.props.getCurrentLocation();
  }
  render() {
    // console.log(this.props);
    if (this.props.region) console.log("REGION:", this.props.region);
    //console.log(this.state);
    return (
      <>
        <div>Hello {this.props.name}</div>

        {/* <GoogleSuggest /> */}
        <Home />
      </>
    );
  }
}
export default connect(
  state => ({
    name: state.home.name,
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || {}
  }),
  { setName, getCurrentLocation, getInputData, toggleInputResults }
)(MapContainer);
