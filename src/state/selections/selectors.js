import { createSelector } from 'reselect';

export const getSelectedCategories = (state) => state.selections.categories;
// export const getViewState = state => state.selections.view;
export const getSearchLocation = state => state.selections.searchLocation;
export const getHoveredPointId = state => state.selections.hoveredPointId;

export const getViewState = createSelector([getSearchLocation], (searchLocation) => {
    if (searchLocation.lat) {
        return 'list';
    }
    return 'default';
})