// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import hospitalReducer from "./slices/hospitalSlice";
import schoolReducer from "./slices/schoolSlice";
const store = configureStore({
  reducer: {
    hospital: hospitalReducer,
    school: schoolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
