import isEmpty from '../validation/is-empty';

import {
  GET_MESSAGES,
  DELETE_MESSAGE,
  GET_MESSAGE_THREAD,
} from '../actions/types';
const initialState = {
  message: {},
  messages: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          message => message._id !== action.payload
        ),
      };
    case GET_MESSAGE_THREAD:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}
