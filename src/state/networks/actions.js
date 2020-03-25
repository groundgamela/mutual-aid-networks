import {
  REQUEST_NETWORKS, SET_PAGE_OF_NETWORKS,
} from './reducers';


export const requestNetworks = () => ({
  type: REQUEST_NETWORKS,
});

export const setPageOfNetworks = (payload) => ({
  type: SET_PAGE_OF_NETWORKS,
  payload
})