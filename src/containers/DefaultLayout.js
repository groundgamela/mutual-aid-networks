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
import {
  isEqual
} from "lodash";

import networkStateBranch from '../state/networks';
import selectionStateBranch from '../state/selections';
import foodResourcesStateBranch from '../state/food-resources';
import MapView from '../components/Map';
import SubmitButton from '../components/SubmitButton';
import Filters from '../components/Filters';
import ListView from '../components/ListView';
import About from '../components/About';
import Resources from '../components/Resources'
import NavMenu from '../components/NavMenu'
import PageFooter from '../components/PageFooter'
import Press from '../components/Press';
import PrivacyPolicy from '../components/PrivacyPolicy'
import Banner from '../components/Banner';

import './style.scss';
import NoWebGl from '../components/NoWebGl';
import NetworksTable from '../components/NetworksTable';

const { Header, Content, Sider } = Layout;
const mapboxgl = window.mapboxgl;
class DefaultLayout extends React.Component {
  constructor(props) {
    super(props)
    this.listRef = React.createRef();
    this.state = {
      isMobile: false,
      collapsed: true,
    }
  }

  componentDidMount() {
    const {
      requestNetworks,
      requestFoodResources
    } = this.props;
    requestNetworks();
    requestFoodResources();
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIfMobile);
  }

  componentDidUpdate(prevProps) {
    const { visibleCards } = this.props;
    if (!isEqual(visibleCards, prevProps.visibleCards) && this.listRef.current) {
      this.listRef.current.scrollIntoView();
    }
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

  renderPageHeader = () => {
    if (!this.state.isMobile) {
      return (
        <Header>
          <NavMenu
            mode='horizontal'
            handleNav={this.handleNav}
          />
        </Header>
      )
    } else if (this.state.collapsed) {
      return (
        <Header onClick={this.toggleCollapsibleMenu}>
          <MenuFoldOutlined className='menu-btn'/>
        </Header>
      )
    } else {
      return (
        <Sider trigger={null}>
          <NavMenu
            mode='inline'
            handleNav={this.handleNav}
          />
        </Sider>
      )
    }
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
      resetToDefaultView,
      foodResourceGeoJson,
      filterCounts
    } = this.props;
    
    if (!allNetworks.length) {
      return null;
    }
    // viewState --> list or default
    return (
      <Router>
        <Layout className="layout">
          {this.renderPageHeader()}
          <Layout>
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
                  <Route path='/press'>
                    <Press />
                  </Route>
                  <Route path='/site-information'>
                    <PrivacyPolicy />
                  </Route>
                  <Route path='/'>
                    {mapboxgl.supported() ? <>
                      <Banner/>
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
                          foodResourceGeoJson={foodResourceGeoJson}
                        />
                        <ListView
                          listRef={this.listRef}
                          filterCounts={filterCounts}
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
            <PageFooter />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredNetworks: networkStateBranch.selectors.getFilteredNetworks(state),
  selectedCategories: selectionStateBranch.selectors.getSelectedCategories(state),
  foodResourceGeoJson: foodResourcesStateBranch.selectors.getFoodResourcesGeoJson(state),
  viewState: selectionStateBranch.selectors.getViewState(state),
  searchLocation: selectionStateBranch.selectors.getSearchLocation(state),
  visibleCards: networkStateBranch.selectors.getVisibleCards(state),
  allNetworks: networkStateBranch.selectors.getAllNetworks(state),
  hoveredPointId: selectionStateBranch.selectors.getHoveredPointId(state),
  masterBbox: networkStateBranch.selectors.getBoundingBox(state),
  allFoodResources: foodResourcesStateBranch.selectors.getAllFoodResources(state),
  filterCounts: networkStateBranch.selectors.getFilterCounts(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestNetworks: () => dispatch(networkStateBranch.actions.requestNetworks()),
  requestFoodResources: () => dispatch(foodResourcesStateBranch.actions.requestFoodResources()),
  setFilters: (payload) => dispatch(selectionStateBranch.actions.setCategoryFilters(payload)),
  setLatLng: (payload) => dispatch(selectionStateBranch.actions.setLatLng(payload)),
  setHoveredPoint: (payload) => dispatch(selectionStateBranch.actions.setHoveredPoint(payload)),
  setUsState: (payload) => dispatch(selectionStateBranch.actions.setUsState(payload)),
  resetToDefaultView: () => dispatch(selectionStateBranch.actions.resetToDefaultView())
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
