# GCloud Web Proxy
A simple http web proxy hosted with gcloud functions.  
Best suited for infrequent cross origin requests which would otherwise be prohibited by your browser.

## Usage
Requests must be of the form  
`https://<gcloud region>-<gcloud project>.cloudfunctions.net/gcloudWebProxy?url=<desired url>`  

The url parameter must be encoded as a URIComponent (see JavaScript `encodeURIComponent()`).  

## Deploying
1. Clone the repo
2. Have a gcloud project set up and configured from the gcloud CLI
3. Execute `npm run deploy` from the root of the repo directory
4. Start sending requests to the url specified by gcloud functions

## Some useful commands for local testing
`functions start`  
`functions kill`  
`functions deploy gcloudWebProxy --trigger-http`  
`functions logs read`  
