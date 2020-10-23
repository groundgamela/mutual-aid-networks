import {
  makeConstant
} from "../../utils";
const STATE_BRANCH = 'FOOD_RESOURCES';

export const REQUEST_FOOD_RESOURCES = makeConstant(STATE_BRANCH, "REQUEST_FOOD_RESOURCES");
export const SET_FOOD_RESOURCES = makeConstant(STATE_BRANCH, "SET_FOOD_RESOURCES");
export const REQUEST_FAILED = makeConstant(STATE_BRANCH, "REQUEST_FAILED");
export const SET_PAGE_OF_FOOD_RESOURCES = makeConstant(STATE_BRANCH, "SET_PAGE_OF_FOOD_RESOURCES");

const initialState = {
  allFoodResources: [],
};


const foodResourcesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FOOD_RESOURCES:
      return {
        ...state,
        allFoodResources: payload,
        error: null
      };
    case SET_PAGE_OF_FOOD_RESOURCES:
      return {
        ...state,
        allFoodResources: [...state.allFoodResources, ...payload],
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

export default foodResourcesReducer;