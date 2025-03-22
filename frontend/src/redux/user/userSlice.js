import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  isSignUpVisible: false, // This should be here within the main initial state
};

const userSlice = createSlice({
  name: 'user',
  initialState, // All state variables are managed from `initialState`
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    showSignUp: (state) => {
      state.isSignUpVisible = true; 
    },
    hideSignUp: (state) => {
      state.isSignUpVisible = false;
    },
  },
});

// Exporting the actions and reducer
export const { signInStart, signInSuccess, signInFailure, showSignUp, hideSignUp } = userSlice.actions;
export default userSlice.reducer;
