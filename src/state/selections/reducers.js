import {
  makeConstant
} from "../../utils";

const STATE_BRANCH = 'SELECTIONS';
export const SET_CATEGORY_FILTERS = makeConstant(STATE_BRANCH, 'FILTER_BY_CATEGORY');
export const SET_LAT_LNG = makeConstant(STATE_BRANCH, 'SET_LAT_LNG');
export const SET_HOVERED_POINT = makeConstant(STATE_BRANCH, 'SET_HOVERED_POINT');

export const options = ["General", "Support Request", "Support Offer", "Information"];

const initialState = {
  view: 'default',
  categories: options,
  language: '',
  community: '',
  searchLocation: {},
  hoveredPointId: null,
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
          searchLocation: action.payload,
        }
      case SET_HOVERED_POINT: 
        return {
          ...state,
          hoveredPointId: action.payload,
        }
        default:
          return state;
  }
};

export default selectionReducer;