import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelReducer from './channelSlice';
import chatReducer from './chatSlice';

const store = configureStore({
  reducer: {
    authReducer,
    channelReducer,
    chatReducer,
  },
});

export default store;
