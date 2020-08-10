import { OPEN_POPUP, CLOSE_POPUP } from "./types";

export const openChangePopup = (name, data = null) => (dispatch) => {
  // const body = document.getElementById('root');
  // body.style.filter = 'blur(5px)';
  let title = data;

  if (name == "REGISTER")
    title = "CREATE ACCOUNT";
  if (name == "LOGIN")
    title = "LOGIN";
  if (name == "CREATE_PROFILE")
    title = "This is CREATE PROFILE dummy text (coming from popup action)";

  dispatch({
    type: OPEN_POPUP,
    payload: { name, data: data || title },
  });
};

export const removePopup = () => (dispatch) => {
  // const body = document.getElementById('root');
  // body.style.filter = 'blur(0px)';

  dispatch({
    type: CLOSE_POPUP,
  });
};
