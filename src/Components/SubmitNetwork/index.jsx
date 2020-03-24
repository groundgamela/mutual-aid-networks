import React from 'react';
import { Button } from 'antd';
import './style.scss';

const SubmitNetwork = () => {
  return (
      <div className="start-network-container">
        <Button 
          id="start-network-button" 
          target="_blank" 
          href="https://docs.google.com/forms/d/e/1FAIpQLScuqQtCdKsDzvTzaA2PMyVHX7xcOqbOW7N7l_0YJASV4wMBVQ/viewform">
            Submit a Mutual Aid Network
        </Button>
      </div>
  )
};

export default SubmitNetwork;