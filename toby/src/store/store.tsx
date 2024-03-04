// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.tsx";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
