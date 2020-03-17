 import {
   makeConstant
 } from "../../utils";

const STATE_BRANCH = 'SELECTIONS';
export const SET_CATEGORY_FILTERS = makeConstant(STATE_BRANCH, 'FILTER_BY_CATEGORY')
export const options = ["General", "Support Request", "Support Offer", "Information"];

const initialState = {
  searchLatLng: '',
  categories: options,
  language: '',
  community: ''
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_FILTERS: 
      return {
        ...state, 
        categories: action.payload,
      
    }
    default:
      return state;
  }
};

export default selectionReducer;