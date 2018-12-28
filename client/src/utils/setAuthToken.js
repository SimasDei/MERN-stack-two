import axios from 'axios';

// Always attached the authorization header to a logged in user
const setAuthToken = token => {
  if (token) {
    // Apply to all requests
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // No token = Delete Auth Header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
