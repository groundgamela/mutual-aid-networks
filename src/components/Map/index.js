import React from 'react';
import PropTypes from 'prop-types';
import { filter } from 'lodash';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import Point from './Point';

import MapInset from './MapInset';
import './style.scss';
import './popover.scss';
import './popovertip.scss';
import './popover_implementation.scss';
import { LAYER_NAME, accessToken, mapboxStyle } from './constants';

const mapboxgl = window.mapboxgl;

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.filterDistrict = ['any'];
    this.includedStates = ['in', 'NAME'];

    this.addPopups = this.addPopups.bind(this);
    this.addClickListener = this.addClickListener.bind(this);
    this.createFeatures = this.createFeatures.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.insetOnClickEvent = this.insetOnClickEvent.bind(this);
    this.handleClickOnInset = this.handleClickOnInset.bind(this);
    this.initializeMap = this.initializeMap.bind(this);
    this.state = {
      popoverColor: 'popover-general-icon',
      bbox: null,
    };
  }

  componentDidMount() {
    const { networks } = this.props;
    const featuresHome = this.createFeatures(networks);
    this.initializeMap(featuresHome);
  }

  componentDidUpdate(prevProps) {
 
    const {
      hoveredPointId,
      viewState,
      bbox,
      networks
    } = this.props;
    this.map.resize();
    // changed filters
    if (networks.length !== prevProps.networks.length) {
      // this.updateData(this.props.networks);
    }
    // toggled view between full map and zoom
    if (prevProps.viewState !== viewState) {
      this.hoveredPopup.remove(); //close any open popup
      if (viewState === 'default') {
        this.setInitialState();
      }
    }
    // if a bounding box has been set before render, fix the bounds and clear
    // for changing map zoom and size

    if ((this.state.bbox && viewState === 'list')) {
      this.fitBounds(this.state.bbox);
      this.setState({
        bbox: null
      })
    }
    if (bbox && viewState === 'list' && bbox !== prevProps.bbox) {
      this.fitBounds(bbox);
    }

    if (hoveredPointId) {
      this.hoverPoint(hoveredPointId)
    } 
    if (prevProps.hoveredPointId && prevProps.hoveredPointId !== hoveredPointId) {
      this.unHoverPoint(prevProps.hoveredPointId);
    }
  }

  insetOnClickEvent(e) {
    this.setState({ inset: false });
    const dataBounds = e.target.parentNode.parentNode.getAttribute('data-bounds').split(',');
    const boundsOne = [Number(dataBounds[0]), Number(dataBounds[1])];
    const boundsTwo = [Number(dataBounds[2]), Number(dataBounds[3])];
    const bounds = boundsOne.concat(boundsTwo);
    this.fitBounds(bounds);
  }

  fitBounds(bounds) {
    this.map.fitBounds(bounds, {
      padding: {
        top: 10,
        bottom: 25,
        left: 15,
        right: 5
      },
      maxZoom: 8
    })
  }

  updateData(networks) {
    const featuresHome = this.createFeatures(networks);
    if (!this.map.getSource(LAYER_NAME)) {
      return;
    }
    this.map.getSource(LAYER_NAME).setData(featuresHome);
  }

  createFeatures(networks) {
    const featuresHome = {
      features: [],
      type: 'FeatureCollection',
    };
    featuresHome.features = networks.map((network) => {
      const newFeature = new Point(network);
      return newFeature;
    });
    return featuresHome;
  }

  addPopups(layer) {
    const { map } = this;

    this.hoveredPopup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
    });

    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: [layer] });
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (features.length) {
        const feature = features[0];
        const { properties } = feature;
        const popoverClassName = `popover-${feature.properties.category.split(' ').join('-').toLowerCase()}`
        this.setState({
          popoverColor: popoverClassName
        });
        this.props.setHoveredPoint(feature.id);
        let link;
        if (properties.generalForm) {
          link = `<a rel="noopener noreferrer" target="_blank" href=${properties.generalForm}>Link to form</a>`
        } else if (properties.supportOfferForm && properties.supportRequestForm) {
          link = `<a rel="noopener noreferrer" class="side-by-side" target="_blank" href=${properties.supportOfferForm}>Offer support</a><a class="side-by-side" target="_blank" href=${properties.supportRequestForm}>Request support</a>`
        } else if (properties.supportOfferForm) {
          link = `<a rel="noopener noreferrer" href=${properties.supportOfferForm}>Offer support</a>`;
        } else if (properties.supportRequestForm) {
          link = `<a rel="noopener noreferrer" href=${properties.supportRequestForm}>Request support</a>`;
        } else {
          link = `<a rel="noopener noreferrer" href=${properties.facebookPage}>Link to group</a>`;
        }
        return this.hoveredPopup.setLngLat(feature.geometry.coordinates)
          .setHTML(`
            <h4>${properties.title}</h4>
            <div>${properties.city}, ${properties.state}</div>
            <div>${link}</div>`)
 
          .addTo(map);
      }
      return undefined;
    });
  
  }

  addClickListener() {

    const { map } = this;
    const {
      setLatLng
    } = this.props;
    const layer = map.getLayer(LAYER_NAME);
    if (!layer) {
      return;
    }
    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(
        e.point,
        {
          layers: [LAYER_NAME],
        },
      );

      if (features.length > 0) {
        setLatLng({lat: features[0].properties.lat, lng: features[0].properties.lng});
      }
    });
  }

  hoverPoint(hoveredPinId) {
    this.map.setFeatureState({
      source: "composite",
      sourceLayer: "ma-networks-dataset",
      id: hoveredPinId
    }, {
      hover: true
    });
  };

  unHoverPoint(hoveredPinId) {
    this.map.setFeatureState({
      source: "composite",
      sourceLayer: "ma-networks-dataset",
      id: hoveredPinId
    }, {
      hover: false
    });
  };

  handleReset() {
    const {
      setLatLng
    } = this.props;

    setLatLng({});
  }

  setInitialState() {
    this.fitBounds([
      [-128.8, 23.6],
      [-65.4, 50.2]
    ]);
    document.getElementsByClassName('mapboxgl-ctrl-geocoder--input');
    Array.from(document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')).forEach(ele => {
      ele.value = '';
    })
    this.map.resize();
  }

  handleClickOnInset(bounds) {
    // this is for clicking on a state inset
    this.setState({bbox: bounds})

    const mbBounds = new mapboxgl.LngLatBounds(bounds);
    const center = mbBounds.getCenter();
    this.props.setLatLng(center);
  }

  // Creates the button in our zoom controls to go to the national view
  makeZoomToNationalButton() {
    document.querySelector('.mapboxgl-ctrl-compass').remove();
    if (document.querySelector('.mapboxgl-ctrl-usa')) {
      document.querySelector('.mapboxgl-ctrl-usa').remove();
    }
    const usaButton = document.createElement('button');
    usaButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-usa';
    usaButton.innerHTML = '<span class="usa-icon"></span>';

    usaButton.addEventListener('click', this.handleReset);
    document.querySelector('.mapboxgl-ctrl-group').appendChild(usaButton);
  }

  initializeMap() {
    const {
      setLatLng
    } = this.props;

    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: mapboxStyle,
    });

    // Set Mapbox map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.scrollZoom.disable();
    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();
    this.makeZoomToNationalButton();
    const { map } = this;
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: 'us',
        marker: false,
        zoom: 12,
        flyTo: false,
      })
      .on('clear', function (result) {
        setLatLng({});
      })
      .on('result', function (returned) {
        map.resize();
        setLatLng({
          lat: returned.result.center[1],
          lng: returned.result.center[0]
        });

      }),
      'top-left'
    );
    // map on 'load'
    this.fitBounds([[-128.8, 23.6], [-65.4, 50.2]]);
    this.map.on('load', () => {
      this.addClickListener();
      // this.map.setPaintProperty(LAYER_NAME, 'circle-opacity', [
      //               'case',
      //               ['boolean', ['feature-state', 'hover'], false],
      //               1,
      //               0.5
      //             ],);

      this.addPopups(LAYER_NAME);
    });
  }

  render() {
    const {
      center,
      resetSelections,
      setLatLng,
      viewState,
      networks,
    } = this.props;

    return (
      <React.Fragment>
        <div id="map" className={this.state.popoverColor}>
          <div className="map-overlay" id="legend">
            <MapInset
              networks={filter(networks, { state: 'AK' })}
              center={center}
              stateName="AK"
              viewState={viewState}
              resetSelections={resetSelections}
              setLatLng={setLatLng}
              setBounds={this.handleClickOnInset}
              mapId="map-overlay-alaska"
              bounds={[[-170.15625, 51.72702815704774], [-127.61718749999999, 71.85622888185527]]}
            />
            <MapInset
              networks={filter(networks, { state: 'HI' })}
              stateName="HI"
              center={center}
              viewState={viewState}
              resetSelections={resetSelections}
              setLatLng={setLatLng}
              setBounds={this.handleClickOnInset}
              mapId="map-overlay-hawaii"
              bounds={[
                [-161.03759765625, 18.542116654448996],
                [-154.22607421875, 22.573438264572406]]}
            />
          </div>
        </div>

      </React.Fragment>
    );
  }
}

MapView.propTypes = {
  networks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setLatLng: PropTypes.func.isRequired,
};

MapView.defaultProps = {

};

export default MapView;
