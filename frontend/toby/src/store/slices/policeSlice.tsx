import { createSlice } from "@reduxjs/toolkit";

const policeSlice = createSlice({
  name: "police",
  initialState: {
    sceneList: [],
    storyList: [],
    storyId: 4,
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
    setPoliceQuizClear: (state, action) => {
      state.quizClear = action.payload;
    },
  },
});

export const { selectStoryId, setSceneList, setPoliceQuizClear, setStoryList } =
  policeSlice.actions;
export default policeSlice.reducer;
