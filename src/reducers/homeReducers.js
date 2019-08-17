import {
  SET_NAME,
  GET_POSITION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULTS,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS
} from "../constants";
import update from "react-addons-update";

const initialState = {
  selectedAddress: {},
  region: {},
  inputData: {},
  resultTypes: {},
  predictions: {},
  fare: {},
  booking: {},
  name: ""
};
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return update(state, {
        name: { $set: action.payload }
      });

    case GET_POSITION:
      return update(state, {
        region: {
          $set: action.payload
        }
      });
    case GET_INPUT: {
      console.log("REDUCER:", action.payload);
      const { key, value } = action.payload;
      console.log("reducer:", key, value);
      return update(state, {
        inputData: {
          [key]: {
            $set: value
          }
        }
      });
    }
    case TOGGLE_SEARCH_RESULTS:
      {
        if (action.payload === "pickUp") {
          return update(state, {
            resultTypes: {
              pickUp: { $set: true },
              dropOff: { $set: false },
              predictions: { $set: null }
            }
          });
        }
        if (action.payload === "dropOff") {
          return update(state, {
            resultTypes: {
              pickUp: { $set: false },
              dropOff: { $set: true },
              predictions: { $set: null }
            }
          });
        }
      }
      break;
    default:
      return state;
  }
}
