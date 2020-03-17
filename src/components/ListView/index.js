import React from 'react';
import { Button, Table } from 'antd';
import NetworkCard from '../NetworkCard'

const ListView = ({ visibleCards }) => {
  return (
      <div className="list-container">
        <NetworkCard networks={visibleCards} />
      </div>
  )
};

export default ListView;