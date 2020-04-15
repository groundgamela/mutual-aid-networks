import React from 'react';
import {
  connect
} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import {
  MenuFoldOutlined,
} from '@ant-design/icons';

import networkStateBranch from '../state/networks';
import selectionStateBranch from '../state/selections';
import MapView from '../components/Map';
import SubmitButton from '../components/SubmitButton';
import Filters from '../components/Filters';
import ListView from '../components/ListView';
import About from '../components/About';
import Resources from '../components/Resources'
import NavMenu from '../components/NavMenu'

import './style.scss';
import NoWebGl from '../components/NoWebGl';
import NetworksTable from '../components/NetworksTable';

const { Header, Content, Footer, Sider } = Layout;
const mapboxgl = window.mapboxgl;
class DefaultLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      collapsed: true,
    }
  }

  componentDidMount() {
    const {
      requestNetworks
    } = this.props;
    requestNetworks();
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIfMobile);
  }

  handleNav = (e) => {
    const {
      resetToDefaultView
    } = this.props
    if (this.state.isMobile) this.setState({collapsed: true});
    resetToDefaultView();
  }

  toggleCollapsibleMenu = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  checkIfMobile = () => {
    window.innerWidth <= 768 ? this.setState({isMobile: true}) : this.setState({isMobile: false})
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
      <Router>
        <Layout className="layout">
          {this.state.isMobile &&
          <>
            {this.state.collapsed ?
            <Header onClick={this.toggleCollapsibleMenu}>
              <MenuFoldOutlined className='menu-btn'/>
            </Header>
            :
            <Sider trigger={null}>
              <NavMenu
                mode='inline'
                handleNav={this.handleNav}
              />
            </Sider>
            }
          </>}
          <Layout>
            {!this.state.isMobile &&
            <Header>
              <NavMenu
                mode='horizontal'
                handleNav={this.handleNav}
              />
            </Header>}
            <Content style={{ padding: '0 50px' }}>
              <div className="main-container">
                <Switch>
                  <Route path='/table-view'>
                    <NetworksTable networks={allNetworks} />
                  </Route>
                  <Route path='/about'>
                    <About />
                  </Route>
                  <Route path='/resources'>
                    <Resources />
                  </Route>
                  <Route path='/'>
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
                    <div className="tagline">
                      Find Mutual Aid Networks and other community self-support projects near you. Reach out to these
                      groups directly via the map above to get involved, offer resources, or submit needs requests.
                    </div>
                    <SubmitButton
                      link='https://docs.google.com/forms/d/e/1FAIpQLScuqQtCdKsDzvTzaA2PMyVHX7xcOqbOW7N7l_0YJASV4wMBVQ/viewform'
                      description='Submit a Mutual Aid Network'
                    />
                  </Route>
                </Switch>
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
                  This data set is made available under the <a rel="noopener noreferrer" target="_blank" href="http://www.opendatacommons.org/licenses/pddl/1.0/">Public Domain Dedication and License v1.0</a>.
                </p>
                <p>
                  This website is brought to you by <a href="https://townhallproject.com/" rel="noopener noreferrer" target="_blank" >Town Hall Project</a>.
                  To report an error or other issue, please contact: <a href="mailto:info@townhallproject.com">info@townhallproject.com</a>
                </p>
              </div>
            </Footer>
          </Layout>
        </Layout>
      </Router>
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
