import axios from 'axios';

import { GET_MESSAGES } from './types';

export const getMessages = () => dispatch => {
  axios
    .get('/api/messages/all')
    .then(res =>
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch({
        type: GET_MESSAGES,
        payload: null,
      });
    });
};
