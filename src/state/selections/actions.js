import {
    SET_CATEGORY_FILTERS,
    SET_LAT_LNG,
    SET_HOVERED_POINT
} from "./reducers";

export const setCategoryFilters = (payload) => ({
    type: SET_CATEGORY_FILTERS,
    payload
});

export const setLatLng = (payload) => ({
    type: SET_LAT_LNG,
    payload,
});

export const setHoveredPoint = (payload) => ({
    type: SET_HOVERED_POINT,
    payload,
});