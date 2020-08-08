import { v4 as uuidv4 } from 'uuid';
import { SET_ERROR, REMOVE_ERROR } from './types';

export const setError = (msg, errorType) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ERROR,
    payload: { msg, errorType, id }
  });
};

export const removeError = ()=> dispatch=> {
  dispatch({
    type: REMOVE_ERROR
  })
}