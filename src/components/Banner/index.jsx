import React from 'react';

import './style.scss';

export default function Banner(){

  return (
    <div className="banner">
      <h3>
        Mutual aid is keeping communities afloat. Find a network near you and
        give what you can:{" "}
        <a target="blank" href="https://www.supportmutualaid.org/">
          {" "}
          Support Mutual Aid
        </a>
      </h3>
    </div>
  );
};

