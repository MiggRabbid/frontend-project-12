import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { actions as authActions } from './authSlice';
import chatReducer, { actions as chatActions } from './chatSlice';
import modalReducer, { actions as modalActions } from './modalSlice';

const actions = {
  ...authActions,
  ...chatActions,
  ...modalActions,
};

export { actions };

export default combineReducers({
  authReducer,
  chatReducer,
  modalReducer,
});
