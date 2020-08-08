import { SET_ERROR, REMOVE_ERROR } from '../action/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR:
      return [...state, payload];
    case REMOVE_ERROR:
      return [];
    default:
      return state;
  }
}