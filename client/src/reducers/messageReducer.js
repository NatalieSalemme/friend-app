import isEmpty from '../validation/is-empty';

import { GET_MESSAGES } from '../actions/types';
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
    default:
      return state;
  }
}
