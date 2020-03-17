import React from 'react';
import {
  connect
} from 'react-redux';
import { Layout, Menu } from 'antd';

import networkStateBranch from '../state/networks';
import selectionStateBranch from '../state/selections';
import MapView from '../components/MapView';
import StartNetwork from '../components/StartNetwork';

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
      allNetworks
    } = this.props;
    if (!allNetworks.length) {
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
            <MapView 
              networks={allNetworks}
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
  allNetworks: networkStateBranch.selectors.getAllNetworks(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestNetworks: () => dispatch(networkStateBranch.actions.requestNetworks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
