import React from 'react';
import NetworkCard from '../NetworkCard'

const ListView = ({ visibleCards, setHoveredPoint }) => {
  const noNetworkMessage = 'There are no support requests or networks nearby.'
  return (
      <div className="list-container">
        {
          visibleCards.length ? 
            <NetworkCard 
              setHoveredPoint={setHoveredPoint} 
              networks={visibleCards} /> : noNetworkMessage
        }
      </div>
  )
};

export default ListView;