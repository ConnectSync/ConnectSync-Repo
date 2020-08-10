import api from "../../utils/api";
import { removeError, setError } from "./error";
import { loadUser } from "./auth";
import {
  CREATE_WORKPLACE,
  JOIN_WORKPLACE,
  GET_ALL_PUBLIC_WORKPLACES,
  GET_ALL_WORKPLACES_MEMBERS,
  SET_ACTIVE_WORKPLACES,
} from "./types";

export const createWorkplace = (workplaceData) => async (dispatch) => {
  try {
    const res = await api.post("/workplace/", workplaceData);
    dispatch({
      type: CREATE_WORKPLACE,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch(removeError());
    if (err.response) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setError(error.msg, "danger")));
      }
    }
  }
};

export const joinWorkplace = (name) => async (dispatch) => {
  try {
    const workplaceId = await api.get(`/workplace/public/${name}`);

    const res = await api.post(`/workplace/${workplaceId.data._id}/join`);
    dispatch({
      type: JOIN_WORKPLACE,
    });
    dispatch(loadUser());
    //dispatch(removeError());
  } catch (err) {
    dispatch(removeError());
    if (err.response) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setError(error.msg, "danger")));
      }
    }
  }
};

export const getAllPublicWorkplaces = () => async (dispatch) => {
  try {
    const res = await api.get("/workplace/");
    dispatch({
      type: GET_ALL_PUBLIC_WORKPLACES,
      payload: res.data,
    });
    dispatch(removeError());
  } catch (err) {
    dispatch(removeError());
    if (err.response) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setError(error.msg, "danger")));
      }
    }
  }
};

export const getAllWorkplacesMembers = (workplaceData) => async (dispatch) => {
  try {
    const data = JSON.stringify(workplaceData);
    const res = await api.get(`/workplace/allMembers?workplaces=${data}`);
    const memberData = [];
    res.data.forEach((memberObj) => {
      memberObj.members.forEach((obj) => {
        memberData.push(obj);
      });
    });

    dispatch({
      type: GET_ALL_WORKPLACES_MEMBERS,
      payload: memberData,
    });
    dispatch(removeError());
  } catch (err) {
    dispatch(removeError());
    if (err.response) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setError(error.msg, "danger")));
      }
    }
  }
};

export const setActiveWorkplaces = (workplaceData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_ACTIVE_WORKPLACES,
      payload: workplaceData,
    });
    dispatch(removeError());
  } catch (err) {
    dispatch(removeError());
    dispatch(setError("Something went wrong!", "danger"));
  }
};
