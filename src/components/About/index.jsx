import React from 'react'
import { Col, Row } from 'antd'

import './style.scss';
import bernieGG from '../../assets/gg/bernie-gg-pic.jpg'
import youthCS from '../../assets/gg/youth-climate-strike.jpg'
import ggLogo from '../../assets/gg/ggla-black.png'
import tenantPower from '../../assets/gg/chinatown-tenants-timo-saarelma-latu.jpg'
import homesGuarantee from '../../assets/gg/homes-guarantee-press-conference.jpg'

import { translations } from './language'

const About = (props) => {
  const { siteLanguage } = props
  return (
    <div className='page-container'>
      <a href='https://www.groundgamela.org/'>
        <img src={ggLogo} alt='Ground Game Los Angeles logo' className='ggLogo'/>
      </a>
      <h2 className='title'>
        <span>
          {translations.title[siteLanguage]}
          <a href='https://www.groundgamela.org/'> Ground Game Los Angeles.</a>
        </span>
      </h2>
      <div className='container'>
        <p>
          {translations.description[siteLanguage]}
        </p>

        <div className='imageCollage'>
          <Row>
            <Col span={14}>
              <img src={bernieGG} alt='Bernie with Ground Game group' className='map'/>
            </Col>
            <Col span={10}>
              <img src={tenantPower} alt='Chinatown Tenants protesting with LA Tenants Union' className='hall'/>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
            <img src={homesGuarantee} alt='Homes Guarantee press conference' className='hall'/>
            </Col>
            <Col span={14}>
              <img src={youthCS} alt='women speaking at Youth Climate Strike' className='map'/>
            </Col>
          </Row>
        </div>

        <p>
          {translations.disclaimer[siteLanguage]}
        </p>
      </div>
    </div>
  )
}

export default About
