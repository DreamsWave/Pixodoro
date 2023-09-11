import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface PixelSizeState {
  value: number;
}

const initialState: PixelSizeState = {
  value: 8,
};

export const pixelSizeSlice = createSlice({
  name: "pixelSize",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { change } = pixelSizeSlice.actions;

export const selectPixelSize = (state: RootState) => state.pixelSize.value;

export default pixelSizeSlice.reducer;
