import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AudioState {
  volume: number;
}

const initialState: AudioState = {
  volume: 0.5,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { setVolume } = audioSlice.actions;

export const selectAudio = (state: RootState) => state.audio;

export default audioSlice.reducer;
