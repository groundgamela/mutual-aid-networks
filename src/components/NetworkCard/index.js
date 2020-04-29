import React from 'react';
import {
  Card,
  Row
} from 'antd';
import './style.scss';
import { standardizePhoneNumber } from '../../utils/index'
import { language as pageLanguage } from './language'


const NetworkCard = (props) => {
  const { siteLanguage } = props

  const parseNetworks = (networks) => {
    return networks.map(network => {
      const {
        address,
        title,
        neighborhood,
        facebookPage,
        hotlineNumber,
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
        >
          <ul className='list-inline'>
            {geocodeStatus === "hide city" ? <li>{neighborhood || ''}, {state}, {country}</li>
            : <>
              {neighborhood && <li>{neighborhood}</li>}
              {address && <li>{address}</li>}
            </>}
            {hotlineNumber && <li>{standardizePhoneNumber(hotlineNumber)}</li>}
            {language && language.length ? <li>{language.join(', ')}</li> : null}
            {community && <li>{community}</li>}
          </ul>
          <Row justify="space-between" className='community-buttons'>
            {generalForm && <a href={generalForm} target="_blank" rel="noopener noreferrer" className="button text-general">{pageLanguage.general[siteLanguage]}</a>}
            {supportRequestForm && <a href={supportRequestForm} rel="noopener noreferrer" target="_blank" className="button text-request-support">{pageLanguage.supportRequest[siteLanguage]}</a>}
            {supportOfferForm && <a href={supportOfferForm} rel="noopener noreferrer" target="_blank" className="button text-offer-support">{pageLanguage.supportOffer[siteLanguage]}</a>}
            {facebookPage && <a href={facebookPage} rel="noopener noreferrer" target="_blank" className="button text-community">{pageLanguage.facebookPage[siteLanguage]}</a>}
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
