import React from 'react';
import { Button } from 'antd';
import './style.scss';

const SubmitButton = (props) => {
  const {
    description,
    link
  } = props
  return (
    <div className="btn-container">
      <Button
        id="submit-btn" 
        target="blank" 
        href={link}
      >
        {description}
      </Button>
    </div>
  )
};

export default SubmitButton;