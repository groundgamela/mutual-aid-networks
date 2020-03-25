import {
  createLogic
} from "redux-logic";
import {
  mapValues,
  values,
  map,
} from 'lodash';
import {
  REQUEST_NETWORKS,
  SET_NETWORKS,
  REQUEST_FAILED
} from "./reducers";
import { GENERAL, REQUEST_SUPPORT, OFFER_SUPPORT, INFORMATION } from "../constants";
import { object } from "prop-types";

const fetchNetworks = createLogic({
  type: REQUEST_NETWORKS,
  processOptions: {
    successType: SET_NETWORKS,
    failType: REQUEST_FAILED,
  },
  process(deps) {
    const {
      httpClient,
    } = deps;
    const allNetworks = [];

    const requestPage = (token) => {
      return httpClient.get(`https://firestore.googleapis.com/v1/projects/townhallproject-86312/databases/(default)/documents/mutual_aid_networks/?pageToken=${token}`)
         .then((snapshot) => {
               snapshot.body.documents.forEach((doc, index) => {
                 const data = doc.fields;
                 const unpackedData = mapValues(data, (object) => {
                   let newValues = values(object)[0];
                   if (newValues.values) {
                     newValues = map(newValues.values, obj => {
                       return values(obj)[0];
                     });
                   }
                   return newValues;
                 })
                 let category;
                 if (unpackedData.generalForm || (unpackedData.supportRequestForm && unpackedData.supportOfferForm)) {
                   category = GENERAL;
                 } else if (unpackedData.supportRequestForm) {
                   category = REQUEST_SUPPORT;
                 } else if (unpackedData.supportOfferForm) {
                   category = OFFER_SUPPORT;
                 } else {
                   category = INFORMATION;
                 }
                 allNetworks.push({
                   ...unpackedData,
                   id: index,
                   category: category,
                 })
               });
               if (snapshot.body.nextPageToken) {
                  return requestPage(snapshot.body.nextPageToken)
               }
               return allNetworks;
              })
            }
    
    return httpClient.get('https://firestore.googleapis.com/v1/projects/townhallproject-86312/databases/(default)/documents/mutual_aid_networks/')
      .then((snapshot) => {
        if (snapshot.body.nextPageToken) {
          return requestPage(snapshot.body.nextPageToken);
        }
        return allNetworks;
      })
  }
})


export default [
  fetchNetworks,
];