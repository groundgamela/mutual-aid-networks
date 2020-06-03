/*
To add a new resource, first find the section you want to put it in. Then, add a new object to that section's
content array. The object will need to have a name, link and description. Optionally, you can also include an
image, which should be a url link. You can copy the template below:

{
  name: "name/resource title",
  link: "link to the resource",
  description: "description of the resource",
  image: "OPTIONAL: url link to a visual"
},

If you want to make a new section, you need to add a new object into the outermost array. This object will need
a section, which is the name of the section, and content, which is an array of objects like the example one listed
above, which include all of the resources you want in that section. You can copy the template below:

{
  section: 'TITLE OF THE SECTION - USE ALL CAPS TO BE CONSISTENT WITH THE OTHER SECTION TITLES',
  content: [
    {
      name: "name/resource title",
      link: "link to the resource",
      description: "description of the resource",
      image: "OPTIONAL: url link to a visual"
    },
  ]
},

*/

export default [
  {
    section: 'WHAT IS MUTUAL AID?',
    content: [
      {
        name: "Mutual Aid 101",
        link: "https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/NO-LOGOS-Mutual-Aid-101_-Toolkit.pdf",
        description: "Primer on what mutual aid is, and how to get started"
      },
      {
        name: "Collective Care Is Our Best Weapon against COVID-19",
        link: "https://docs.google.com/document/d/1uP49OQGhosfBN4BOYQvyy_Mu3mpCSOYzip13LksC-S8/edit",
        description: "Resource list for all aspects of mutual aid work"
      },
      {
        name: "How Lending Circles and Mutual Aid Groups help",
        link: "https://www.resilience.org/stories/2013-08-26/how-lending-circles-mutual-aid-groups-create-community-resilience/",
        description: "A brief analysis of mutual aid and their relevance to society today",
        image: "https://www.resilience.org/wp-content/uploads/2016/12/Economy-category-default.jpg"
      },
    ]
  },
  {
    section: 'HOW TO GET STARTED',
    content: [
      {
        name: "Mapping your skills and evaluating how you can help",
        link: "https://mutualaiddisasterrelief.org/wp-content/uploads/2019/06/Skills-zine-3-pdf.pdf",
        description: "Want to help, but not sure how? This zine will help you take stock of your skills"
      },
      {
        name: "Pod Mapping for Mutual Aid",
        link: "https://docs.google.com/document/d/1-QfMn1DE6ymhKZMpXN1LQvD6Sy_HSnnCK6gTO7ZLFrE/mobilebasic",
        description: "Map your community"
      },
      {
        name: "Neighborhood Pods How-To",
        link: "https://docs.google.com/document/d/1j8ADhLEuKNDZ1a_opmzudywJPKMXcNKu01V1xY2MiIA/preview",
        description: "Tips to connect with your mapped pod"
      },
      {
        name: "AARP: How to Start a Mutual Aid Group",
        link: "https://aarpcommunityconnections.org/start-group/",
        description: "Simple overview of starting a mutual aid group",
        image: "https://i1.wp.com/aarpcommunityconnections.org/wp-content/uploads/2020/03/Community-Connections-Facebook-Image.jpg?fit=1200%2C630&ssl=1"
      },
      {
        name: "MUTUAL AID NYC: How to set up a Mutual Aid neighborhood group",
        link: "http://mutualaid.nyc/2020/03/29/how-to-set-up-a-mutual-aid-neighborhood-group-a-resource-list/",
        description: "Built for NYC, but full of a variety of applicable resources for a mutual aid group"
      },
    ]
  },
  {
    section: 'HOW TO ORGANIZE SAFELY',
    content: [
      {
        name: "Safety Practices for Mutual Aid Food & Supply Distribution",
        link: "https://mutualaiddisasterrelief.org/wp-content/uploads/2020/03/COVID-SupplyDistro-MASafetyPracticesZine-WEB.pdf",
        description: "Printable guide for proper food handling"
      },
      {
        name: "EFF: Keeping Each Other Safe When Virtually Organizing Mutual Aid",
        link: "https://www.eff.org/deeplinks/2020/03/keeping-each-other-safe-when-virtually-organizing-mutual-aid",
        description: "Security measures for online organizing",
        image: "https://www.eff.org/files/banner_library/covid-laptops-speech-1.png"
      },
      {
        name: "Flyering for Neighborhood Support Networks Safely",
        link: "https://docs.google.com/document/d/1_ix4-qyf1qCZDpXAH98zOwL4irF00DvCXnFL-eT-DcU/edit",
        description: "Protocols for safe flyering"
      },
      {
        name: "COVID-19 Communication Symbols",
        link: "https://docs.google.com/document/d/1-Qh0YEj6_7pG6BTTGWN7EwYkfw2CfpRYheL8mzvk_ZU/edit",
        description: "Color coding for uniform communication"
      },
    ]
  },
  {
    section: 'DIGITAL TOOLS AND TACTICS',
    content: [
      {
        name: "How to Make a Mutual Aid Map",
        link: "https://docs.google.com/document/d/1iG7A2UF87-vFOzl0mXEtJt-uf64c8AGvtdezxLfLWDU/edit?fbclid=IwAR2uKwUc22Fnxh1jJAgQZuu9NLIlC6JGJLT3-z3Xjam-DvWSihJOi5Sxdbc",
        description: "Guidance from Google Earth about how to make a simple custom map"
      },
      {
        name: "Communities Essential Guide to Digital Tools — for Mutual Aid Groups",
        link: "https://medium.com/digitalfund/communities-essential-guide-to-digital-tools-for-mutual-aid-groups-c1664d30b525",
        description: "A simple curated toolkit of valuable organizing tools",
        image: "https://miro.medium.com/max/852/0*GPn2oFtg5PRrdWyp.jpg"
      },
      {
        name: "MUTUAL AID ARLINGTON: How to Set Up a Mutual Aid Website",
        link: "https://mutualaidarlington.org/setup/#domain-name-forwarding---improve-your-web-address",
        description: "Step-by-step guidance on how to create a simple website"
      },
    ]
  },
  {
    section: 'GETTING IN TOUCH WITH MUTUAL AID COMMUNITY',
    content: [
      {
        name: "Covid-19 Mutual Aid Slack",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSec5f4MHWMJ68wKfrRW7qhAvmo1F7vcbnSBIbZhAezaGAL8kQ/viewform?fbclid=IwAR3YeWILV84Z83HeI6cDjTvDSTnNgH7ZDIjEksPYFm1iSxCu-XpJd6gtNgs",
        description: "Digital hub for communicating with other mutual aid groups"
      },
      {
        name: "RSVP for Weekly Mutual Aid Organizing Calls",
        link: "https://forms.gle/1uNJgh5WeJ3XfMga9",
        description: "Join best practice sharing sessions with fellow mutual aid organizers"
      },
    ]
  },
  {
    section: 'OTHER RESOURCES',
    content: [
      {
        name: "Database of Localized Resources During Corona Outbreak",
        link: "https://docs.google.com/spreadsheets/d/1HEdNpLB5p-sieHVK-CtS8_N7SIUhlMpY6q1e8Je0ToY/edit#gid=1604093003",
        description: "A comprehensive, constantly-updated spreadsheet of resources"
      },
      {
        name: "Coronavirus Resource Kit",
        link: "https://docs.google.com/document/d/1Rcan4C_e6OBFBI5bUn7MtYK74Ab-WarxyJmDvZUI_YA/preview",
        description: "Extensive document outlining resources by geographic region"
      },
      {
        name: "Free translation services for COVID-19 community projects",
        link: "https://www.creatingpuentes.com/",
        description: "Submission page for requesting translation services in Spanish, English and French"
      },
      {
        name: "Funds for Coronavirus Relief Efforts",
        link: "https://candid.org/explore-issues/coronavirus/funds",
        description: "Database of funding opportunities for Coronavirus projects",
        image: "https://candid.org/var/ezflow_site/storage/images/site_candid/explore-issues/coronavirus/funds/22821987-8-eng-US/funds-for-coronavirus-relief_fb_og_image.png"
      },
      {
        name: "COVID Resource Librarian",
        link: "https://www.covidresourcelibrarian.com/about",
        description: "Live “Librarian” to answer Covid resource questions"
      },
    ]
  },
]
