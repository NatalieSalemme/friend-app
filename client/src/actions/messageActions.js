import axios from 'axios';

import { GET_MESSAGES } from './types';

export const getMessages = () => dispatch => {
  axios.get('/api/messages/all').then(res => console.log(res));
};
