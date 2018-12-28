import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  // Dealing with Async data, Use Thunk middleware
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      // Call dispatch Redux-thunk
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User, Get  jwt Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save data to local Storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode Token using jwt_decode to get user data
      const decoded = jwt_decode(token);
      // dispatch to Set Current User function
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in User
export const setCurrentUser = decoded => {
  // Dispatch to reducer
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
  // Once set, Catch in AUTH reducer
};

// Log user Out
export const logoutUser = () => dispatch => {
  // Remove the jwtToken from localStorage
  localStorage.removeItem('jwtToken');
  // Remove the Auth header
  setAuthToken(false);
  // Set current user to empty object ={} that will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
