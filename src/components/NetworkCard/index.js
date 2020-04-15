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
        >
          <ul className='list-inline'>
            {neighborhood && <li>{neighborhood}</li>}
            {address && <li>{address}</li>}
            {language && <li>{language}</li>}
            {community && <li>{community}</li>}
          </ul>
          <Row justify="space-between" className='community-buttons'>
            {generalForm && <a href={generalForm} target="_blank" rel="noopener noreferrer" className="button text-general">General</a>}
            {supportRequestForm && <a href={supportRequestForm} rel="noopener noreferrer" target="_blank" className="button text-request-support">Request help</a>}
            {supportOfferForm && <a href={supportOfferForm} rel="noopener noreferrer" target="_blank" className="button text-offer-support">Offer help</a>}
            {facebookPage && <a href={facebookPage} rel="noopener noreferrer" target="_blank" className="button text-community">Community</a>}
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
