import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_USER,
  UPDATE_USER,
  CLEAR_ERRORS,
} from './types';

//Register User
export const registerUser = (userData, history) => dispatch => {
  console.log('from the registerUser action');
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - Get user token
export const loginUser = userData => dispatch => {
  console.log('from the login User action');
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data;
      //Set token to local storage
      localStorage.setItem('jwtToken', token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//log user out
export const logoutUser = () => dispatch => {
  console.log('from the authActions logout');
  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove auth header
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false and user to an empty object

  dispatch(setCurrentUser({}));
};

// getCurrentUser
export const getCurrentUser = () => dispatch => {
  axios
    .get('/api/users/current')
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: {},
      })
    );
};

export const updateUser = userData => dispatch => {
  axios
    .post('/api/users/edit-account', userData)
    .then(res =>
      dispatch({
        type: UPDATE_USER,
        payload: res.data.event,
      })
    )
    .then(res =>
      dispatch({
        type: CLEAR_ERRORS,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const uploadPhoto = formData => dispatch => {
  console.log('from action creator', formData);

  axios
    .post('/api/users/me/avatar', formData)
    // .then(res => console.log(res.data));
    .then(res =>
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      })
    );

  // .then(res =>
  //   dispatch({
  //     type: CLEAR_ERRORS,
  //   })
  // )
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data,
  //   })
  // );
};

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
