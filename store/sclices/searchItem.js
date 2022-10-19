import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchItem",
  initialState: {
    itemName: "",
  },
  reducers: {
    setItemName(state, { payload }) {
      state.itemName = payload;
    },
    unsetItemName(state) {
      state.itemName = ``;
    },
  },
});

export const { setItemName, unsetItemName } = searchSlice.actions;
export default searchSlice;
