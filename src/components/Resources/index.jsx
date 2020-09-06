import React from 'react'
import { List } from 'antd'

import './style.scss';
import { translations } from './language'
import SubmitButton from '../SubmitButton'

const { resourceList } = translations

const Resources = ({ siteLanguage }) => {

  const parseResourceSections = () => {
    return resourceList.map(resourceSection => {
      return (
        <div key={resourceSection.section[siteLanguage]}>
          <h3 className='list-section-header'>{resourceSection.section[siteLanguage]}</h3>
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
              alt={resource.name[siteLanguage]}
              src={resource.image}
            />
          }
          >
            <List.Item.Meta
              title={<a className='list-title' target='_blank' rel='noopener noreferrer' href={resource.link}>{resource.name[siteLanguage]}</a>}
              description={resource.description[siteLanguage]}
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
        <h2 className='title'>{translations.title[siteLanguage]}</h2>
        <p>
          {translations.listDescription[siteLanguage]}
        </p>
        {parseResourceSections()}
        <p>
          {translations.appreciationNote[siteLanguage]}
        </p>
      </div>
      <SubmitButton
        link='https://docs.google.com/forms/d/e/1FAIpQLScQOY2wlXUx7tM4R-DBZthp-H4LSSBMFs7wTvAi8xmamaB1fg/viewform'
        description={translations.submitButton[siteLanguage]}
      />
    </>
  )
}

export default Resources
