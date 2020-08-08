import { OPEN_POPUP, CLOSE_POPUP } from '../action/types';

const initialState = {
  activePopup: '',
  data: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_POPUP:
      return {
        ...state,
        activePopup: payload.name,
        data: payload.data,
      };

    case CLOSE_POPUP:
      return { ...state, activePopup: null, data: null };

    default:
      return state;
  }
}
