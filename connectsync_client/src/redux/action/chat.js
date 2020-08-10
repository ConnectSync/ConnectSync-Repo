import { SET_CHAT_WORKPLACE } from './types';

export const setChatWorkplace = (data) => (dispatch) => {
  dispatch({
    type: SET_CHAT_WORKPLACE,
    payload: data,
  });
};
