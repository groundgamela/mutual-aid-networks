import React from 'react';
import {
  connect
} from 'react-redux';

import networkStateBranch from '../state/networks';
import selectionStateBranch from '../state/selections';
import MapView from '../components/MapView';

class DefaultLayout extends React.Component {
  componentDidMount() {
    const {
      requestNetworks
    } = this.props;
    requestNetworks();
  }
  render() {
    const {
      allNetworks
    } = this.props;
    if (!allNetworks.length) {
      return null;
    }
    return (
      <div className="main-container">
        <MapView 
          networks={allNetworks}
        />
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
