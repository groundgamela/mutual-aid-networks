import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import {
  NETWORK_LAYER_NAME, 
  accessToken,
  mapboxStyle
} from './constants';

const mapboxgl = window.mapboxgl;

class MapInset extends React.Component {
  constructor(props) {
    super(props);
    this.addClickListener = this.addClickListener.bind(this);
  }

  componentDidMount() {
    this.initializeMap();
  }

  setFilters() {
    const {
      selectedCategories
    } = this.props;
    let layer = this.map.getLayer(NETWORK_LAYER_NAME);
    if (!layer) {
      return;
    }
    let filterArray = ['any', ...selectedCategories.map((category) => ['==', ['get', 'category'], category])];
    this.map.setFilter(NETWORK_LAYER_NAME, filterArray);
  }

  componentDidUpdate(prevProps) {
    const {
      selectedCategories,
    } = this.props;

    if (!isEqual(selectedCategories, prevProps.selectedCategories)) {
      this.setFilters();
    }
  }

  addClickListener() {
    const {
      bounds,
      setBounds,
    } = this.props;
    const { map } = this;

    map.on('click', () => {
      setBounds(bounds, this.props.stateName);
    });
  }

  initializeMap() {
    const {
      bounds,
      mapId,
    } = this.props;

    mapboxgl.accessToken =
        accessToken;

    this.map = new mapboxgl.Map({
      container: mapId,
      doubleClickZoom: false,
      dragPan: false,
      scrollZoom: false,
      style: mapboxStyle,
    });

    this.map.fitBounds(bounds, {
      easeTo: { duration: 0 },
      linear: true,
    });
    // map on 'load'
    this.map.on('load', () => {
      this.addClickListener();
      this.map.setLayoutProperty(NETWORK_LAYER_NAME, 'visibility', 'visible')
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
