import React from 'react'
import { List } from 'antd'

import './style.scss';
import { translations } from './language'
import SubmitButton from '../SubmitButton'

const { resourceList } = translations

const Resources = (props) => {
  const { siteLanguage } = props
  return (
    <>
      <div className='resources page-container'>
        <h2 className='title'>{translations.title[siteLanguage]}</h2>
        <p>
        {translations.listDescription[siteLanguage]}
        </p>
        <List
          itemLayout='horizontal'
          dataSource={resourceList}
          renderItem={resource => (
            <List.Item className='list'>
              <List.Item.Meta
                title={<a className='list-title' target='blank' href={resource.link}>{resource.name[siteLanguage]}</a>}
              />
            </List.Item>
          )}
        >
        </List>
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
