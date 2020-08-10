import { SET_CHAT_WORKPLACE } from '../action/types';
const initialState = {
  id: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CHAT_WORKPLACE:
      return { ...state, id: payload };

    default:
      return state;
  }
}
