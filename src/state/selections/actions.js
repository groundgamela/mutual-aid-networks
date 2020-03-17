import { FILTER_BY_CATEGORY } from "./reducers";

export const filterByCategory = (payload) => ({
    type: FILTER_BY_CATEGORY,
    payload
});