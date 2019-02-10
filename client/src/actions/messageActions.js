import axios from 'axios';

import {
  GET_MESSAGES,
  DELETE_MESSAGE,
  GET_ERRORS,
  GET_MESSAGE_THREAD,
} from './types';

//Get all messages
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
//Delete message by Id
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

//Get message thread
export const getMessageThread = id => dispatch => {
  axios
    .get(`/api/messages/reply/${id}`)
    .then(res =>
      dispatch({
        type: GET_MESSAGE_THREAD,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MESSAGE_THREAD,
        payload: null,
      })
    );
};

//Get all messages from a single user
export const getMessagesFrom = senderId => dispatch => {
  axios
    .get(`/api/messages/from/${senderId}`)
    .then(res =>
      dispatch({
        type: GET_MESSAGE_THREAD,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
