import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
// var distance = require("google-distance-matrix");

// var origins = ["San Francisco CA", "40.7421,-73.9914"];
// var destinations = [
//   "New York NY",
//   "Montreal",
//   "41.8337329,-87.7321554",
//   "Honolulu"
// ];

// distance.key("AIzaSyDBYJmYQkG7IuhZcUNTo-yWNB6ix1hstzA");
// distance.units("imperial");

// distance.matrix(origins, destinations, function(err, distances) {
//   if (err) {
//     return console.log(err);
//   }
//   if (!distances) {
//     return console.log("no distances");
//   }
//   if (distances.status == "OK") {
//     for (var i = 0; i < origins.length; i++) {
//       for (var j = 0; j < destinations.length; j++) {
//         var origin = distances.origin_addresses[i];
//         var destination = distances.destination_addresses[j];
//         if (distances.rows[0].elements[j].status == "OK") {
//           var distance = distances.rows[i].elements[j].distance.text;
//           console.log(
//             "Distance from " + origin + " to " + destination + " is " + distance
//           );
//         } else {
//           console.log(destination + " is not reachable by land from " + origin);
//         }
//       }
//     }
//   }
// });

const mapStyles = {
  width: "100%",
  height: "80%"
};

class Home extends Component {
  getter() {
    const { google } = this.props;
    const service = new google.maps.DistanceMatrixService();

    var travelMode = this.props.google.maps.TravelMode.DRIVING;

    service.getDistanceMatrix(
      {
        origins: [{ lat: 49.839683, lng: 24.029717000000005 }],
        destinations: [{ lat: 50.4475854, lng: 30.522025699999972 }],
        travelMode: travelMode
      },
      (response, status) => {
        console.log("response", response);
        console.log("status", status);
      }
    );
  }

  // function callback(response, status) {
  //   if (status == "OK") {
  //     var origins = response.originAddresses;
  //     var destinations = response.destinationAddresses;

  //     for (var i = 0; i < origins.length; i++) {
  //       var results = response.rows[i].elements;
  //       for (var j = 0; j < results.length; j++) {
  //         var element = results[j];
  //         var distance = element.distance.text;
  //         console.log(distance);
  //         var duration = element.duration.text;
  //         var from = origins[i];
  //         var to = destinations[j];
  //       }
  //     }
  //   }
  // }

  render() {
    return <div>Text</div>;
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDBYJmYQkG7IuhZcUNTo-yWNB6ix1hstzA"
})(Home);
