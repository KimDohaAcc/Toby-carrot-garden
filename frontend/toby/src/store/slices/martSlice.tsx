import { createSlice } from "@reduxjs/toolkit";

const martSlice = createSlice({
  name: "mart",
  initialState: {
    sceneList: [],
    storyList: [],
    storyId: 3,
    quizClear: false,
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
    setMartQuizClear: (state, action) => {
      state.quizClear = action.payload;
    },
  },
});

export const { selectStoryId, setSceneList, setMartQuizClear, setStoryList } =
  martSlice.actions;
export default martSlice.reducer;
