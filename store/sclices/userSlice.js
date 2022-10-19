import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    unsetUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice;
