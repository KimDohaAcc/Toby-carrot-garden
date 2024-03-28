import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: "school",
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

export const { setSceneList, setStoryList } = schoolSlice.actions;
export default schoolSlice.reducer;
