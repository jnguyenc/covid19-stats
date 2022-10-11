# BOP Covid-19 table
## Getting started

Clone this project to your local computer, and run:

`npm install`

`npm start`

*Please make sure port 9090 is not blocked.  You can reconfig to use a different port by editting webpack.config.js file.*

## Builds for Distributions

### For Production

> Important: Need to edit dataUrls.js before running the command below, and make sure all paths to data json files are correct.

`npm run build`

*Artifacts are generated in the /public/ directory.*


### For Developement
`npm run build-dev`

*Artifacts are generated in the /dev/ directory.  Note: data is copied to /dev/data/ sub directory.*


### For Gitlad/Github CI/CD pipeline
`npm run build-git`

*Artifacts are generated in the /public/ directory.  Note: data is copied to /public/data/ sub directory.*


## Contact
John Nguyen
<n1nguyen@bop.gov>
