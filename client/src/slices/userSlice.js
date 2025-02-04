import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },

    signInSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.isError = false;
    },

    signInFailure: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    logOutStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    logOutSuccess: (state) => {
      state.userInfo = null;
      state.isLoading = false;
      state.isError = false;
    },

    logOutFailure: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    updateStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    updateSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.isError = false;
    },

    updateFailure: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logOutSuccess,
  logOutFailure,
  logOutStart,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;

export default userSlice.reducer;
