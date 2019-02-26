import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_FRIEND_REQUESTS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  myProfile: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case GET_FRIEND_REQUESTS:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
}
