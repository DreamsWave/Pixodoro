import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface MusicState {
  volume: number;
  name: string;
  playing: boolean;
}

const initialState: MusicState = {
  volume: 0.5,
  name: "song",
  playing: false,
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
  },
});

export const { setVolume, setName, setPlaying } = musicSlice.actions;

export const selectMusic = (state: RootState) => state.music;

export default musicSlice.reducer;
