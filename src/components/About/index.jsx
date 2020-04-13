import React from 'react'
import { Col, Row } from 'antd'

import './style.scss';
import eventMap from '../../assets/thp/eventMap.png'
import pledgeMap from '../../assets/thp/PledgeMap.png'
import thpLogo from '../../assets/thp/THP_logo_horizontal.png'
import th1 from '../../assets/thp/TH1.jpg'
import th2 from '../../assets/thp/TH2.jpg'

const About = (props) => {
  return (
    <div className='page-container'>
      <a href='https://townhallproject.com/'>
        <img src={thpLogo} alt='Town Hall Project logo' className='thpLogo'/>
      </a>
      <h2 className='title'>This site is built and maintained by <a href='https://townhallproject.com/'>Town Hall Project.</a></h2>
      <div className='container'>
        <p>
          Town Hall Project is a 501(c)(3) non-profit organization dedicated to
          lifting up the voices of Americans to lawmakers and other people in power.
          We created Mutual Aid Hub to highlight the incredible work of mutual aid
          organizers around the country, and to facilitate connections and shared
          strategies in this growing movement of community support.
        </p>

        <div className='imageCollage'>
          <Row>
            <Col span={14}>
              <img src={eventMap} alt='event map' className='map'/>
            </Col>
            <Col span={10}>
              <img src={th1} alt='Town Hall meeting' className='hall'/>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
            <img src={th2} alt='Town Hall meeting' className='hall'/>
            </Col>
            <Col span={14}>
              <img src={pledgeMap} alt='pledge map' className='map'/>
            </Col>
          </Row>
        </div>
        
        <p>
          We do not directly organize or coordinate any individual mutual aid effort.
          We do our best to curate and filter groups doing relevant, valuable work in
          their communities, but we cannot verify or vouch for any network or individual
          offerings. Please exercise all necessary judgement when interacting with
          community members not previously known to you.
        </p>
      </div>
    </div>
  )
}

export default About
