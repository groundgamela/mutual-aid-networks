import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Point from './Point';
import {
  LAYER_NAME, 
  accessToken
} from './constants';

const mapboxgl = window.mapboxgl;

class MapInset extends React.Component {
  constructor(props) {
    super(props);
    this.addClickListener = this.addClickListener.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.createFeatures = this.createFeatures.bind(this);
    this.updateData = this.updateData.bind(this);

  }

  componentDidMount() {
    const { networks } = this.props;
    const featuresHome = this.createFeatures(networks);
    this.initializeMap(featuresHome);
  }

  componentWillReceiveProps(nextProps) {
    const {
      networks,
    } = nextProps;

    if (networks.length !== this.props.networks.length) {
      this.updateData(networks);
    }
  }

  updateData(networks) {
    const featuresHome = this.createFeatures(networks);
    if (!this.map.getSource(`${LAYER_NAME}-${this.props.stateName}`)) {
      return;
    }
    this.map.getSource(`${LAYER_NAME}-${this.props.stateName}`).setData(featuresHome);
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

  addClickListener() {
    const {
      bounds,
      setBounds,
    } = this.props;
    const { map } = this;

    map.on('click', () => {
      setBounds(bounds);
    });
  }

  addLayer(featuresHome) {
    this.map.addLayer(
      {
        id: `${LAYER_NAME}-${this.props.stateName}`,
        paint: {
          'circle-opacity': 0.5,
          'circle-radius': 7,
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

  initializeMap(featuresHome) {
    const {
      bounds,
      mapId,
    } = this.props;

    mapboxgl.accessToken =
        accessToken;
    const styleUrl = 'mapbox://styles/townhallproject/cjgr7qoqr00012ro4hnwlvsyp';

    this.map = new mapboxgl.Map({
      container: mapId,
      doubleClickZoom: false,
      dragPan: false,
      scrollZoom: false,
      style: styleUrl,
    });

    this.map.fitBounds(bounds, {
      easeTo: { duration: 0 },
      linear: true,
    });
    // map on 'load'
    this.map.on('load', () => {
      this.addClickListener();
      this.addLayer(featuresHome);

    });
  }

  render() {
    const {
      viewState,
      mapId,
    } = this.props;
    const mapClassNames = classNames({
      hidden: viewState === 'list',
      inset: true,
    });
    return (
      <React.Fragment>
        <div id={mapId} className={mapClassNames} data-bounds={this.props.bounds} />
      </React.Fragment>
    );
  }
}

MapInset.propTypes = {
  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  networks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mapId: PropTypes.string.isRequired,
  stateName: PropTypes.string.isRequired,
};

MapInset.defaultProps = {
  selectedState: '',
};

export default MapInset;
