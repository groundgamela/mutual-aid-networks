import { createSelector } from 'reselect';

export const getSelectedCategories = (state) => state.selections.categories;