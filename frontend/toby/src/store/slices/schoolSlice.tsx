import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    sceneList: [],
    storyList: [],
    storyId: 1,
  },
  reducers: {
    setSceneList: (state, action) => {
      state.sceneList = action.payload;
    },
    setStoryList: (state, action) => {
      state.storyList = action.payload;
    },
    selectStoryId: (state, action) => {
      state.storyId = action.payload;
    },
  },
});

export const { setSceneList, setStoryList, selectStoryId } =
  schoolSlice.actions;
export default schoolSlice.reducer;
