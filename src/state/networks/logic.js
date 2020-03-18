import {
  createLogic
} from "redux-logic";

import {
  REQUEST_NETWORKS,
  SET_NETWORKS,
  REQUEST_FAILED
} from "./reducers";
import { GENERAL, REQUEST_SUPPORT, OFFER_SUPPORT, INFORMATION } from "../constants";

const fetchNetworks = createLogic({
  type: REQUEST_NETWORKS,
  processOptions: {
    successType: SET_NETWORKS,
    failType: REQUEST_FAILED,
  },
  process(deps) {
    const {
      firestore,
    } = deps;
    return firestore.collection('mutual_aid_networks').get()
      .then((snapshot) => {
        const allNetworks = snapshot.docs.map((doc, index) => {
          const data = doc.data();
          let category;
          console.log(data.generalForm, data.supportOfferForm, data.supportRequestForm)
          if (data.generalForm || (data.supportRequestForm && data.supportOfferForm)) {
            category = GENERAL;
          } else if (data.supportRequestForm) {
            category = REQUEST_SUPPORT;
          } else if (data.supportOfferForm) {
            category = OFFER_SUPPORT;
          } else {
            category = INFORMATION;
          }
          return {
            ...data,
            id: index,
            category: category,
          }
        });
        return allNetworks;
      })
  }
})


export default [
  fetchNetworks,
];