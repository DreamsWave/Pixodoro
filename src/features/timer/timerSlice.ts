import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { POMODORO_STATUS } from "../../types";

interface TimerState {
  pomodoroTotalSeconds: number;
  breakTotalSeconds: number;
  currentPomodoroTotalSeconds: number;
  currentBreakTotalSeconds: number;
  status: POMODORO_STATUS;
  progress: number;
  started: boolean;
  secondsLeft: number;
}

const initialState: TimerState = {
  pomodoroTotalSeconds: 60,
  breakTotalSeconds: 30,
  currentPomodoroTotalSeconds: 60,
  currentBreakTotalSeconds: 30,
  status: "pomodoro",
  progress: 0,
  started: false,
  secondsLeft: 60,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setPomodoroTotalSeconds: (state, action: PayloadAction<number>) => {
      state.pomodoroTotalSeconds = action.payload;
    },
    setBreakTotalSeconds: (state, action: PayloadAction<number>) => {
      state.breakTotalSeconds = action.payload;
    },
    setCurrentPomodoroTotalSeconds: (state, action: PayloadAction<number>) => {
      state.currentPomodoroTotalSeconds = action.payload;
    },
    setCurrentBreakTotalSeconds: (state, action: PayloadAction<number>) => {
      state.currentBreakTotalSeconds = action.payload;
    },
    setStatus: (state, action: PayloadAction<POMODORO_STATUS>) => {
      state.status = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setStarted: (state, action: PayloadAction<boolean>) => {
      state.started = action.payload;
    },
    setSecondsLeft: (state, action: PayloadAction<number>) => {
      state.secondsLeft = action.payload;
    },
  },
});

export const {
  setPomodoroTotalSeconds,
  setBreakTotalSeconds,
  setCurrentPomodoroTotalSeconds,
  setCurrentBreakTotalSeconds,
  setStatus,
  setProgress,
  setStarted,
  setSecondsLeft,
} = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export default timerSlice.reducer;
