import { SET_CATEGORY_FILTERS, SET_VIEW_STATE, SET_LAT_LNG } from "./reducers";

export const setCategoryFilters = (payload) => ({
    type: SET_CATEGORY_FILTERS,
    payload
});

export const setViewState = (payload) => ({
    type: SET_VIEW_STATE,
    payload
});

export const setLatLng = (payload) => ({
    type: SET_LAT_LNG,
    payload,
});