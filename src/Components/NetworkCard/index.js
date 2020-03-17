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
        form,
        social,
        category,
        community,
        language
      } = network
      return (
        <Card
          className='network-card'
          title={title}
          extra={
            <ul className='list-inline'>
            {category && <li>{category}</li>}
            {community && <li>{community}</li>}
          </ul>
          }
        >
          <ul className='list-inline'>
            {neighborhood && <li>{neighborhood}</li>}
            {address && <li>{address}</li>}
            {language && <li>{language}</li>}
          </ul>
          <Row justify="space-between">
            {form && <a href={form} className="button">Participate in this community</a>}
            {social && <a href={social} className="button">Join social media</a>}
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
