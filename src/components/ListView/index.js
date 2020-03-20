import React from 'react';
import NetworkCard from '../NetworkCard'
import Filters from '../Filters';

const ListView = ({
    visibleCards,
    setHoveredPoint,
    setFilters, selectedCategories
  }) => {
  const noNetworkMessage = 'There are no support requests or networks nearby.'
  return (
      <div className="list-container">
        {
          visibleCards.length ? 
          <>
            <Filters 
                setFilters={setFilters}
                absolute={false}
                selectedCategories={selectedCategories}
                visible={true}
            />
            <NetworkCard 
              setHoveredPoint={setHoveredPoint} 
              networks={visibleCards} /></> : noNetworkMessage
          
        }
      </div>
  )
};

export default ListView;