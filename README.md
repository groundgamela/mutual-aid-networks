Welcome to Mutual-Aid-Project! This site is for organizing mutual aid efforts within your community. 

## Setup

Before starting, please reach out to Megan at info@townhallproject.com for environmental variables. 
Once you receive this information please create an .env file at the root level (same level as .gitignore) 
and copy and paste information into that file. 

#### The general development workflow is as follows:
- Fork the Mutual-Aid-Networks repo
- Make changes to your forked repo
- Send PRs from the forked repo to the main Mutual-Aid-Networks repo

#### Merging your changes to the main Mutual-Aid-Networks repo
1. update your forked master branch to match the main Mutual-Aid-Networks master branch:
- Set up the original Mutual-Aid-Networks admin repo as a remote (this only has to be done once):
  `git remote add upstream https://github.com/townhallproject/admin.git`
  - To verify that the remote was added: `git remote -v`
- `git checkout master`
- `git pull upstream master`
  - this brings all new content from the main Mutual-Aid-Networks repo into the current branch of your cloned repo
- `git push origin master`
  - this sends those changes to your fork

2. Rebase your topic branch onto your fork's master, which is now up to date with everyone elses changes:
- `git checkout <your branch>`
- `git rebase master`
  - if there are any problems they will become apparent here
- `git push origin master`

3. Create a pull request to the main Mutual-Aid-Networks repo master
- use the github UI

1. Download the files
Clone this repository to a folder of your choice on your local machine: git clone <repo URL>
Navigate to the newly cloned repository folder
Install the project dependencies: npm i
Run npm start to open in localhost
  
5. Devtools setup
React and Redux devtools can be helpful tools to install for debugging in Chrome:

React devtools chrome extension
Redux devtools chrome extension

6. 🎂 Congratulations you're done 🎂
When you encounter new problems, make SURE to edit this README with updated information so that future coders can spend more time being productive!



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
