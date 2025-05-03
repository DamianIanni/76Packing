import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import propmtDataSlice from "./propmtDataSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    propmtData: propmtDataSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
