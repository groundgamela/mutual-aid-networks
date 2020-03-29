import { createSelector } from 'reselect';

export const getSelectedCategories = (state) => state.selections.categories;
// export const getViewState = state => state.selections.view;
export const getSearchLocation = state => state.selections.searchLocation;
export const getHoveredPointId = state => state.selections.hoveredPointId;
export const getUsState = state => state.selections.usState;

export const getViewState = createSelector([getSearchLocation, getUsState], (searchLocation, usState) => {
    if (searchLocation.lat || usState) {
        return 'list';
    }
    return 'default';
})