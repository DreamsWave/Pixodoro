import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface PixelState {
  pixelSize: number;
}

const initialState: PixelState = {
  pixelSize: 8,
};

export const pixelSlice = createSlice({
  name: "pixel",
  initialState,
  reducers: {
    setPixelSize: (state, action: PayloadAction<number>) => {
      state.pixelSize = action.payload;
    },
  },
});

export const { setPixelSize } = pixelSlice.actions;

export const selectPixel = (state: RootState) => state.pixel;

export default pixelSlice.reducer;
