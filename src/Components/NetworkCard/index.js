import React from 'react';
import {
  Card,
  Row
} from 'antd';
import './style.css';

const networkInfo = {
    resource: 'Org/Resource name',
    Neighborhood: 'Neighborhood/region',
    City: 'City',
    stateAb: 'State',
    Country: 'Country',
    Form: 'http://covidmissoula.org/',
    socialMedia: 'facebook.com',
    category: 'category',
    specificCommunity: 'specific community',
    language: 'language',
}

const NetworkCard = (props) => {
  const {
    resource,
    Neighborhood,
    City,
    stateAb,
    Country,
    Form,
    socialMedia,
    category,
    specificCommunity,
    language
  } = networkInfo
  return (
    <Card
      className='network-card'
      title={resource}
      extra={
        <ul className='list-inline'>
        {category && <li>{category}</li>}
        {specificCommunity && <li>{specificCommunity}</li>}
      </ul>
      }
    >
      <ul className='list-inline'>
        {Neighborhood && <li>{Neighborhood}</li>}
        {City && <li>{City}</li>}
        {stateAb && <li>{stateAb}</li>}
        {Country && <li>{Country}</li>}
        {language && <li>{language}</li>}
      </ul>
      <Row justify="space-between">
        {Form && <a href={Form} className="button">Participate in this community</a>}
        {socialMedia && <a href={socialMedia} className="button">Join social media</a>}
      </Row>
    </Card>
  )
}

export default NetworkCard
