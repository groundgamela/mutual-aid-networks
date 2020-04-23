import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

const PageFooter = (props) => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <div className="footer-text">
        <p>
          We list these networks as a public resource. We cannot verify or vouch for any network
          or individual offerings. Please exercise all necessary judgement when interacting with
          community members not previously known to you.
        </p>
        <p>
          This data set is made available under the <a rel="noopener noreferrer" target="_blank" href="http://www.opendatacommons.org/licenses/pddl/1.0/">Public Domain Dedication and License v1.0</a>.
        </p>
        <p>
          This website is brought to you by <a href="https://townhallproject.com/" rel="noopener noreferrer" target="_blank" >Town Hall Project</a>.
          To report an error or other issue, please contact: <a href="mailto:info@townhallproject.com">info@townhallproject.com</a>
        </p>
      </div>
    </Footer>
  )
}

export default PageFooter
