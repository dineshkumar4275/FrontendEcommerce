import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        return {
          user: JSON.parse(user),
          token: token,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }
  return { user: null, token: null, isAuthenticated: false, loading: false, error: null };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => { state.loading = true; state.error = null; },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      }
    },
    loginFailure: (state, action) => { state.loading = false; state.error = action.payload; state.isAuthenticated = false; },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      }
    },
    clearError: (state) => { state.error = null; },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;