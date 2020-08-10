import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import posts from './posts';
import workplaces from './workplaces';
import member from './member';
import popup from './popup';
import chat from './chat';
import user from './user';

export default combineReducers({
  auth,
  error,
  posts,
  workplaces,
  member,
  popup,
  workplaces,
  chat,
  user,
});
