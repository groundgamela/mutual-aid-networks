import React from 'react'
import { Col, Row } from 'antd'

import './style.scss';
import eventMap from '../../assets/thp/eventMap.png'
import pledgeMap from '../../assets/thp/PledgeMap.png'
import thpLogo from '../../assets/thp/THP_logo_horizontal.png'
import th1 from '../../assets/thp/TH1.jpg'
import th2 from '../../assets/thp/TH2.jpg'

import { language } from './language'

const About = (props) => {
  const { siteLanguage } = props
  return (
    <div className='page-container'>
      <a href='https://townhallproject.com/'>
        <img src={thpLogo} alt='Town Hall Project logo' className='thpLogo'/>
      </a>
      <h2 className='title'>
        <span>
          {language.title[siteLanguage]}
          <a href='https://townhallproject.com/'> Town Hall Project.</a>
        </span>
      </h2>
      <div className='container'>
        <p>
          {language.description[siteLanguage]}
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
          {language.disclaimer[siteLanguage]}
        </p>
      </div>
    </div>
  )
}

export default About
