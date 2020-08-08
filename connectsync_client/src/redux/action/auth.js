import api from "../../utils/api";
//import axios from 'axios'
import { setError, removeError } from "./error";
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED } from "./types";
import setAuthToken from "../../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get("/user/");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    console.log(res.data);
  } catch (err) {
    dispatch(setError("No Token Found", "danger"));
  }
};

// Register User
export const register = (authData) => async (dispatch) => {
  try {
    const res = await api.post("/user/register", authData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
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

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
