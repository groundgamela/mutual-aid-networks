import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Point from './Point';
import LAYER_NAME from '.';

const mapboxgl = window.mapboxgl;

class MapInset extends React.Component {
  constructor(props) {
    super(props);
    this.addClickListener = this.addClickListener.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.createFeatures = this.createFeatures.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
      this.updateData(networks, LAYER_NAME);
    }
  }

  updateData(networks, layer) {
    const featuresHome = this.createFeatures(networks);
    if (!this.map.getSource(layer)) {
      return;
    }
    this.map.getSource(layer).setData(featuresHome);
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
        id: LAYER_NAME,
        paint: {
          'circle-color': '#11b4da',
          'circle-opacity': 0.5,
          'circle-radius': 7,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
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
    this.removeHighlights();
    // this.props.resetSelections();
  }


  initializeMap(featuresHome) {
    const {
      bounds,
      mapId,
    } = this.props;

    mapboxgl.accessToken =
        'pk.eyJ1IjoidG93bmhhbGxwcm9qZWN0IiwiYSI6ImNqMnRwOG4wOTAwMnMycG1yMGZudHFxbWsifQ.FXyPo3-AD46IuWjjsGPJ3Q';
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
  colorMap: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  networks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mapId: PropTypes.string.isRequired,
  resetSelections: PropTypes.func.isRequired,
  selectedState: PropTypes.string,
  setUsState: PropTypes.func.isRequired,
  stateName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

MapInset.defaultProps = {
  selectedState: '',
};

export default MapInset;
