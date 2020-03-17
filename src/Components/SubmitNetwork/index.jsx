import React from 'react';
import { Button } from 'antd';
import './style.scss';

const SubmitNetwork = () => {
  return (
      <div className="start-network-container">
        <Button 
          id="start-network-button" 
          target="_blank" 
          href="https://docs.google.com/forms/d/1Orat2boOrd7dqmWD4LS1yJd5QwK_kSn05OS9BghJKTk/edit?usp=sharing">
            Submit a Mutual Aid Network
        </Button>
      </div>
  )
};

export default SubmitNetwork;