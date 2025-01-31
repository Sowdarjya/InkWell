import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
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
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
