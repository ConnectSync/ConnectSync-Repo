import { GET_ALL_POSTS, GET_POSTS_BY_ID, ADD_POST } from "../action/types";

//i guess another property -> isLoggedIn should be added which is initially false
const initialState = {
  posts: [],
  post: {
    text: "",
    comments: [],
  },
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POSTS_BY_ID:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };

    default:
      return state;
  }
}
