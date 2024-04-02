import { createSlice } from "@reduxjs/toolkit";

const placeSlice = createSlice({
  name: "place",
  initialState: {
    placeId: 0,
    isplaceClear: false,
  },
  reducers: {
    getPlaceId: (state, action) => {
      state.placeId = action.payload;
    },
    setIsPlaceClear: (state, action) => {
      state.isplaceClear = action.payload;
    },
  },
});

export const { getPlaceId, setIsPlaceClear } = placeSlice.actions;
export default placeSlice.reducer;
