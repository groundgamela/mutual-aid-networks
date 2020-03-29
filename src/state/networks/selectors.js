import { createSelector } from 'reselect';
import { filter } from 'lodash';
import {
    computeDistanceBetween,
    LatLng
} from 'spherical-geometry-js';

import { getSelectedCategories, getSearchLocation, getUsState } from '../selections/selectors';
const mapboxgl = window.mapboxgl;

export const getAllNetworks = state => state.networks.allNetworks;

export const getFilteredNetworks = createSelector([getAllNetworks, getSelectedCategories], (networks, categories) => {
    if (!categories.length) {
        return [];
    }
    return filter(networks, (network) => {
        return categories.includes(network.category)
    })
})


export const getNetworksInArea = createSelector([getAllNetworks, getSearchLocation, getUsState], (allNetworks, location, usState) => {
            if (!location.lat && !usState) {
                return [];
            }
            // statewide search
            if (!location.lat) {
                return allNetworks.filter((network) => network.state && network.state === usState);
                
            }
            const lookup = new LatLng(Number(location.lat), Number(location.lng));
            const maxMeters = 50 * 1609.34; // Convert miles to meters before filtering
            return allNetworks.filter((network) => {
                // include statewide networks
                if (network.state && !network.city && network.state === usState) {
                    return true;
                } 

                const curDistance = computeDistanceBetween(
                    lookup,
                    new LatLng(Number(network.lat), Number(network.lng)),
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
    
})

export const getVisibleCards = createSelector([getNetworksInArea, getSelectedCategories], (networks, categories) => {
    if (!categories.length) {
        return [];
    }
    return filter(networks, (network) => {
        return categories.includes(network.category)
    })
})

export const getBoundingBox = createSelector([getNetworksInArea], (cards) => {
    if (!cards.length) {
        return null;
    }
    return cards.reduce((acc, cur, index) => {
        if (index > 0) {
            acc = acc.extend(new mapboxgl.LngLatBounds(cur.bbox));
        }
        return acc;
    }, new mapboxgl.LngLatBounds(cards[0].bbox));
})