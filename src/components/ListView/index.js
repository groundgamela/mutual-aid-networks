import React from 'react';
import { Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import NetworkCard from '../NetworkCard'
import Filters from '../Filters';
import './style.scss';
import { language } from './language'

const { Title } = Typography;

const NoNetworkSection = ({siteLanguage}) => {
  return (
    <div className="no-network-section">
      <Title level={3}><InfoCircleOutlined /></Title>
      <Title level={3}>{language.noNetworks[siteLanguage]}</Title>
    </div>
  )
}

const ListView = ({
    visibleCards,
    setHoveredPoint,
    setFilters,
    selectedCategories,
    siteLanguage
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
            siteLanguage={siteLanguage}
          /> :
          <NoNetworkSection siteLanguage={siteLanguage}/>
        }
      </div>
  )
};

export default ListView;