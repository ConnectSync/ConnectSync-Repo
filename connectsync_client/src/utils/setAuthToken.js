import api from './api';
//import axios from 'axios'
const setAuthToken = token => {
  if (token) {
    console.log('seting headers')
    api.defaults.headers.common['jwt-auth-token'] = token;
    console.log(api.defaults.headers)
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['jwt-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;