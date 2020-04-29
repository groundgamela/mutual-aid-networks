import {
  makeConstant
} from "../../utils";
import { GENERAL, REQUEST_SUPPORT, OFFER_SUPPORT, INFORMATION } from "../constants";

const STATE_BRANCH = 'SELECTIONS';
export const SET_CATEGORY_FILTERS = makeConstant(STATE_BRANCH, 'FILTER_BY_CATEGORY');
export const SET_LAT_LNG = makeConstant(STATE_BRANCH, 'SET_LAT_LNG');
export const SET_HOVERED_POINT = makeConstant(STATE_BRANCH, 'SET_HOVERED_POINT');
export const SET_SITE_LANGUAGE = makeConstant(STATE_BRANCH, "SET_SITE_LANGUAGE");
export const SET_US_STATE = makeConstant(STATE_BRANCH, "SET_US_STATE");
export const RESET_TO_DEFAULTS = makeConstant(STATE_BRANCH, "RESET_TO_DEFAULTS");

export const options = [GENERAL, REQUEST_SUPPORT, OFFER_SUPPORT, INFORMATION];

const initialState = {
  view: 'default',
  categories: options,
  language: 'english',
  community: '',
  searchLocation: {},
  hoveredPointId: null,
  usState: '',
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_FILTERS:
      return {
        ...state,
        categories: action.payload,
      }
    case SET_LAT_LNG:
      return {
        ...state,
        searchLocation: action.payload.center,
        usState: action.payload.usState,
      }
    case RESET_TO_DEFAULTS:
      return {
        ...state,
        searchLocation: {},
        usState: ''
      }
    case SET_HOVERED_POINT:
      return {
        ...state,
        hoveredPointId: action.payload,
      }
    case SET_SITE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      }
    default:
      return state;
  }
};

export default selectionReducer;
