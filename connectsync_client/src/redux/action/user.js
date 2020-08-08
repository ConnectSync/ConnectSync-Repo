import api from "../../utils/api";
import { setError, removeError } from "./error";
import { GET_USER_BY_ID } from "./types";

export const getUserByID = (userId) => async (dispatch) => {
  try {
    console.log("id==", userId);
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
        errors.forEach((error) => dispatch(setError(error.msg, "danger")));
      }
    }
  }
};
