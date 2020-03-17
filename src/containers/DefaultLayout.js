import React from 'react';
import {
  connect
} from 'react-redux';
import { Layout, Menu } from 'antd';

import networkStateBranch from '../state/networks';
import selectionStateBranch from '../state/selections';
import MapView from '../components/Map';
import StartNetwork from '../components/StartNetwork';
import Filters from '../components/Filters';

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
      setViewState,
      viewState,
    } = this.props;
    if (!filteredNetworks.length) {
      return null;
    }
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="main-container">
            <Filters 
              setFilters={setFilters}
              selectedCategories={selectedCategories}
            />
            <MapView 
              setViewState={setViewState}
              networks={filteredNetworks}
              viewState={viewState}
            />
            <div className="tagline">Find Mutual Aid Networks and other community self-support projects near you. Join these important efforts, offer resources, or submit needs requests.</div>
            <StartNetwork />
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
});

const mapDispatchToProps = (dispatch) => ({
  requestNetworks: () => dispatch(networkStateBranch.actions.requestNetworks()),
  setFilters: (payload) => dispatch(selectionStateBranch.actions.setCategoryFilters(payload)),
  setViewState: (payload) => dispatch(selectionStateBranch.actions.setViewState(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
