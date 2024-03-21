import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    sceneList: [],
    storyList: [],
  },
  reducers: {
    setSceneList: (state, action) => {
      state.sceneList = action.payload;
    },
    setStoryList: (state, action) => {
      state.storyList = action.payload;
    },
  },
});

export const { setSceneList, setStoryList } = hospitalSlice.actions;
export default hospitalSlice.reducer;
