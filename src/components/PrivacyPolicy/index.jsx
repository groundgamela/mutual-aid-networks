import React from 'react'

const PrivacyPolicy = (props) => {
  return (
    <div className='page-container'>
      <div className='privacy-policy'>
        <h2 className='title'>PrivacyPolicy</h2>
        <p>Information about your use of this website is collected using Google Analytics. The collected information consists of the following:</p>
        <ul>
          <li>
            The IP address from which you access the website
          </li>
          <li>
            The type of browser and operating system you use to access our site
          </li>
          <li>
            The date and time you access our sit
          </li>
          <li>
            The pages you visit
          </li>
          <li>
            The addresses of pages from where you followed a link to our site
          </li>
        </ul>
        <p>
          Part of this information is gathered using a tracking cookie set by the Google Analytics service
          and handled by Google as described in the Google privacy policy. See your browser documentation for
          instructions on how to disable the cookie if you prefer not to share this data with Google.
        </p>
        <p>
          We use the gathered information to help us make our site more useful to visitors and to better
          understand how and when our site is used. We do not track or collect personally identifiable
          information or associate gathered data with any personally identifying information from other sources.
        </p>
        <p>
          By using this website, you consent to the collection of this data in the manner and for the purpose described above.
        </p>
        <h3>User-Submitted Data</h3>
        <p>
          This website may use Google or other forms to collect data from the user. All data collected will be
          used in accordance with instructions on the intake form. If you do not wish your data displayed, contact
          <a href="mailto:info@townhallproject.com"> info@townhallproject.com</a> to have it removed.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
