import React from 'react';
import {
  connect
} from 'react-redux';

import networkStateBranch from '../state/networks';
import selectionStateBranch from '../state/selections';

class DefaultLayout extends React.Component {
  componentDidMount() {
    const {
      requestNetworks
    } = this.props;
    requestNetworks();
  }
  render() {
    console.log('all', this.props.allNetworks)
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allNetworks: networkStateBranch.selectors.getAllNetworks(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestNetworks: () => dispatch(networkStateBranch.actions.requestNetworks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
