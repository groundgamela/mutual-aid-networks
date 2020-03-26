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
} from "./reducers";
import {
  GENERAL,
  REQUEST_SUPPORT,
  OFFER_SUPPORT,
  INFORMATION
} from "../constants";
import {
  setPageOfNetworks
} from "./actions";

const fetchNetworks = createLogic({
  type: REQUEST_NETWORKS,

  process(deps, dispatch, done) {
    const {
      httpClient,
    } = deps;
    let globalIndex = 0;
    const processOnePage = (snapshot) => {
      return snapshot.body.documents.map((doc) => {
        globalIndex++;
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
          id: globalIndex,
          category: category,
        }
      });
    }

    const requestPage = (url) => {
      return httpClient.get(url)
        .then((snapshot) => {
          const pageOfNetworks = processOnePage(snapshot)
          dispatch(setPageOfNetworks(pageOfNetworks))
          if (snapshot.body.nextPageToken) {
            const url = `https://firestore.googleapis.com/v1/projects/townhallproject-86312/databases/(default)/documents/mutual_aid_networks/?pageToken=${snapshot.body.nextPageToken}`
            return requestPage(url)
          }
          done();
        })
    }

    requestPage('https://firestore.googleapis.com/v1/projects/townhallproject-86312/databases/(default)/documents/mutual_aid_networks/')
  }
})


export default [
  fetchNetworks,
];