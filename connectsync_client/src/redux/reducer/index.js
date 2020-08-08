import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import popup from './popup';

export default combineReducers({
  auth,
  error,
  popup,
});

