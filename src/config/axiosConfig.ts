import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/**
 * Add the 'accessToken' as part of each request to the API
 */
client.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params['accessToken'] = process.env.REACT_APP_ACCESS_TOKEN;

  return config;
});

export default client;
