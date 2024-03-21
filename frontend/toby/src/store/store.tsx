// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import hospitalReducer from "./slices/hospitalSlice";

const store = configureStore({
  reducer: {
    hospital: hospitalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
