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
  REQUEST_FAILED,
  SET_PAGE_OF_NETWORKS
} from "./reducers";
import { GENERAL, REQUEST_SUPPORT, OFFER_SUPPORT, INFORMATION } from "../constants";
import { object } from "prop-types";
import { setPageOfNetworks } from "./actions";

const fetchNetworks = createLogic({
  type: REQUEST_NETWORKS,

  process(deps, dispatch, done) {
    const {
      httpClient,
    } = deps;

    const requestPage = (token) => {
      return httpClient.get(`https://firestore.googleapis.com/v1/projects/townhallproject-86312/databases/(default)/documents/mutual_aid_networks/?pageToken=${token}`)
         .then((snapshot) => {
               const pageOfNetworks = snapshot.body.documents.map((doc, index) => {
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
                 return {
                   ...unpackedData,
                   id: index,
                   category: category,
                 }
               });
               console.log(pageOfNetworks)
               dispatch(setPageOfNetworks(pageOfNetworks))
               if (snapshot.body.nextPageToken) {
                  return requestPage(snapshot.body.nextPageToken)
               }
               done();
              })
            }
    
    return httpClient.get('https://firestore.googleapis.com/v1/projects/townhallproject-86312/databases/(default)/documents/mutual_aid_networks/')
      .then((snapshot) => {
        if (snapshot.body.nextPageToken) {
          return requestPage(snapshot.body.nextPageToken);
        }
        return done();
      })
  }
})


export default [
  fetchNetworks,
];