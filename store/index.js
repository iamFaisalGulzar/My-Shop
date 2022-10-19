import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import counterSlice from "./sclices/counterSlice";
import userSlice from "./sclices/userSlice";
import authSlice from "./sclices/authSlice";
import searchSlice from "./sclices/searchItem";
import cartSlice from "./sclices/cartSlice";

const reducers = combineReducers({
  counterReducer: counterSlice.reducer,
  user: userSlice.reducer,
  auth: authSlice.reducer,
  search: searchSlice.reducer,
  cart: cartSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counterReducer", "auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
