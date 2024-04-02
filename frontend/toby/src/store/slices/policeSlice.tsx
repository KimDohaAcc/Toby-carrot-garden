import { createSlice } from "@reduxjs/toolkit";

const policeSlice = createSlice({
  name: "police",
  initialState: {
    policeId: 0,
    isPoliceClear: false,
  },
  reducers: {
    getPoliceId: (state, action) => {
      state.policeId = action.payload;
    },
    setIsPoliceClear: (state, action) => {
      state.isPoliceClear = action.payload;
    },
  },
});

export const { getPoliceId, setIsPoliceClear } = policeSlice.actions;
export default policeSlice.reducer;
