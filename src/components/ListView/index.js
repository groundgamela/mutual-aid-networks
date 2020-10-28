import React from 'react';
import { Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import NetworkCard from '../NetworkCard'
import Filters from '../Filters';
import './style.scss';
import { FOOD_RESOURCE, NETWORK } from '../../state/constants';
import FoodResourceCard from '../FoodResourceCard';
import { translations } from './language'

const { Title } = Typography;

const NoNetworkSection = ({siteLanguage}) => {
  return (
    <div className="no-network-section">
      <Title level={3}><InfoCircleOutlined /></Title>
      <Title level={3}>{translations.noNetworks[siteLanguage]}</Title>
    </div>
  )
}

const ListView = ({
    visibleCards,
    setHoveredPoint,
    setFilters,
    selectedCategories,
    filterCounts,
    listRef,
    siteLanguage
  }) => {
    const renderCards = () => {
      const cardProps = {
        setHoveredPoint,
      } 
     return visibleCards.map((data) => {
        if (data.category === FOOD_RESOURCE) {
          return (<FoodResourceCard key={`resource-${data.id}`} resource={data} {...cardProps} />)
        } else if (data.category === NETWORK) {
          return (<NetworkCard key={`network-${data.id}`} network={data} {...cardProps} />)
        }
        return null;
      })
    }

  return (
      <div className="list-container" >
        <div ref={listRef} />
        <Filters
          setFilters={setFilters}
          filterCounts={filterCounts}
          absolute={false}
          selectedCategories={selectedCategories}
          visible={true}
        />
        {visibleCards.length ? renderCards(): <NoNetworkSection />}
      </div>
  )
};

export default ListView;