import React from 'react';
import PropTypes from 'prop-types';
import { find, filter } from 'lodash';
import geoViewport from '@mapbox/geo-viewport';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import Point from './Point';

import MapInset from './MapInset';
import './style.scss';
import './popover.scss';

export const LAYER_NAME = 'networks-dots'
const mapboxgl = window.mapboxgl;
class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.filterDistrict = ['any'];
    this.includedStates = ['in', 'NAME'];

    this.addPopups = this.addPopups.bind(this);
    this.addClickListener = this.addClickListener.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.createFeatures = this.createFeatures.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.filterForStateInsets = this.filterForStateInsets.bind(this);
    this.insetOnClickEvent = this.insetOnClickEvent.bind(this);
    this.state = {
      alaskanetworks: filter(this.props.networks, { state: 'AK' }),
      hawaiinetworks: filter(this.props.networks, { state: 'HI' }),
      popoverColor: 'popover-general-icon',
    };
  }

  componentDidMount() {
    const { networks } = this.props;
    const featuresHome = this.createFeatures(networks);
    this.initializeMap(featuresHome);
  }

  componentDidUpdate(prevProps) {
    const {
      networks,
    } = prevProps;
    this.map.resize();
    if (networks.length !== this.props.networks.length) {
      this.updateData(this.props.networks)
    }
    if (prevProps.viewState !== this.props.viewState) {
      if (this.props.viewState === 'default') {
        this.setInitialState();
      }

    }
  }

  filterForStateInsets(networks) {
    const alaskanetworks = filter(networks, { state: 'AK' });
    const hawaiinetworks = filter(networks, { state: 'HI' });
    this.setState({
      alaskanetworks,
      hawaiinetworks,
    });
  }

  insetOnClickEvent(e) {
    this.setState({ inset: false });
    const dataBounds = e.target.parentNode.parentNode.getAttribute('data-bounds').split(',');
    const boundsOne = [Number(dataBounds[0]), Number(dataBounds[1])];
    const boundsTwo = [Number(dataBounds[2]), Number(dataBounds[3])];
    const bounds = boundsOne.concat(boundsTwo);
    this.map.fitBounds(bounds);
  }

  updateData(networks) {
    const featuresHome = this.createFeatures(networks);
    this.map.fitBounds([[-128.8, 23.6], [-65.4, 50.2]]);
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

    const popup = new mapboxgl.Popup({
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

        this.setState({
          popoverColor: `popover-${feature.properties.category}`
        });
        const link = properties.form ? `<a href=${properties.form}>Link to form</a>` : `<a href=${properties.socials}>Link to group</a>`;
        return popup.setLngLat(feature.geometry.coordinates)
          .setHTML(`
            <h4>${properties.title}</h4>
            <div>${link}</div>`)
 
          .addTo(map);
      }
      return undefined;
    });
  }

  addClickListener() {

    const { map } = this;
    const {
      setViewState,
      setLatLng
    } = this.props;

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(
        e.point,
        {
          layers: [LAYER_NAME],
        },
      );

      if (features.length > 0) {
        let bbox = JSON.parse(features[0].properties.bbox);
        setViewState('list');
        setLatLng({lat: features[0].properties.lat, lng: features[0].properties.lng})
        map.fitBounds(bbox);
      }
    });
  }

  addLayer(featuresHome) {
    this.map.addLayer(
      {
        id: LAYER_NAME,
        paint: {
          'circle-opacity': 0.5,
          'circle-radius': [
            'interpolate', ['linear'],
            ['number', ['get', 'scale'], 5],
              1,
              5,
              70,
              70
          ], 
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
          'circle-color': [
            'match',
            ['get', 'category'],
            'Support Request',
            '#ef4822',
            'Support Offer',
            '#6ac1e5',
            'General',
            '#8048f3',
            /* other */
            '#057A8F'
          ]
        },
        source: {
          data: featuresHome,
          type: 'geojson',
        },
        type: 'circle',
      },
      'district_interactive',
    );
  }


  handleReset() {
    const {
      setViewState
    } = this.props;

  
    setViewState('default');
  }

  setInitialState() {
    this.map.fitBounds([
      [-128.8, 23.6],
      [-65.4, 50.2]
    ]);
    this.map.resize();
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

  initializeMap(featuresHome) {
    const {
      setViewState,
      setLatLng
    } = this.props;

    mapboxgl.accessToken =
      'pk.eyJ1IjoidG93bmhhbGxwcm9qZWN0IiwiYSI6ImNqMnRwOG4wOTAwMnMycG1yMGZudHFxbWsifQ.FXyPo3-AD46IuWjjsGPJ3Q';
    const styleUrl = 'mapbox://styles/townhallproject/cjgr7qoqr00012ro4hnwlvsyp';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: styleUrl,
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
      })
      .on('clear', function (result) {
        setViewState('default');
      })
      .on('result', function (returned) {
        setViewState('list');
        map.fitBounds(returned.result.bbox);
        setLatLng({
          lat: returned.result.center[1],
          lng: returned.result.center[0]
        })
      }),
      'top-left'
    );
    // map on 'load'
    this.map.on('load', () => {
      this.map.fitBounds([[-128.8, 23.6], [-65.4, 50.2]]);
      this.addClickListener();
      this.addLayer(featuresHome);
      this.addPopups(LAYER_NAME);
      // this.map.getSource(LAYER_NAME).setData(featuresHome);
    });
  }

  render() {
    const {
      center,
      resetSelections,
      setLatLng,
      setUsState,
      viewState,
    } = this.props;

    return (
      <React.Fragment>
        <div id="map" className={this.state.popoverColor}>
          <div className="map-overlay" id="legend">
            <MapInset
              networks={this.state.alaskanetworks}
              center={center}
              stateName="AK"
              viewState={viewState}
              resetSelections={resetSelections}
              setLatLng={setLatLng}
              setUsState={setUsState}
              mapId="map-overlay-alaska"
              bounds={[[-170.15625, 51.72702815704774], [-127.61718749999999, 71.85622888185527]]}
            />
            <MapInset
              networks={this.state.hawaiinetworks}
              stateName="HI"
              center={center}
              viewState={viewState}
              resetSelections={resetSelections}
              setLatLng={setLatLng}
              setUsState={setUsState}
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
