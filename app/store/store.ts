// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  const { auth } = store.getState();
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ user: auth.user, uid: auth.uid })
  );
});

// Export the store's type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
