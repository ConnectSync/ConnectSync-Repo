import { GET_USER_BY_ID } from "../action/types";

//i guess another property -> isLoggedIn should be added which is initially false
const initialState = {
  loading: true,
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_BY_ID:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    default:
      return state;
  }
}
