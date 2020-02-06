const axios = require('axios');

// Modify the header below if you wish to whitelist particular domain origins
const ACCESS_CONTROL_ALLOW_ORIGIN = '*';

/**
 * Attempt to proxy a single http request.
 * Requested url must be placed within the url query parameter and encoded as a
 * URIComponent. Failure to do so will result a 400 response.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.gcloudWebProxy = async (req, res) => {

  // Uses CORS to allow this proxy to be embedded within webpages
  res.header("Access-Control-Allow-Origin", ACCESS_CONTROL_ALLOW_ORIGIN);

  // Respond to preflight cors requests
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  if (!req.query.url) {
    console.log('Request with missing proxy URL parameter.')
    res.status(400).send('Request is missing proxy URL, this should be encoded as a URIComponent and placed within the "url" query parameter.')
    return;
  }

  try {
    console.log('Request for', req.query.url);
    let requestedResponse = await axios.get(req.query.url);
    console.log('Successfully carried out proxy.');
    res.status(200).send(requestedResponse.data);
  } catch (err) {
    if (err.response) {
      console.log(`Requested proxy URL returned an error with code ${err.response.status}.`);
      res.status(err.response.status).send(err.response.data);
    } else if (err.request) {
      console.log('Requested proxy URL failed to give a response.');
      res.status(404).send('The requested proxy URL failed to give a response.');
    }
  }
};
