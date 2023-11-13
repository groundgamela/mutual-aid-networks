import React from "react";
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Navigate,
    Routes,
    Route,
} from "react-router-dom";
import { Layout } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { isEqual } from "lodash";

import networkStateBranch from "../state/networks";
import selectionStateBranch from "../state/selections";
import foodResourcesStateBranch from "../state/food-resources";
import MapView from "../components/Map";
import SubmitButton from "../components/SubmitButton";
import Filters from "../components/Filters";
import ListView from "../components/ListView";
import About from "../components/About";
import Resources from "../components/Resources";
import NavMenu from "../components/NavMenu";
import PageFooter from "../components/PageFooter";
import Press from "../components/Press";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Banner from "../components/Banner";

import "./style.scss";
import NoWebGl from "../components/NoWebGl";
import NetworksTable from "../components/NetworksTable";
import FoodResourcesTable from "../components/FoodResourcesTable";

import { translations } from "./language";

const { Header, Content, Sider } = Layout;
const mapboxgl = window.mapboxgl;
class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
        this.state = {
            isMobile: false,
            collapsed: true,
        };
    }

    componentDidMount() {
        const { requestNetworks, requestFoodResources } = this.props;
        requestNetworks();
        requestFoodResources();
        this.checkIfMobile();
        window.addEventListener("resize", this.checkIfMobile);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkIfMobile);
    }

    componentDidUpdate(prevProps) {
        const { visibleCards } = this.props;
        if (
            !isEqual(visibleCards, prevProps.visibleCards) &&
            this.listRef.current
        ) {
            this.listRef.current.scrollIntoView();
        }
    }

    handleNav = (e) => {
        const { resetToDefaultView } = this.props;
        if (this.state.isMobile) this.setState({ collapsed: true });
        resetToDefaultView();
    };

    toggleCollapsibleMenu = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    checkIfMobile = () => {

        return window.innerWidth <= 768
            ? this.setState({ isMobile: true })
            : this.setState({ isMobile: false });
    };

    renderPageHeader = () => {
        const { setSiteLanguage, siteLanguage } = this.props;
        if (!this.state.isMobile) {
            return (
                <Header>
                    <NavMenu
                        mode="horizontal"
                        handleNav={this.handleNav}
                        setSiteLanguage={setSiteLanguage}
                        siteLanguage={siteLanguage}
                    />
                </Header>
            );
        } else if (this.state.collapsed) {
            return (
                <Header onClick={this.toggleCollapsibleMenu}>
                    <MenuFoldOutlined className="menu-btn" />
                </Header>
            );
        } else {
            return (
                <Sider trigger={null}>
                    <NavMenu
                        mode="inline"
                        handleNav={this.handleNav}
                        setSiteLanguage={setSiteLanguage}
                        siteLanguage={siteLanguage}
                    />
                </Sider>
            );
        }
    };

    render() {
        const {
            allFoodResources,
            allNetworks,
            filteredNetworks,
            hoveredPointId,
            filterCounts,
            foodResourceGeoJson,
            masterBbox,
            resetToDefaultView,
            selectedCategories,
            setHoveredPoint,
            setFilters,
            setLatLng,
            setUsState,
            viewState,
            visibleCards,
            siteLanguage,
        } = this.props;

        const { isMobile } = this.state;

        if (!allNetworks.length) {
            return null;
        }
        // viewState --> list or default
        return (
            <Router>
                <Layout className="layout">
                    {this.renderPageHeader()}
                    <Layout>
                        <Content style={{ padding: "0 50px" }}>
                            <div className="main-container">
                                <Routes>
                                    <Route
                                        path="/table-of-networks"
                                        element={
                                            <>
                                                <h2 className="title page-container">
                                                    {
                                                        translations
                                                            .mutualAidNetworks[
                                                            siteLanguage
                                                        ]
                                                    }
                                                </h2>
                                                <div
                                                    className={
                                                        isMobile
                                                            ? ""
                                                            : "table-container"
                                                    }
                                                >
                                                    <NetworksTable
                                                        networks={allNetworks}
                                                        siteLanguage={
                                                            siteLanguage
                                                        }
                                                    />
                                                </div>
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path="/table-of-food-resources"
                                        element={
                                            <>
                                                <h2 className="title page-container">
                                                    {
                                                        translations
                                                            .foodResources[
                                                            siteLanguage
                                                        ]
                                                    }
                                                </h2>
                                                <div
                                                    className={
                                                        isMobile
                                                            ? ""
                                                            : "table-container"
                                                    }
                                                >
                                                    <FoodResourcesTable
                                                        resources={
                                                            allFoodResources
                                                        }
                                                        siteLanguage={
                                                            siteLanguage
                                                        }
                                                    />
                                                </div>
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path="/table-view"
                                        element={
                                            <Navigate to="/table-of-networks" />
                                        }
                                    ></Route>
                                    <Route
                                        path="/about"
                                        element={
                                            <About
                                                siteLanguage={siteLanguage}
                                            />
                                        }
                                    ></Route>
                                    <Route
                                        path="/resources"
                                        element={
                                            <Resources
                                                siteLanguage={siteLanguage}
                                            />
                                        }
                                    ></Route>
                                    <Route
                                        path="/press"
                                        element={<Press />}
                                    ></Route>
                                    <Route
                                        path="/site-information"
                                        element={<PrivacyPolicy />}
                                    ></Route>
                                    <Route
                                        path="/"
                                        element={
                                            mapboxgl.supported() ? (
                                                <>
                                                    <Banner />
                                                    <Filters
                                                        setFilters={setFilters}
                                                        selectedCategories={
                                                            selectedCategories
                                                        }
                                                        absolute={true}
                                                        visible={
                                                            viewState ===
                                                            "default"
                                                        }
                                                    />
                                                    <div
                                                        className={`interactive-content-${viewState}`}
                                                    >
                                                        <MapView
                                                            networks={
                                                                filteredNetworks
                                                            }
                                                            viewState={
                                                                viewState
                                                            }
                                                            setLatLng={
                                                                setLatLng
                                                            }
                                                            selectedCategories={
                                                                selectedCategories
                                                            }
                                                            resetToDefaultView={
                                                                resetToDefaultView
                                                            }
                                                            hoveredPointId={
                                                                hoveredPointId
                                                            }
                                                            setHoveredPoint={
                                                                setHoveredPoint
                                                            }
                                                            bbox={masterBbox}
                                                            setUsState={
                                                                setUsState
                                                            }
                                                            foodResourceGeoJson={
                                                                foodResourceGeoJson
                                                            }
                                                        />
                                                        <ListView
                                                            listRef={
                                                                this.listRef
                                                            }
                                                            filterCounts={
                                                                filterCounts
                                                            }
                                                            visibleCards={
                                                                visibleCards
                                                            }
                                                            setHoveredPoint={
                                                                setHoveredPoint
                                                            }
                                                            setFilters={
                                                                setFilters
                                                            }
                                                            selectedCategories={
                                                                selectedCategories
                                                            }
                                                            siteLanguage={
                                                                siteLanguage
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <NoWebGl />
                                            )
                                        }
                                    ></Route>
                                </Routes>
                                <div className="tagline">
                                    {translations.tagline[siteLanguage]}
                                </div>
                                <SubmitButton
                                    link="https://docs.google.com/forms/d/e/1FAIpQLScuqQtCdKsDzvTzaA2PMyVHX7xcOqbOW7N7l_0YJASV4wMBVQ/viewform"
                                    description={
                                        translations.submitButton[siteLanguage]
                                    }
                                />
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
    selectedCategories:
        selectionStateBranch.selectors.getSelectedCategories(state),
    foodResourceGeoJson:
        foodResourcesStateBranch.selectors.getFoodResourcesGeoJson(state),
    viewState: selectionStateBranch.selectors.getViewState(state),
    searchLocation: selectionStateBranch.selectors.getSearchLocation(state),
    visibleCards: networkStateBranch.selectors.getVisibleCards(state),
    allNetworks: networkStateBranch.selectors.getAllNetworks(state),
    hoveredPointId: selectionStateBranch.selectors.getHoveredPointId(state),
    masterBbox: networkStateBranch.selectors.getBoundingBox(state),
    allFoodResources:
        foodResourcesStateBranch.selectors.getAllFoodResources(state),
    filterCounts: networkStateBranch.selectors.getFilterCounts(state),
    siteLanguage: selectionStateBranch.selectors.getSiteLanguage(state),
});

const mapDispatchToProps = (dispatch) => ({
    requestNetworks: () =>
        dispatch(networkStateBranch.actions.requestNetworks()),
    requestFoodResources: () =>
        dispatch(foodResourcesStateBranch.actions.requestFoodResources()),
    setFilters: (payload) =>
        dispatch(selectionStateBranch.actions.setCategoryFilters(payload)),
    setLatLng: (payload) =>
        dispatch(selectionStateBranch.actions.setLatLng(payload)),
    setHoveredPoint: (payload) =>
        dispatch(selectionStateBranch.actions.setHoveredPoint(payload)),
    setSiteLanguage: (payload) =>
        dispatch(selectionStateBranch.actions.setSiteLanguage(payload)),
    setUsState: (payload) =>
        dispatch(selectionStateBranch.actions.setUsState(payload)),
    resetToDefaultView: () =>
        dispatch(selectionStateBranch.actions.resetToDefaultView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
