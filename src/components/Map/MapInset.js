import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  LAYER_NAME, 
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
    let filterArray = ['any', ...selectedCategories.map((category) => ['==', ['get', 'category'], category])];
    this.map.setFilter(LAYER_NAME, filterArray);
  }

  componentDidUpdate(prevProps) {
    const {
      networks,
    } = prevProps;

    if (networks.length !== this.props.networks.length) {
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
      setBounds(bounds);
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
