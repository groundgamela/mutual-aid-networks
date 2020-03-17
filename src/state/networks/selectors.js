import { createSelector } from 'reselect';
import { filter } from 'lodash';

import { getSelectedCategories } from '../selections/selectors';

export const getAllNetworks = state => state.networks.allNetworks;

export const getFilteredNetworks = createSelector([getAllNetworks, getSelectedCategories], (networks, categories) => {
    return filter(networks, (network) => {
        return categories.includes(network.category)
    })
})