import api from '../../utils/api';
import axios from 'axios';
import { setError, removeError } from './error';
import { GET_USER_BY_ID } from './types';

export const getUserByID = (userId) => async (dispatch) => {
  try {
    console.log('id==', userId);
    const res = await api.get(`/user/${userId}`);
    console.log(res.data);
    dispatch({
      type: GET_USER_BY_ID,
      payload: res.data,
    });
    dispatch(removeError());
  } catch (err) {
    dispatch(removeError());
    console.log(err);
    if (err.response) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setError(error.msg, 'danger')));
      }
    }
  }
};

export const addProfileImage = (postData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'x-auth-token': token,
      },
    };

    const res = await axios.post(
      'http://localhost:5000/api/user/addProfileImage',
      postData,
      config
    );

    dispatch(loadUser());
    dispatch(removeError());
  } catch (err) {
    dispatch(removeError());
    console.log(err);
    if (err.response) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setError(error.msg, 'danger')));
      }
    }
  }
};
