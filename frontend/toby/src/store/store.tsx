// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import hospitalReducer from "./slices/hospitalSlice";
import schoolReducer from "./slices/schoolSlice";
import placeReducer from "./slices/placeSlice";
import martReducer from "./slices/martSlice";
import policeReducer from "./slices/policeSlice";

const store = configureStore({
  reducer: {
    hospital: hospitalReducer,
    school: schoolReducer,
    mart: martReducer,
    police: policeReducer,
    place: placeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
