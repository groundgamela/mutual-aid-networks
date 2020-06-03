import React from 'react'
import { List } from 'antd'

import './style.scss';
import resourceList from '../../data/resources'
import SubmitButton from '../SubmitButton'

const Resources = (props) => {

  const parseResourceSections = () => {
    return resourceList.map(resourceSection => {
      return (
        <div key={resourceSection.section}>
          <h3 className='list-section-header'>{resourceSection.section}</h3>
          {displayResourceSectionContent(resourceSection.content)}
        </div>
      )
    })
  }

  const displayResourceSectionContent = (resources) => {
    return (
      <List
        itemLayout='horizontal'
        dataSource={resources}
        renderItem={resource => (
          <List.Item
            extra={resource.image &&
            <img
              className='resource-image'
              alt={resource.name}
              src={resource.image}
            />
          }
          >
            <List.Item.Meta
              title={<a className='list-title' target='_blank' href={resource.link}>{resource.name}</a>}
              description={resource.description}
            />
          </List.Item>
        )}
      >
      </List>
    )
  }

  return (
    <>
      <div className='resources page-container'>
        <h2 className='title'>Mutual Aid Resources</h2>
        <p>
          Starting your own Mutual Aid effort? Take a look at some of the invaluable resources community organizers have created:
        </p>
        {parseResourceSections()}
        <p>
          Thank you to all the mutual aid organizers, trainers, and other leaders out there doing this work and sharing best practices.
        </p>
      </div>
      <SubmitButton
        link='https://docs.google.com/forms/d/e/1FAIpQLScQOY2wlXUx7tM4R-DBZthp-H4LSSBMFs7wTvAi8xmamaB1fg/viewform'
        description='Submit a Mutual Aid Resource'
      />
    </>
  )
}

export default Resources
