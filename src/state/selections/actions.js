import {
    SET_CATEGORY_FILTERS,
    SET_LAT_LNG,
    SET_HOVERED_POINT,
    SET_SITE_LANGUAGE,
    SET_US_STATE,
    RESET_TO_DEFAULTS
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

export const setSiteLanguage = (payload) => ({
    type: SET_SITE_LANGUAGE,
    payload,
});

export const setUsState = (payload) => ({
    type: SET_US_STATE,
    payload,
});

export const resetToDefaultView = () => ({
    type: RESET_TO_DEFAULTS,
});