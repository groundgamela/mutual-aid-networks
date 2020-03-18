import React from 'react';
import {
  connect
} from 'react-redux';
import { Layout, Menu } from 'antd';

import networkStateBranch from '../state/networks';
import selectionStateBranch from '../state/selections';
import MapView from '../components/Map';
import SubmitNetwork from '../components/SubmitNetwork';
import Filters from '../components/Filters';
import ListView from '../components/ListView';

import './style.scss';

const { Header, Content, Footer } = Layout;

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
      filteredNetworks,
      viewState,
      setLatLng,
      visibleCards,
      allNetworks,
    } = this.props;
    
    if (!allNetworks.length) {
      return null;
    }
    // viewState --> list or default
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">Mutual Aid Hub</div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Guides and other resources</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="main-container">
            <Filters 
              setFilters={setFilters}
              selectedCategories={selectedCategories}
            />
            <div className={`interactive-content-${viewState}`}>
              <MapView
                networks={filteredNetworks}
                viewState={viewState}
                setLatLng={setLatLng}
              />
              <ListView 
                visibleCards={visibleCards}
              />
            </div>
            <div className="tagline">Find Mutual Aid Networks and other community self-support projects near you. Join these important efforts, offer resources, or submit needs requests.</div>
            <SubmitNetwork />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <div class="footer-text">
            We list these networks as a public resource. We cannot verify or vouch for any network or individual offerings. Please exercise all necessary judgement when interacting with community members not previously known to you.
          </div>
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredNetworks: networkStateBranch.selectors.getFilteredNetworks(state),
  selectedCategories: selectionStateBranch.selectors.getSelectedCategories(state),
  viewState: selectionStateBranch.selectors.getViewState(state),
  searchLocation: selectionStateBranch.selectors.getSearchLocation(state),
  visibleCards: networkStateBranch.selectors.getVisibleCards(state),
  allNetworks: networkStateBranch.selectors.getAllNetworks(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestNetworks: () => dispatch(networkStateBranch.actions.requestNetworks()),
  setFilters: (payload) => dispatch(selectionStateBranch.actions.setCategoryFilters(payload)),
  setLatLng: (payload) => dispatch(selectionStateBranch.actions.setLatLng(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
