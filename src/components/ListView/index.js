import React from 'react';
import { Button, Table } from 'antd';

const ListView = ({ visibleCards }) => {
  return (
      <div className="list-container">
        <ul>
          {
            visibleCards.length && visibleCards.map((org) => {
              return <li>{org.title}</li>
            })
          }
        </ul>
      </div>
  )
};

export default ListView;