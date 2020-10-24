import React from 'react';
import { Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import NetworkCard from '../NetworkCard'
import Filters from '../Filters';
import './style.scss';
import { FOOD_RESOURCE, NETWORK } from '../../state/constants';
import FoodResourceCard from '../FoodResourceCard';

const { Title } = Typography;

const NoNetworkSection = () => {
  return (
    <div className="no-network-section">
      <Title level={3}><InfoCircleOutlined /></Title>
      <Title level={3}>There are no support requests or networks nearby.</Title> 
    </div>
  )
}

const ListView = ({
    visibleCards,
    setHoveredPoint,
    setFilters,
    selectedCategories,
    filterCounts
  }) => {
    const renderCards = () => {
      const cardProps = {
        setHoveredPoint,
      } 
     return visibleCards.map((data) => {
        if (data.category === FOOD_RESOURCE) {
          return (<FoodResourceCard key={data.id} resource={data} {...cardProps} />)
        } else if (data.category === NETWORK) {
          return (<NetworkCard key={data.id} network={data} {...cardProps} />)
        }
        return null;
      })
    }

  return (
      <div className="list-container">
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