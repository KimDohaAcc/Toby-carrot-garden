import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    sceneList: [],
    storyList: [],
    storyId: 2,
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
    setHospitalQuizClear: (state, action) => {
      state.quizClear = action.payload;
    },
  },
});

export const {
  setSceneList,
  setStoryList,
  selectStoryId,
  setHospitalQuizClear,
} = hospitalSlice.actions;
export default hospitalSlice.reducer;
