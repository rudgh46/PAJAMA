import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ovsessionSlice from "./modules/ovsessionSlice";

let store = configureStore({
  reducer: { ovsession: ovsessionSlice },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
