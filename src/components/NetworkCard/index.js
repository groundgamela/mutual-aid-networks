import React from 'react';
import {
  Card,
  Row
} from 'antd';
import './style.scss';


const NetworkCard = (props) => {

  const parseNetworks = (networks) => {
    return networks.map(network => {
      const {
        address,
        title,
        neighborhood,
        facebookPage,
        category,
        community,
        language,
        generalForm,
        supportRequestForm,
        supportOfferForm,
        geocodeStatus,
        state,
        country,
        id
      } = network;
      return (
        <Card
          className='network-card'
          title={title}
          key={id}
          onMouseEnter={
            () => props.setHoveredPoint(id)
          }
          onMouseLeave={
            () => props.setHoveredPoint(null)
          }
          extra={
            <ul className='list-inline'>
            {category && <li className={`text-${category.split(' ').join('-').toLowerCase()}`}>{category}</li>}
            {community && <li>{community}</li>}
          </ul>
          }
        >
          <ul className='list-inline'>
            {geocodeStatus === "hide city" ? <li>{neighborhood || ''}, {state}, {country}</li>
            : <>
              {neighborhood && <li>{neighborhood}</li>}
              {address && <li>{address}</li>}
            </>}
            {language && <li>{language}</li>}
          </ul>
          <Row justify="space-between">
            {generalForm && <a href={generalForm} target="_blank" rel="noopener noreferrer" className="button">Offer or request help</a>}
            {supportRequestForm && <a href={supportRequestForm} rel="noopener noreferrer" target="_blank" className="button">Request help</a>}
            {supportOfferForm && <a href={supportOfferForm} rel="noopener noreferrer" target="_blank" className="button">Offer help</a>}
            {facebookPage && <a href={facebookPage} rel="noopener noreferrer" target="_blank" className="button">Join social media</a>}
          </Row>
        </Card>
      )
    })
  }

  return (
    <>
      {parseNetworks(props.networks)}
    </>
  )
}

export default NetworkCard
