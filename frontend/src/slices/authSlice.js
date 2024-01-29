import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => ({
      ...state,
      isAuthenticated: true,
      token: action.payload,
      error: null,
    }),
    loginFailed: (state, action) => ({
      ...state,
      isAuthenticated: false,
      token: null,
      error: action.payload,
    }),
    logout: (state) => ({
      ...state,
      isAuthenticated: false,
      token: null,
      error: null,
    }),
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;
