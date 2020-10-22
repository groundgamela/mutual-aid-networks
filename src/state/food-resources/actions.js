import { REQUEST_FOOD_RESOURCES, SET_PAGE_OF_FOOD_RESOURCES } from './reducers';


export const requestFoodResources = () => ({
  type: REQUEST_FOOD_RESOURCES,
});

export const setPageOfNetworks = (payload) => ({
  type: SET_PAGE_OF_FOOD_RESOURCES,
  payload
})