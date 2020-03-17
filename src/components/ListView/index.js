import React from 'react';
import { Button, Table } from 'antd';
import NetworkCard from '../NetworkCard'

const ListView = ({ visibleCards }) => {
  const noNetworkMessage = 'There are no support requests or networks nearby.'
  return (
      <div className="list-container">
        {
          visibleCards.length ? <NetworkCard networks={visibleCards} /> : noNetworkMessage
        }
      </div>
  )
};

export default ListView;