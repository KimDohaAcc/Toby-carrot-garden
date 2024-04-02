import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    sceneList: [],
    storyList: [],
    storyId: 1,
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

export const { setSceneList, setStoryList, selectStoryId, setSchoolQuizClear } =
  schoolSlice.actions;
export default schoolSlice.reducer;
