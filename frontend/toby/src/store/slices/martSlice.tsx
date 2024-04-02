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
    setSchoolQuizClear: (state, action) => {
      state.quizClear = action.payload;
    },
  },
});

export const { selectStoryId, setSceneList, setSchoolQuizClear, setStoryList } =
  martSlice.actions;
export default martSlice.reducer;
