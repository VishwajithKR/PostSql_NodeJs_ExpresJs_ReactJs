import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

store.subscribe(() => {
  const { user } = store.getState();
  sessionStorage.setItem("authUser", JSON.stringify(user));
});
