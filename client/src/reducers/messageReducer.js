import isEmpty from '../validation/is-empty';

import { GET_MESSAGES, DELETE_MESSAGE } from '../actions/types';
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
    default:
      return state;
  }
}
