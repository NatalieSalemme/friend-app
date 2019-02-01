import axios from 'axios';

import { GET_MESSAGES, DELETE_MESSAGE, GET_ERRORS } from './types';

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

export const deleteMessage = id => dispatch => {
  axios
    .delete(`/api/messages/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_MESSAGE,
        payload: id,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
