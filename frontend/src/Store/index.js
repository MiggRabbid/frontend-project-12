// import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { actions as authActions } from './slices/authSlice';
import channelReducer, { actions as channelActions } from './slices/channelSlice';
import chatReducer, { actions as chatActions } from './slices/chatSlice';

// const store = configureStore({
//   reducer: {
//     authReducer,
//     channelReducer,
//     chatReducer,
//   },
// });

// export default store;
const actions = {
  ...authActions,
  ...channelActions,
  ...chatActions,
};

export { actions };

export default combineReducers({
  authReducer,
  channelReducer,
  chatReducer,
});
