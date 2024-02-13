import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state) => ({
      ...state,
      isAuthenticated: true,
      error: null,
    }),
    loginFailed: (state, action) => ({
      ...state,
      isAuthenticated: false,
      error: action.payload,
    }),
    logout: (state) => ({
      ...state,
      isAuthenticated: false,
      error: null,
    }),
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;
