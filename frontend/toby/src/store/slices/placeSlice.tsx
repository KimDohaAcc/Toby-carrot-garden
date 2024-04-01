import { createSlice } from "@reduxjs/toolkit";

const placeSlice = createSlice({
  name: "place",
  initialState: {
    placeId: 0,
  },
  reducers: {
    getPlaceId: (state, action) => {
      state.placeId = action.payload;
    },
  },
});

export const { getPlaceId } = placeSlice.actions;
export default placeSlice.reducer;
