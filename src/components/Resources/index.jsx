import React from 'react'
import { List } from 'antd'

import './style.scss';
import { resourceList } from './constants'
import SubmitButton from '../SubmitButton'

const Resources = (props) => {
  return (
    <>
      <div className='resources'>
        <h2 className='title' >Mutual Aid Resources</h2>
        <p>
          Starting your own Mutual Aid effort? Take a look at some of the invaluable resources community organizers have created:
        </p>
        <List
          itemLayout='horizontal'
          dataSource={resourceList}
          renderItem={resource => (
            <List.Item className='list'>
              <List.Item.Meta
                title={<a className='list-title' target='blank' href={resource.link}>{resource.name}</a>}
              />
            </List.Item>
          )}
        >
        </List>
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
