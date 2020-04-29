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
import PageFooter from '../components/PageFooter'

import './style.scss';
import NoWebGl from '../components/NoWebGl';
import NetworksTable from '../components/NetworksTable';

import { language } from './language'

const { Header, Content, Sider } = Layout;
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

  renderPageHeader = () => {
    const {
      setSiteLanguage,
      siteLanguage,
    } = this.props
    if (!this.state.isMobile) {
      return (
        <Header>
          <NavMenu
            mode='horizontal'
            handleNav={this.handleNav}
            setSiteLanguage={setSiteLanguage}
            siteLanguage={siteLanguage}
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
            setSiteLanguage={setSiteLanguage}
            siteLanguage={siteLanguage}
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
      siteLanguage
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
                    <NetworksTable networks={allNetworks} siteLanguage={siteLanguage} />
                  </Route>
                  <Route path='/about'>
                    <About siteLanguage={siteLanguage} />
                  </Route>
                  <Route path='/resources'>
                    <Resources siteLanguage={siteLanguage} />
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
                          siteLanguage={siteLanguage}
                        />
                      </div>
                    </>: <NoWebGl />}
                    <div className="tagline">
                      {language.tagline[siteLanguage]}
                    </div>
                    <SubmitButton
                      link='https://docs.google.com/forms/d/e/1FAIpQLScuqQtCdKsDzvTzaA2PMyVHX7xcOqbOW7N7l_0YJASV4wMBVQ/viewform'
                      description={language.submitButton[siteLanguage]}
                    />
                  </Route>
                </Switch>
              </div>
            </Content>
            <PageFooter siteLanguage={siteLanguage} />
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
  siteLanguage: selectionStateBranch.selectors.getSiteLanguage(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestNetworks: () => dispatch(networkStateBranch.actions.requestNetworks()),
  setFilters: (payload) => dispatch(selectionStateBranch.actions.setCategoryFilters(payload)),
  setLatLng: (payload) => dispatch(selectionStateBranch.actions.setLatLng(payload)),
  setHoveredPoint: (payload) => dispatch(selectionStateBranch.actions.setHoveredPoint(payload)),
  setSiteLanguage: (payload) => dispatch(selectionStateBranch.actions.setSiteLanguage(payload)),
  setUsState: (payload) => dispatch(selectionStateBranch.actions.setUsState(payload)),
  resetToDefaultView: () => dispatch(selectionStateBranch.actions.resetToDefaultView())
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
