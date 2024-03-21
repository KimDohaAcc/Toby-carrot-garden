// rootReducers.tsx
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice.tsx";

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
