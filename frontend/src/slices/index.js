import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelReducer from './channelSlice';

const store = configureStore({
  reducer: {
    authReducer,
    channelReducer,
  },
});

export default store;
