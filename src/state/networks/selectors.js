import { createSelector } from 'reselect';
import { filter } from 'lodash';
import {
    computeDistanceBetween,
    LatLng
} from 'spherical-geometry-js';

import { getSelectedCategories, getSearchLocation } from '../selections/selectors';

export const getAllNetworks = state => state.networks.allNetworks;

export const getFilteredNetworks = createSelector([getAllNetworks, getSelectedCategories], (networks, categories) => {
    return filter(networks, (network) => {
        return categories.includes(network.category)
    })
})

export const getVisibleCards = createSelector(
    [
        getFilteredNetworks,
        getSearchLocation,
    ],
    (
        filteredNetworks,
        location,
    ) => {
        console.log(location)
        if (!location.lat) {
            return [];
        }
        const lookup = new LatLng(Number(location.lat), Number(location.lng));
        const maxMeters = 50 * 1609.34; // Convert miles to meters before filtering
        return filteredNetworks.filter((currentEvent) => {
            const curDistance = computeDistanceBetween(
                lookup,
                new LatLng(Number(currentEvent.lat), Number(currentEvent.lng)),
            );
            return curDistance < maxMeters;
        }).sort((a, b) => {
            const aDistance = computeDistanceBetween(
                lookup,
                new LatLng(Number(a.lat), Number(a.lng)),
            );
            const bDistance = computeDistanceBetween(
                lookup,
                new LatLng(Number(b.lat), Number(b.lng)),
            );
            return aDistance - bDistance;
        });
    },
);