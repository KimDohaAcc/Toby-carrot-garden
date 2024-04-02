import { createSlice } from "@reduxjs/toolkit";

const martSlice = createSlice({
  name: "mart",
  initialState: {
    martId: 0,
    isMartClear: false,
  },
  reducers: {
    getMartId: (state, action) => {
      state.martId = action.payload;
    },
    setIsMartClear: (state, action) => {
      state.isMartClear = action.payload;
    },
  },
});

export const { getMartId, setIsMartClear } = martSlice.actions;
export default martSlice.reducer;
