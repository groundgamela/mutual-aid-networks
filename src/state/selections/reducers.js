 import {
   makeConstant
 } from "../../utils";

 const STATE_BRANCH = 'SELECTIONS';
 export const FILTER_BY_CATEGORY = makeConstant(STATE_BRANCH, 'FILTER_BY_CATEGORY')

const initialState = {
  searchLatLng: '',
  category: 'General',
  language: '',
  community: ''
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_CATEGORY: {
      return {
        ...state, 
        category: action.payload,
      }
    }
    default:
      return state;
  }
};

export default selectionReducer;