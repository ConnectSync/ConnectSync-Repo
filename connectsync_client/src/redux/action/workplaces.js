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
