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
      firestore,
    } = deps;
    return firestore.collection("food_resources").get()
      .then((snapshot) => {
        const allFoodResources = [];
          snapshot.forEach((doc) => {
            allFoodResources.push(doc.data())
          })
          return allFoodResources;
      })
  }
})


export default [
  fetchNetworks,
];