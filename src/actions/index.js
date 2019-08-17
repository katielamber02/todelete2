import {
  SET_NAME,
  GET_POSITION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULTS,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS
} from "../constants";

export const setName = () => {
  return {
    type: SET_NAME,
    payload: "MARY"
  };
};

export const getCurrentLocation = () => {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: GET_POSITION,
          payload: position
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
};
export const getInputData = payload => {
  return {
    type: GET_INPUT,
    payload
  };
};
export const toggleInputResults = payload => {
  return {
    type: TOGGLE_SEARCH_RESULTS,
    payload
  };
};
