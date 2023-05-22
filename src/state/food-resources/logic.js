import {
  createLogic
} from "redux-logic";

import {
  REQUEST_FOOD_RESOURCES,
  SET_FOOD_RESOURCES,
} from "./reducers";

const fetchNetworks = createLogic({
  type: REQUEST_FOOD_RESOURCES,
  processOptions: {
    successType: SET_FOOD_RESOURCES,
  },
  process(deps) {
    const {
      getCollection,
    } = deps;
    return getCollection("food_resources")
      .then((snapshot) => {
        const allFoodResources = [];
         let id = 0;
          snapshot.forEach((doc, index) => {
            const data = doc.data();
            data.id = id;
            id++;
            allFoodResources.push(data)
          })
          return allFoodResources;
      })
  }
})


export default [
  fetchNetworks,
];