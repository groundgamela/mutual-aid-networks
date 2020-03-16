 import {
   makeConstant
 } from "../../utils";
 const STATE_BRANCH = 'SELECTIONS';

const initialState = {
  searchLatLng: '',
  category: 'General',
  language: '',
  community: ''
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default selectionReducer;