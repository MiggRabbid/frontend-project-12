import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    username: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => ({
      ...state,
      isAuthenticated: true,
      token: action.payload.token,
      username: action.payload.username,
      error: null,
    }),
    loginFailed: (state, action) => ({
      ...state,
      isAuthenticated: false,
      token: null,
      username: null,
      error: action.payload,
    }),
    logout: (state) => ({
      ...state,
      isAuthenticated: false,
      token: null,
      username: null,
      error: null,
    }),
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;
