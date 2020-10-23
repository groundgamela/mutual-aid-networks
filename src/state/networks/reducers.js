import {
  makeConstant
} from "../../utils";
const STATE_BRANCH = 'NETWORKS';

export const REQUEST_NETWORKS = makeConstant(STATE_BRANCH, "REQUEST_NETWORKS");
export const SET_NETWORKS = makeConstant(STATE_BRANCH, "SET_NETWORKS");
export const REQUEST_FAILED = makeConstant(STATE_BRANCH, "REQUEST_FAILED");
export const SET_PAGE_OF_NETWORKS = makeConstant(STATE_BRANCH, "SET_PAGE_OF_NETWORKS");

const initialState = {
  allNetworks: [],
};


const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NETWORKS:
      return {
        ...state,
        allNetworks: payload,
        error: null
      };
    case SET_PAGE_OF_NETWORKS:
      return {
        ...state,
        allNetworks: [...state.allNetworks, ...payload],
        error: null
      };
    case REQUEST_FAILED:
      console.log(`REQUEST_FAILED: ${payload}`);
      return {
        ...state,
        error: payload
      };
     default:
      return state;
  }
};

export default eventReducer;