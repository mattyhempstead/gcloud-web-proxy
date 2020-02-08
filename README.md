# GCloud Web Proxy
A simple http web proxy hosted with gcloud functions.  
Best suited for infrequent cross origin requests which would otherwise be prohibited by your browser.


## Usage
Requests must be of the form  
`https://<gcloud region>-<gcloud project>.cloudfunctions.net/gcloudWebProxy?url=<desired url>`  

The url parameter must be encoded as a URIComponent (see JavaScript `encodeURIComponent()`).  

### Example
As an example use case, you may wish to embed a script in a webpage which extracts the number of views of a *particular* [YouTube video](https://www.youtube.com/watch?v=dQw4w9WgXcQ) by scraping the HTML returned by YouTube.  
Attempting this request directly from the browser would fail due to the Same Origin Policy.  

Instead, using the web proxy we can indirectly fetch the page HTML, and parse it on the client side for the view count.

```javascript
// Encode the youtube url in a format which can be used as a query parameter
const url = encodeURIComponent('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

// Send request to web proxy with the encoded url as the 'url' parameter
fetch('https://us-central1-myproject.cloudfunctions.net/gcloudWebProxy?url=' + url)
  .then(res => res.text())
  .then(text => {
    const dummyDOM = document.createElement('html');
    dummyDOM.innerHTML = text;
    const viewCount = dummyDOM.getElementsByClassName('watch-view-count')[0].innerHTML;
    console.log(viewCount);
  });
```

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
