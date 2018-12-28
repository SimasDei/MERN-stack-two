import axios from 'axios';
import { GET_ERRORS } from './types';

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
