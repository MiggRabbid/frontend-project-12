import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { actions as authActions } from './authSlice';
import chatReducer, { actions as chatActions } from './chatSlice';

const actions = {
  ...authActions,
  ...chatActions,
};

export { actions };

export default combineReducers({
  authReducer,
  chatReducer,
});
