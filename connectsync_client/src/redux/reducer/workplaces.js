import {
  GET_ALL_PUBLIC_WORKPLACES,
  GET_ALL_WORKPLACES_MEMBERS,
  SET_ACTIVE_WORKPLACES,
} from "../action/types";

const initialState = {
  all_public_workplaces: [],
  loading: true,
  workplaces_members: [],
  active_workplaces: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PUBLIC_WORKPLACES:
      return {
        ...state,
        all_public_workplaces: payload,
        loading: false,
      };
    case GET_ALL_WORKPLACES_MEMBERS:
      return {
        ...state,
        workplaces_members: payload,
        loading: false,
      };
    case SET_ACTIVE_WORKPLACES:
      return {
        ...state,
        active_workplaces: payload,
        loading: false,
      };
    default:
      return state;
  }
}
