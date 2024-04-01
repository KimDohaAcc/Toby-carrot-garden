// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import hospitalReducer from "./slices/hospitalSlice";
import schoolReducer from "./slices/schoolSlice";
import placeReducer from "./slices/placeSlice";

const store = configureStore({
  reducer: {
    hospital: hospitalReducer,
    school: schoolReducer,
    place: placeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
