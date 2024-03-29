import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  GET_FRIEND_REQUESTS,
  SHOW_FILTERED_PROFILES,
} from './types';

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  dispatch(clearErrors());
  // console.log('getting profile by handle');
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
};

//get profile by id
export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  dispatch(clearErrors());
  // console.log('getting profile by id');
  axios
    .get(`/api/profile/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
};
// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  // console.log('deleting experience');
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

// Delete Education
export const deleteEducation = id => dispatch => {
  // console.log('deleting education');
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/browse')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  // dispatch(setProfileLoading());
  // console.log('getting current profile');
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

//Post a comment to a profile
//Add Post
export const addProfileComment = (commentData, handle) => dispatch => {
  axios
    .post(`/api/profile/${handle}/comments`, commentData)
    .then(res => dispatch(getProfileByHandle(handle)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete Profile Comment
export const deleteProfileComment = (handle, commentId) => dispatch => {
  axios
    .delete(`/api/profile/${handle}/comments/${commentId}`)
    .then(res => dispatch(getProfileByHandle(handle)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add Profile Comment Like
export const addProfileCommentLike = (handle, id) => dispatch => {
  axios
    .post(`/api/profile/${handle}/comments/like/${id}`)
    .then(res => dispatch(getProfileByHandle(handle)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Unlike Profile Comment
export const unlikeProfileComment = (handle, id) => dispatch => {
  axios
    .post(`/api/profile/${handle}/comments/unlike/${id}`)
    .then(res => dispatch(getProfileByHandle(handle)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add friend request
export const addFriendRequest = handle => dispatch => {
  axios
    .post(`/api/profile/friendrequests/to/${handle}`)
    .then(res => console.log('from addrequestaction', res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Get friend requests
export const getMyFriendRequests = () => dispatch => {
  axios
    .get('/api/profile/friendrequests/to/me')
    .then(res =>
      dispatch({
        type: GET_FRIEND_REQUESTS,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FRIEND_REQUESTS,
        payload: null,
      })
    );
};

//Delete friend Request
export const deleteFriendRequest = (requestId, userId) => dispatch => {
  axios
    .delete(`/api/profile/friendrequests/to/me/${requestId}`)
    .then(res => dispatch(getProfileById(userId)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Accept friend request and add friend to current users profile
export const acceptFriendRequest = (requestId, userId) => dispatch => {
  axios
    .post(`/api/profile/friendrequests/to/me/${requestId}/${userId}`)
    .then(res => dispatch(friendAddsCurrentUser(userId)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//After accepting friend, current user gets added to future friends friend list
export const friendAddsCurrentUser = futureFriend => dispatch => {
  axios
    .post(`/api/profile/friendrequests/accept/${futureFriend}`)
    .then(res => dispatch(getCurrentProfile()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//show filtered profiles from query parameters in url
export const showFilteredProfiles = name => dispatch => {
  // console.log('filtering by ' + name);
  axios
    .get(`/api/profile/filter/${name}`)
    .then(res =>
      dispatch({
        type: SHOW_FILTERED_PROFILES,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: SHOW_FILTERED_PROFILES,
        payload: [],
      })
    );
};

export const updateAvatarStatus = () => dispatch => {
  axios.post('/api/profile/updateAvatarStatus').then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  );
};
//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
