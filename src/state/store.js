import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import request from 'superagent';

import networks from './networks';
import selections from './selections';


import { firebaseUrl } from '../state/constants';
import {
  firebasedb,
  firestore,
} from '../utils/firebaseinit';

const reducers = {
  networks: networks.reducers,
  selections: selections.reducers,
};

const logics = [
  ...networks.logics,
  ...selections.logics,
];

const reduxLogicDependencies = {
  firebaseUrl: firebaseUrl,
  firebasedb,
  firestore,
  httpClient: request,
};

const logicMiddleware = createLogicMiddleware(logics, reduxLogicDependencies);

let middleware = applyMiddleware(
  logicMiddleware
);

if (process.env.NODE_ENV === `development` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware);
}

export default () => {
  const store = createStore(
    combineReducers(reducers),
    middleware
  );

  return store;
};