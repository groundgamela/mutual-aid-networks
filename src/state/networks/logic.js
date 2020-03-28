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
  setPageOfNetworks
} from "./actions";

const fetchNetworks = createLogic({
  type: REQUEST_NETWORKS,

  process(deps, dispatch, done) {
    const {
      httpClient,
      firebaseUrl,
    } = deps;
    const processOnePage = (snapshot) => {
      return snapshot.body.documents.map((doc) => {
        const data = doc.fields;
        const unpackedData = mapValues(data, (object) => {
          let newValues = values(object)[0];
          if (object.integerValue) {
            newValues = Number(newValues);
          }
          if (newValues.values) {
            newValues = map(newValues.values, obj => {
              return values(obj)[0];
            });
          }
          return newValues;
        })
        return unpackedData;
      });
    }

    const requestPage = (url) => {
      return httpClient.get(url)
        .then((snapshot) => {
          const pageOfNetworks = processOnePage(snapshot)
          dispatch(setPageOfNetworks(pageOfNetworks))
          if (snapshot.body.nextPageToken) {
            const url = `${firebaseUrl}/?pageToken=${snapshot.body.nextPageToken}`
            return requestPage(url)
          }
          done();
        })
    }
    console.log(firebaseUrl)
    requestPage(firebaseUrl)
  }
})


export default [
  fetchNetworks,
];