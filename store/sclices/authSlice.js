import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: ``,
  },
  reducers: {
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
    },
    unsetAccessToken(state) {
      state.accessToken = ``;
    },
  },
});

export const { setAccessToken, unsetAccessToken } = authSlice.actions;
export default authSlice;
