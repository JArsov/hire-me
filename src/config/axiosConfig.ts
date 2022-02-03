import axios from 'axios';

/**
 * Initial setup of the http client
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/**
 * Add the 'accessToken' as part of each request to the API
 */
client.interceptors.request.use(config => {
  // If 'get' method is used, we include the accessToken as query param
  if (config.method === 'get') {
    config.params = config.params || {};
    config.params['accessToken'] = process.env.REACT_APP_ACCESS_TOKEN;
  }
  // Otherwise -> we include it in the request body
  else {
    config.data = config.data || {};
    config.data['accessToken'] = process.env.REACT_APP_ACCESS_TOKEN;
  }

  return config;
});

export default client;
