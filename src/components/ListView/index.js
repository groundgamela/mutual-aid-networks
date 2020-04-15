import React from 'react';
import { Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import NetworkCard from '../NetworkCard'
import Filters from '../Filters';
import './style.scss';

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
    selectedCategories
  }) => {
  return (
      <div className="list-container">
        <Filters
          setFilters={setFilters}
          absolute={false}
          selectedCategories={selectedCategories}
          visible={true}
        />
        {visibleCards.length ?
          <NetworkCard
            setHoveredPoint={setHoveredPoint}
            networks={visibleCards}
          /> :
          <NoNetworkSection />
        }
      </div>
  )
};

export default ListView;