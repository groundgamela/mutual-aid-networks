import React from 'react'
import { Layout } from 'antd'

import { translations } from './language'

const { Footer } = Layout

const PageFooter = (props) => {

  const { siteLanguage } = props
  return (
    <Footer style={{ textAlign: 'center' }}>
      <div className="footer-text">
        <p>
          {translations.disclaimer[siteLanguage]}
        </p>
        <p>
          <span>
            {translations.licenses[siteLanguage]}
            <a rel='noopener noreferrer' target='_blank' href='http://www.opendatacommons.org/licenses/pddl/1.0/'>Public Domain Dedication and License v1.0</a>.
          </span>
        </p>
        <p>
          <span>
            {translations.source[siteLanguage]}
            <a href="https://townhallproject.com/" rel="noopener noreferrer" target="_blank" >Town Hall Project</a>.
          </span>
          <span>
            {translations.contact[siteLanguage]}
            <a href="mailto:info@townhallproject.com">info@townhallproject.com</a>
          </span>
        </p>
      </div>
    </Footer>
  )
}

export default PageFooter
