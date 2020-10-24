import { createSelector } from 'reselect';
import { filter } from 'lodash';
import {
    computeDistanceBetween,
    LatLng
} from 'spherical-geometry-js';

import { getSelectedCategories, getSearchLocation, getUsState } from '../selections/selectors';
import { getAllFoodResources } from '../food-resources/selectors';
import { FOOD_RESOURCE, NETWORK } from '../constants';
const mapboxgl = window.mapboxgl;

export const getAllNetworks = state => state.networks.allNetworks;

export const getAllResourcesAndNetworks = createSelector([getAllNetworks, getAllFoodResources], (networks, resources) => [...networks, ...resources])

export const getFilteredNetworks = createSelector([getAllNetworks, getSelectedCategories], (networks, categories) => {
    if (!categories.length) {
        return [];
    }
    return filter(networks, (network) => {
        return categories.includes(network.category)
    })
})

export const getBoundingBox = createSelector([getAllResourcesAndNetworks, getSearchLocation, getUsState], (allResourcesAndNetworks, location, usState) => {
    if (!location.lat && !usState) {
        return null;
    }
    const lookup = new LatLng(Number(location.lat), Number(location.lng));

    if (!allResourcesAndNetworks.length) {
        return null;
    }
    allResourcesAndNetworks.sort((a, b) => {
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
    const twelveClosest = allResourcesAndNetworks.slice(0, 12);
    return twelveClosest.reduce((acc, cur, index) => {
        if (cur.category === NETWORK && !cur.city) {
            // don't zoom to statewide
            return acc;
        }
        if (index > 0) {
            console.log(cur.bbox, new mapboxgl.LngLatBounds(cur.bbox))
            acc = acc.extend(new mapboxgl.LngLatBounds(cur.bbox));
        }
        return acc;
    }, new mapboxgl.LngLatBounds(twelveClosest[0].bbox));
})

export const getNetworksInArea = createSelector(
    [getAllResourcesAndNetworks, getSearchLocation, getBoundingBox, getUsState], 
    (allNetworks, location, boundingBox, usState) => {
            if (!location.lat && !usState) {
                return [];
            }
            const networksInState = allNetworks.filter((network) => network.state && network.state === usState);
            // statewide search
            if (!location.lat) {
                return networksInState
                
            }
            const stateWide = networksInState.filter((network) => {
                // include statewide networks
                if (network.state && !network.city && network.state === usState) {
                    return true;
                }
                return false;
            });
            const visible =  allNetworks.filter((item) => {
                const position = new mapboxgl.LngLat(Number(item.lng), Number(item.lat));
                if (item.category === FOOD_RESOURCE) {
                    console.log(item.title)
                    console.log(position, boundingBox.toArray(), boundingBox.contains(position))
                }
                return boundingBox.contains(position);
           
            });
            return [...visible, ...stateWide]
    
})

export const getVisibleCards = createSelector([getNetworksInArea, getSelectedCategories], (networks, categories) => {
    if (!categories.length) {
        return [];
    }
    return filter(networks, (network) => {
        return categories.includes(network.category)
    })
})

