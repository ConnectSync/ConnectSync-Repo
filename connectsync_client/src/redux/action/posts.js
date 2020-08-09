import api from "../../utils/api";
import axios from "axios"; //this is required to post images
import { GET_ALL_POSTS, GET_POSTS_BY_ID, ADD_POST } from "./types";
import { setError, removeError } from "./error";

export const getAllPosts = (workplacesObj) => async (dispatch) => {
  try {
    const workplaces = JSON.stringify(workplacesObj);
    const res = await api.get(`/post?workplaces=${workplaces}`);

    dispatch({
      type: GET_ALL_POSTS,
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

export const getPostByID = (postId) => async (dispatch) => {
  try {
    const res = await api.get(`/post/${postId}`);

    dispatch({
      type: GET_POSTS_BY_ID,
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

export const addPost = (postData, workplacesObj) => async (dispatch) => {
  try {
    const workplaces = JSON.stringify(workplacesObj);
    const res = await api.post(
      `/post/addPost?workplaces=${workplaces}`,
      postData
    );

    dispatch({
      type: ADD_POST,
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
