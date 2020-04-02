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
import NoWebGl from '../components/NoWebGl';
import NetworksTable from '../components/NetworksTable';

const { Header, Content, Footer } = Layout;
const mapboxgl = window.mapboxgl;
class DefaultLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 'map'
    }
  }

  componentDidMount() {
    const {
      requestNetworks
    } = this.props;
    requestNetworks();
  }

  handleNav = (e) => {
    const {
      resetToDefaultView
    } = this.props
    this.setState({currentTab: e.key})
    resetToDefaultView()
  }

  handleLogoClick = () => {
    const {
      resetToDefaultView
    } = this.props
    this.setState({currentTab: 'map'})
    resetToDefaultView()
  }

  render() {
    const {
      setFilters,
      selectedCategories,
      filteredNetworks,
      viewState,
      setLatLng,
      setUsState,
      visibleCards,
      allNetworks,
      setHoveredPoint,
      hoveredPointId,
      masterBbox,
      resetToDefaultView
    } = this.props;
    
    if (!allNetworks.length) {
      return null;
    }
    // viewState --> list or default
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" onClick={this.handleLogoClick}></div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            onClick={this.handleNav}
            selectedKeys={[this.state.currentTab]}
          >
            <Menu.Item key="map">Map</Menu.Item>
            <Menu.Item key="networks">Networks</Menu.Item>
            {/* <Menu.Item key="1">Guides and other resources</Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="main-container">
          {this.state.currentTab === 'map' && <>
             {mapboxgl.supported() ? <>
              <Filters 
                setFilters={setFilters}
                selectedCategories={selectedCategories}
                absolute={true}
                visible={viewState ==='default'}
              />
              <div className={`interactive-content-${viewState}`}>
              <MapView
                  networks={filteredNetworks}
                  viewState={viewState}
                  setLatLng={setLatLng}
                  selectedCategories={selectedCategories}
                  resetToDefaultView={resetToDefaultView}
                  hoveredPointId={hoveredPointId}
                  setHoveredPoint={setHoveredPoint}
                  bbox={masterBbox}
                  setUsState={setUsState}
                /> 
                <ListView 
                  visibleCards={visibleCards}
                  setHoveredPoint={setHoveredPoint}
                  setFilters={setFilters}
                  selectedCategories={selectedCategories}
                />
                </div>
              </>: <NoWebGl />}
            
            <div className="tagline">Find Mutual Aid Networks and other community self-support projects near you. Reach out to these groups directly via the map above to get involved, offer resources, or submit needs requests.</div>
            <SubmitNetwork />
          </>}
          {this.state.currentTab === 'networks' && <NetworksTable networks={allNetworks} />}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <div className="footer-text">
            <p>
              We list these networks as a public resource. We cannot verify or vouch for any network
              or individual offerings. Please exercise all necessary judgement when interacting with
              community members not previously known to you.
            </p>
            <p>
              This website is brought to you by <a href="https://townhallproject.com/" target="blank">Town Hall Project</a>.
              To report an error or other issue, please contact: <a href="mailto:info@townhallproject.com">info@townhallproject.com</a>
            </p>
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
  hoveredPointId: selectionStateBranch.selectors.getHoveredPointId(state),
  masterBbox: networkStateBranch.selectors.getBoundingBox(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestNetworks: () => dispatch(networkStateBranch.actions.requestNetworks()),
  setFilters: (payload) => dispatch(selectionStateBranch.actions.setCategoryFilters(payload)),
  setLatLng: (payload) => dispatch(selectionStateBranch.actions.setLatLng(payload)),
  setHoveredPoint: (payload) => dispatch(selectionStateBranch.actions.setHoveredPoint(payload)),
  setUsState: (payload) => dispatch(selectionStateBranch.actions.setUsState(payload)),
  resetToDefaultView: () => dispatch(selectionStateBranch.actions.resetToDefaultView())
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
