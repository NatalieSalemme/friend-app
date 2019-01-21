import axios from 'axios';
//if user is logged in, will send token w/ every request
const setAuthToken = token => {
  if(token) {
    //Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
}
export default setAuthToken;
