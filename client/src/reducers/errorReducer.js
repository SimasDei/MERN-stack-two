import { GET_ERRORS } from '../actions/types';

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // Payload will include errors object from the axios request
      return action.payload;
    default:
      return state;
  }
}
