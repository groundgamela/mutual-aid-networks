Welcome to Mutual-Aid-Project! Our site is for organizing mutual aid effort in your community. 

## Setup

To Install: 

Before starting, please reach out to Megan at info@townhallproject.com for environmental variables. 
Once you receive this information(and you have completed steps 1-5), 
please create an .env file at the .gitignore 
level and copy and paste information into that file. 
IMPORTANT NOTE: Please add  .env   to the .gitignore. 
This is sensitive information and we do not want our .env file being saved on github.  
```
1. Fork the repository
2. From your fork, clone down a local copy
3. Open respository and run npm install/ npm i 
4. Run npm start 
5. If done successfully, you should see localhost:3000 with a map of the United States
```



Environmental Variables: 

```
.env 
REACT_APP_TESTING_FIREBASE_API_KEY=
REACT_APP_TESTING_FIREBASE_AUTH_DOMAIN=
REACT_APP_TESTING_DATABASE_URL=
REACT_APP_TESTING_PROJECT_ID=
REACT_APP_TESTING_STORAGE_BUCKET=
REACT_APP_TESTING_MESSAGING_SENDER_ID=

REACT_APP_PROD_FIREBASE_API_KEY=
REACT_APP_PROD_FIREBASE_AUTH_DOMAIN=
REACT_APP_PROD_DATABASE_URL=
REACT_APP_PROD_STORAGE_BUCKET=
REACT_APP_PROD_MESSAGING_SENDER_ID=
REACT_APP_PROD_PROJECT_ID=

REACT_APP_MAPBOX_STYLE_URL=
REACT_APP_MAPBOX_API_KEY=

NODE_ENV=

```
