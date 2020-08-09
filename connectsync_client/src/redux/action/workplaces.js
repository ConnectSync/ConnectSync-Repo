import api from "../../utils/api";
import { removeError, setError } from "./error";
import { loadUser } from "./auth";
import { CREATE_WORKPLACE, JOIN_WORKPLACE } from "./types";

export const createWorkplace = (workplaceData) => async (dispatch) => {
  try {
    console.log("data=", workplaceData);
    const res = await api.post("/workplace/", workplaceData);
    console.log("workplace=", res.data);
    dispatch({
      type: CREATE_WORKPLACE,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
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
    console.log(name);
    const workplaceId = await api.get(`/workplace/public/${name}`);
    console.log("id==", workplaceId);

    const res = await api.post(`/workplace/${workplaceId.data._id}/join`);
    console.log("workplace=", res.data);
    dispatch({
      type: JOIN_WORKPLACE,
    });
    dispatch(loadUser());
    //dispatch(removeError());
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
