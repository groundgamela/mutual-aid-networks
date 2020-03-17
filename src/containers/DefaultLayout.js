import React from 'react';
import {
  connect
} from 'react-redux';

import networkStateBranch from '../state/networks';
import selectionStateBranch from '../state/selections';
import MapView from '../components/Map';
import Filters from '../components/Filters';

class DefaultLayout extends React.Component {
  componentDidMount() {
    const {
      requestNetworks
    } = this.props;
    requestNetworks();
  }
  render() {
    const {
      setFilters,
      selectedCategories,
      filteredNetworks
    } = this.props;
    if (!filteredNetworks.length) {
      return null;
    }
    return (
      <div className="main-container">
        <Filters 
          setFilters={setFilters}
          selectedCategories={selectedCategories}
          />
        <MapView 
          networks={filteredNetworks}
        />
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredNetworks: networkStateBranch.selectors.getFilteredNetworks(state),
  selectedCategories: selectionStateBranch.selectors.getSelectedCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestNetworks: () => dispatch(networkStateBranch.actions.requestNetworks()),
  setFilters: (payload) => dispatch(selectionStateBranch.actions.setCategoryFilters(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
