import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import request from 'superagent';

import networks from './networks';
import selections from './selections';
import foodResources from './food-resources';
import {
  getCollection
} from "../utils/firebaseinit"

import { firebaseUrl } from '../state/constants';

const reducers = {
  networks: networks.reducers,
  foodResources: foodResources.reducers,
  selections: selections.reducers,
};

const logics = [
  ...networks.logics,
  ...selections.logics,
  ...foodResources.logics
];

const reduxLogicDependencies = {
  firebaseUrl: firebaseUrl,
  httpClient: request,
  getCollection,
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