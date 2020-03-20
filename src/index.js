import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'iframe-resizer';

import configureStore from './state/store';
// Containers
import DefaultLayout from './containers/DefaultLayout';
import './index.css';

// Bootstrap the store
var Store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <DefaultLayout />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
